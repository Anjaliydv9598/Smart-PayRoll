
package com.school.management.admin.numberseries.service;

import com.school.management.admin.numberseries.dto.NumberSeriesRequest;
import com.school.management.admin.numberseries.dto.NumberSeriesResponse;
import com.school.management.admin.numberseries.entity.EmployeeNumberSeries;
import com.school.management.admin.numberseries.repository.EmployeeNumberSeriesRepository;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class EmployeeNumberSeriesService {

    private final EmployeeNumberSeriesRepository repository;
    private final EmployeeRepository employeeRepository;

    public EmployeeNumberSeriesService(
            EmployeeNumberSeriesRepository repository,
            EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
    }

    public List<NumberSeriesResponse> getAllSeries() {
        return repository.findAllByOrderByDepartmentAsc()
                .stream()
                .map(NumberSeriesResponse::from)
                .toList();
    }

    public NumberSeriesResponse getSeriesById(Long id) {
        EmployeeNumberSeries series = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Number series not found"));

        return NumberSeriesResponse.from(series);
    }

    @Transactional
    public NumberSeriesResponse createSeries(NumberSeriesRequest request) {
        validate(request);

        String department = request.department().trim();
        String prefix = request.prefix().trim().toUpperCase(Locale.ROOT);

        if (repository.existsByDepartmentIgnoreCase(department)) {
            throw new IllegalArgumentException(
                    "A number series already exists for this department");
        }

        int nextNumber = findNextAvailableNumber(
                prefix,
                request.startNumber()
        );

        if (nextNumber > request.endNumber()) {
            throw new IllegalArgumentException(
                    "No numbers are available in this range for the selected prefix");
        }

        EmployeeNumberSeries series = new EmployeeNumberSeries();

        series.setDepartment(department);
        series.setPrefix(prefix);
        series.setStartNumber(request.startNumber());
        series.setEndNumber(request.endNumber());
        series.setNumberLength(request.numberLength());
        series.setNextNumber(nextNumber);
        series.setActive(request.active() == null || request.active());

        return NumberSeriesResponse.from(repository.save(series));
    }

    @Transactional
    public NumberSeriesResponse updateSeries(
            Long id,
            NumberSeriesRequest request) {

        validate(request);

        EmployeeNumberSeries series = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Number series not found"));

        String department = request.department().trim();
        String newPrefix = request.prefix().trim()
                .toUpperCase(Locale.ROOT);

        if (repository.existsByDepartmentIgnoreCaseAndIdNot(
                department, id)) {
            throw new IllegalArgumentException(
                    "Another number series already uses this department");
        }

        boolean oldPrefixHasEmployees =
                !employeeRepository.findByEmpIdStartingWith(
                        series.getPrefix()).isEmpty();

        boolean prefixChanged =
                !series.getPrefix().equalsIgnoreCase(newPrefix);

        if (prefixChanged &&
                (series.getNextNumber() != series.getStartNumber()
                        || oldPrefixHasEmployees)) {
            throw new IllegalArgumentException(
                    "Prefix cannot be changed after employee IDs have been generated");
        }

        int nextNumber = findNextAvailableNumber(
                newPrefix,
                Math.max(request.startNumber(), series.getNextNumber())
        );

        if (nextNumber > request.endNumber()) {
            throw new IllegalArgumentException(
                    "End number is too small for the next available employee ID");
        }

        series.setDepartment(department);
        series.setPrefix(newPrefix);
        series.setStartNumber(request.startNumber());
        series.setEndNumber(request.endNumber());
        series.setNumberLength(request.numberLength());
        series.setNextNumber(nextNumber);

        if (request.active() != null) {
            series.setActive(request.active());
        }

        return NumberSeriesResponse.from(repository.save(series));
    }

    @Transactional
    public void deleteSeries(Long id) {
        EmployeeNumberSeries series = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Number series not found"));

        boolean employeesExist =
                !employeeRepository.findByEmpIdStartingWith(
                        series.getPrefix()).isEmpty();

        if (series.getNextNumber() != series.getStartNumber()
                || employeesExist) {
            throw new IllegalArgumentException(
                    "This series has already been used and cannot be deleted");
        }

        repository.delete(series);
    }

    /**
     * Called by EmployeeService when a new employee is created.
     */
    @Transactional
    public String generateNextEmployeeId(String department) {

        if (department == null || department.isBlank()) {
            throw new IllegalArgumentException(
                    "Employee department is required");
        }

        EmployeeNumberSeries series =
                repository.findByDepartmentForUpdate(department.trim())
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "No number series configured for department: "
                                                + department));

        if (!series.isActive()) {
            throw new IllegalArgumentException(
                    "Number series is inactive for department: " + department);
        }

        int nextNumber = findNextAvailableNumber(
                series.getPrefix(),
                series.getNextNumber()
        );

        if (nextNumber > series.getEndNumber()) {
            throw new IllegalArgumentException(
                    "Number series limit reached for department: " + department);
        }

        String employeeId = formatEmployeeId(series, nextNumber);

        series.setNextNumber(nextNumber + 1);

        repository.save(series);

        return employeeId;
    }

    /**
     * Finds the next unused number by checking existing employee IDs.
     */
    private int findNextAvailableNumber(String prefix, int startNumber) {

        List<Employee> existingEmployees =
                employeeRepository.findByEmpIdStartingWith(prefix);

        int highestExistingNumber = existingEmployees.stream()
                .map(Employee::getEmpId)
                .map(id -> id.substring(prefix.length()))
                .filter(suffix -> suffix.matches("\\d+"))
                .mapToInt(Integer::parseInt)
                .max()
                .orElse(startNumber - 1);

        return Math.max(startNumber, highestExistingNumber + 1);
    }

    private String formatEmployeeId(
            EmployeeNumberSeries series,
            int number) {

        return series.getPrefix()
                + String.format(
                "%0" + series.getNumberLength() + "d",
                number
        );
    }

    private void validate(NumberSeriesRequest request) {

        if (request == null) {
            throw new IllegalArgumentException("Request is required");
        }

        if (request.department() == null
                || request.department().isBlank()) {
            throw new IllegalArgumentException("Department is required");
        }

        if (request.prefix() == null
                || !request.prefix().trim().matches("[A-Za-z]+")) {
            throw new IllegalArgumentException(
                    "Prefix must contain letters only");
        }

        if (request.startNumber() == null
                || request.endNumber() == null
                || request.numberLength() == null) {
            throw new IllegalArgumentException(
                    "Start number, end number and number length are required");
        }

        if (request.startNumber() < 0
                || request.endNumber() < request.startNumber()) {
            throw new IllegalArgumentException(
                    "Please enter a valid number range");
        }

        if (request.numberLength() < 1
                || request.numberLength() > 10) {
            throw new IllegalArgumentException(
                    "Number length must be between 1 and 10");
        }

        if (String.valueOf(request.endNumber()).length()
                > request.numberLength()) {
            throw new IllegalArgumentException(
                    "Number length is too small for the end number");
        }
    }
}
