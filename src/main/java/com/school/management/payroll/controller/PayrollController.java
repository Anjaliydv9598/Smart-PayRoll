package com.school.management.payroll.controller;

import com.school.management.payroll.entity.Payroll;
import com.school.management.payroll.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollController {

    private final PayrollService payrollService;

    @PostMapping("/generate/{employeeId}")
    public Payroll generatePayroll(
            @PathVariable String employeeId) {

        return payrollService.generatePayroll(employeeId);
    }
}