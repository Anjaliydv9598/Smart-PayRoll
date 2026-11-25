
package com.school.management.employee.service;

import com.school.management.employee.dto.EmployeeRequest;
import com.school.management.employee.dto.EmployeeSearchRequest;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.entity.Role;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.exception.EmployeeNotFoundException;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Generate Employee ID
    private String generateEmployeeId(Role role) {

        String prefix;

        switch (role) {

            case TEACHER -> prefix = "T";

            case PRINCIPAL -> prefix = "P";

            case SUPPORT_STAFF -> prefix = "SS";

            case ACCOUNTS_STAFF -> prefix = "AS";

            default -> throw new IllegalArgumentException(
                    "Invalid employee role"
            );
        }

        int nextNumber = employeeRepository
                .findByEmpIdStartingWith(prefix)
                .size() + 1;

        return prefix + String.format("%03d", nextNumber);
    }


    // Save Employee
    public Employee saveEmployee(EmployeeRequest request) {

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

        // Generate Employee ID
        employee.setEmpId(
                generateEmployeeId(request.getRole())
        );

        return employeeRepository.save(employee);
    }


    // Search Employees
    public List<Employee> searchEmployees(EmployeeSearchRequest request) {

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
