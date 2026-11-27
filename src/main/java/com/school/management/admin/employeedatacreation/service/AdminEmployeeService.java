package com.school.management.admin.employeedatacreation.service;



import com.school.management.admin.employeedatacreation.dto.AdminEmployeeRequest;
import com.school.management.admin.numberseries.service.EmployeeNumberSeriesService;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.entity.Role;
import com.school.management.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class AdminEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeNumberSeriesService numberSeriesService;

    public AdminEmployeeService(
            EmployeeRepository employeeRepository,
            EmployeeNumberSeriesService numberSeriesService) {

        this.employeeRepository = employeeRepository;
        this.numberSeriesService = numberSeriesService;
    }

    // =====================================================
    // GET ALL EMPLOYEES
    // =====================================================

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {

        return employeeRepository.findAll();
    }

    // =====================================================
    // GET EMPLOYEE BY ID
    // =====================================================

    @Transactional(readOnly = true)
    public Employee getEmployeeById(String empId) {

        return employeeRepository.findById(empId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found: " + empId));
    }

    // =====================================================
    // SEARCH EMPLOYEES
    // =====================================================

    @Transactional(readOnly = true)
    public List<Employee> searchEmployees(String keyword) {

        if (keyword == null || keyword.isBlank()) {
            return getAllEmployees();
        }

        String search = keyword.trim();

        return employeeRepository.findAll()
                .stream()
                .filter(employee ->
                        employee.getEmpId().toLowerCase(Locale.ROOT)
                                .contains(search.toLowerCase(Locale.ROOT))
                                ||
                                employee.getName().toLowerCase(Locale.ROOT)
                                        .contains(search.toLowerCase(Locale.ROOT)))
                .toList();
    }

    // =====================================================
    // CREATE EMPLOYEE
    // EMPLOYEE ID COMES FROM EXISTING NUMBER SERIES
    // =====================================================

    @Transactional
    public Employee createEmployee(AdminEmployeeRequest request) {

        validateRequest(request);

        String department = getDepartmentFromRole(request.getRole());

        String generatedEmployeeId =
                numberSeriesService.generateNextEmployeeId(department);

        Employee employee = new Employee();

        employee.setEmpId(generatedEmployeeId);

        copyRequestToEmployee(request, employee);

        return employeeRepository.save(employee);
    }

    // =====================================================
    // UPDATE EMPLOYEE
    // EMPLOYEE ID CANNOT BE CHANGED
    // =====================================================

    @Transactional
    public Employee updateEmployee(
            String empId,
            AdminEmployeeRequest request) {

        Employee employee = getEmployeeById(empId);

        validateRequest(request);

        if (request.getRole() != employee.getRole()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employee role cannot be changed after ID generation");
        }

        copyRequestToEmployee(request, employee);

        return employeeRepository.save(employee);
    }

    // =====================================================
    // COPY REQUEST DATA
    // =====================================================

    private void copyRequestToEmployee(
            AdminEmployeeRequest request,
            Employee employee) {

        employee.setName(request.getName().trim());
        employee.setAadhaarNo(request.getAadhaarNo().trim());
        employee.setPanNo(request.getPanNo().trim());

        employee.setEmailId(request.getEmailId());
        employee.setPhoneNo(request.getPhoneNo());

        employee.setFatherName(request.getFatherName());
        employee.setMotherName(request.getMotherName());
        employee.setHusbandName(request.getHusbandName());

        employee.setRole(request.getRole());

        employee.setBasic(request.getBasic());
        employee.setHra(request.getHra());
        employee.setDailyAllowance(request.getDailyAllowance());
        employee.setTravelAllowance(request.getTravelAllowance());
        employee.setBonus(request.getBonus());
        employee.setIncentive(request.getIncentive());
        employee.setMiscellaneous(request.getMiscellaneous());

        employee.setTaLiability(request.getTaLiability());
        employee.setTotal(request.getTotal());
        employee.setTaxLiability(request.getTaxLiability());

        employee.setFinancialYear(request.getFinancialYear());
        employee.setForMonth(request.getForMonth());

        employee.setJoiningDate(request.getJoiningDate());
        employee.setLeavingDate(request.getLeavingDate());
    }

    // =====================================================
    // ROLE TO NUMBER SERIES DEPARTMENT
    // =====================================================

    private String getDepartmentFromRole(Role role) {

        if (role == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employee role is required");
        }

        return switch (role) {
            case TEACHER -> "TEACHER";
            case PRINCIPAL -> "PRINCIPAL";
            case ACCOUNTS_STAFF -> "ACCOUNTS_STAFF";
            case SUPPORT_STAFF -> "SUPPORT_STAFF";
        };
    }

    // =====================================================
    // VALIDATION
    // =====================================================

    private void validateRequest(AdminEmployeeRequest request) {

        if (request.getName() == null || request.getName().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employee name is required");
        }

        if (request.getAadhaarNo() == null ||
                request.getAadhaarNo().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Aadhaar number is required");
        }

        if (request.getPanNo() == null ||
                request.getPanNo().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "PAN number is required");
        }

        if (request.getRole() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Employee role is required");
        }
    }
}