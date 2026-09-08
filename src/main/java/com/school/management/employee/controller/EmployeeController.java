package com.school.management.employee.controller;

import com.school.management.employee.dto.EmployeeRequest;
import com.school.management.employee.dto.EmployeeSearchRequest;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    // Create employee
    @PostMapping
    public Employee saveEmployee(@RequestBody EmployeeRequest request) {
        return employeeService.saveEmployee(request);
    }

    // Search employee
    @GetMapping("/search")
    public List<Employee> searchEmployees(EmployeeSearchRequest request) {
        return employeeService.searchEmployees(request);
    }
}