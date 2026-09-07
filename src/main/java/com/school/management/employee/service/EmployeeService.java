package com.school.management.employee.service;
import com.school.management.employee.dto.EmployeeSearchRequest;

import java.util.Arrays;
import java.util.List;
import com.school.management.accounts_staff.entity.AccountsStaff;
import com.school.management.employee.dto.EmployeeRequest;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.entity.Role;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.exception.EmployeeNotFoundException;
import com.school.management.principal.entity.Principal;
import com.school.management.support_staff.entity.SupportStaff;
import com.school.management.teacher.entity.Teacher;
import org.springframework.stereotype.Service;


@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository=employeeRepository;
    }

    private String generateEmployeeId(Role role){
        String prefix;

        switch(role){

//            case TEACHER:
//            prifix="T";
//            break;
//            or

            case TEACHER -> prefix="T";

            case PRINCIPAL -> prefix="P";

            case SUPPORT_STAFF -> prefix="SS";

            case ACCOUNTS_STAFF -> prefix="AS";

            default -> throw new IllegalArgumentException("Invalid employee role");
        }
        int nextNumber= employeeRepository
                .findByEmpIdStartingWith(prefix)
                .size()+1;
        return prefix + String.format("%03d" ,nextNumber );
    }

    public Employee saveEmployee(EmployeeRequest request) {

        Employee employee;

        switch (request.getRole()) {

            case TEACHER -> employee = new Teacher();

            case PRINCIPAL -> employee = new Principal();

            case SUPPORT_STAFF -> employee = new SupportStaff();

            case ACCOUNTS_STAFF -> employee = new AccountsStaff();

            default -> throw new IllegalArgumentException("Invalid employee role");
        }
        employee.setName(request.getName());
        employee.setAadhaarNo(request.getAadhaarNo());
        employee.setPanNo(request.getPanNo());
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

        employee.setFinancialYear(request.getFinancialYear());
        employee.setForMonth(request.getForMonth());

        employee.setJoiningDate(request.getJoiningDate());
        employee.setLeavingDate(request.getLeavingDate());
        employee.setTaxLiability(request.getTaxLiability());

        employee.setEmpId(generateEmployeeId(request.getRole()));

        return employeeRepository.save(employee);
    }


    public List<Employee> searchEmployees(EmployeeSearchRequest request) {

        // 1. Search by Employee ID(s)
        if (request.getEmpIds() != null && !request.getEmpIds().isBlank()) {

            List<String> empIds = Arrays.stream(request.getEmpIds().split(","))
                    .map(String::trim)
                    .toList();

            List<Employee> employees = employeeRepository.findByEmpIdIn(empIds);

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException("Employee not found");
            }

            return employees;
        }

        // 2. Search by Joining Date
        if (request.getJoiningDate() != null) {

            List<Employee> employees =
                    employeeRepository.findByJoiningDate(request.getJoiningDate());

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException("No employee found for this joining date");
            }

            return employees;
        }

        // 3. Search by Leaving Date
        if (request.getLeavingDate() != null) {

            List<Employee> employees =
                    employeeRepository.findByLeavingDate(request.getLeavingDate());

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException("No employee found for this leaving date");
            }

            return employees;
        }

        // 4. Search by Name
        if (request.getName() != null && !request.getName().isBlank()) {

            List<Employee> employees =
                    employeeRepository.findByNameContainingIgnoreCase(request.getName());

            if (employees.isEmpty()) {
                throw new EmployeeNotFoundException("No employee found with this name");
            }

            return employees;
        }

        // 5. Nothing entered
        throw new IllegalArgumentException(
                "Please enter at least one search criteria"
        );
    }



    }

