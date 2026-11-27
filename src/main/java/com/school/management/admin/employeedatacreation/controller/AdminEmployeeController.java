package com.school.management.admin.employeedatacreation.controller;


import com.school.management.admin.employeedatacreation.dto.AdminEmployeeRequest;
import com.school.management.admin.employeedatacreation.service.AdminEmployeeService;
import com.school.management.employee.entity.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/employees")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174"
        }
)
public class AdminEmployeeController {

    private final AdminEmployeeService employeeService;

    public AdminEmployeeController(
            AdminEmployeeService employeeService) {

        this.employeeService = employeeService;
    }

    // GET ALL EMPLOYEES
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        return ResponseEntity.ok(
                employeeService.getAllEmployees());
    }

    // SEARCH EMPLOYEES
    @GetMapping("/search")
    public ResponseEntity<List<Employee>> searchEmployees(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                employeeService.searchEmployees(keyword));
    }

    // GET EMPLOYEE PROFILE
    @GetMapping("/{empId}")
    public ResponseEntity<Employee> getEmployee(
            @PathVariable String empId) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(empId));
    }

    // CREATE EMPLOYEE
    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @RequestBody AdminEmployeeRequest request) {

        Employee employee =
                employeeService.createEmployee(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(employee);
    }

    // UPDATE EMPLOYEE
    @PutMapping("/{empId}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable String empId,
            @RequestBody AdminEmployeeRequest request) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(empId, request));
    }
}