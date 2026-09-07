package com.school.management.employee.service;

import com.school.management.accounts_staff.entity.AccountsStaff;
import com.school.management.employee.dto.EmployeeRequest;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.entity.Role;
import com.school.management.employee.repository.EmployeeRepository;
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

        employee.setEmpId(generateEmployeeId(request.getRole()));

        return employeeRepository.save(employee);
    }
}
