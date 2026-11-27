
package com.school.management.employee.service;

import com.school.management.admin.numberseries.service.EmployeeNumberSeriesService;
import com.school.management.employee.dto.EmployeeRequest;
import com.school.management.employee.dto.EmployeeSearchRequest;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.entity.Role;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.exception.EmployeeNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeNumberSeriesService numberSeriesService;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            EmployeeNumberSeriesService numberSeriesService) {

        this.employeeRepository = employeeRepository;
        this.numberSeriesService = numberSeriesService;
    }

    // Map Employee Role to Number Series Department
    private String getDepartmentForRole(Role role) {

        if (role == null) {
            throw new IllegalArgumentException(
                    "Employee role is required"
            );
        }

        return switch (role) {
            case TEACHER -> "TEACHER";
            case PRINCIPAL -> "PRINCIPAL";
            case ACCOUNTS_STAFF -> "ACCOUNTS_STAFF";
            case SUPPORT_STAFF -> "SUPPORT_STAFF";
        };
    }

    // Save Employee with automatically generated Employee ID
    @Transactional
    public Employee saveEmployee(EmployeeRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Employee request is required"
            );
        }

        Employee employee = new Employee();

        employee.setName(request.getName());
        employee.setAadhaarNo(request.getAadhaarNo());
        employee.setPanNo(request.getPanNo());

        employee.setEmailId(request.getEmailId());
        employee.setPhoneNo(request.getPhoneNo());

        employee.setFatherName(request.getFatherName());
        employee.setMotherName(request.getMotherName());
        employee.setHusbandName(request.getHusbandName());

        employee.setRole(request.getRole());

        // Salary Details
        employee.setBasic(request.getBasic());
        employee.setHra(request.getHra());
        employee.setDailyAllowance(request.getDailyAllowance());
        employee.setTravelAllowance(request.getTravelAllowance());
        employee.setBonus(request.getBonus());
        employee.setIncentive(request.getIncentive());
        employee.setMiscellaneous(request.getMiscellaneous());

        employee.setTaLiability(request.getTaLiability());
        employee.setTotal(request.getTotal());

        employee.setFinancialYear(request.getFinancialYear());
        employee.setForMonth(request.getForMonth());

        // Employment Details
        employee.setJoiningDate(request.getJoiningDate());
        employee.setLeavingDate(request.getLeavingDate());
        employee.setTaxLiability(request.getTaxLiability());

        // Generate Employee ID using Admin Number Series
        String department = getDepartmentForRole(request.getRole());

        String employeeId =
                numberSeriesService.generateNextEmployeeId(department);

        employee.setEmpId(employeeId);

        return employeeRepository.save(employee);
    }

    // Search Employees
    public List<Employee> searchEmployees(EmployeeSearchRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Search request is required"
            );
        }

        // Search by Employee ID
        if (request.getEmpIds() != null &&
                !request.getEmpIds().isBlank()) {

            List<String> empIds = Arrays.stream(
                            request.getEmpIds().split(",")
                    )
                    .map(String::trim)
                    .toList();

            List<Employee> employees =
                    employeeRepository.findByEmpIdIn(empIds);

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException(
                        "Employee not found"
                );
            }

            return employees;
        }

        // Search by Joining Date
        if (request.getJoiningDate() != null) {

            List<Employee> employees =
                    employeeRepository.findByJoiningDate(
                            request.getJoiningDate()
                    );

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException(
                        "No employee found for this joining date"
                );
            }

            return employees;
        }

        // Search by Leaving Date
        if (request.getLeavingDate() != null) {

            List<Employee> employees =
                    employeeRepository.findByLeavingDate(
                            request.getLeavingDate()
                    );

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException(
                        "No employee found for this leaving date"
                );
            }

            return employees;
        }

        // Search by Name
        if (request.getName() != null &&
                !request.getName().isBlank()) {

            List<Employee> employees =
                    employeeRepository.findByNameContainingIgnoreCase(
                            request.getName()
                    );

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException(
                        "No employee found with this name"
                );
            }

            return employees;
        }

        throw new IllegalArgumentException(
                "Please enter at least one search criteria"
        );
    }
}
