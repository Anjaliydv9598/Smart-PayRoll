package com.school.management.employee.dto;

import com.school.management.employee.entity.Role;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class EmployeeRequest {

    // Employee Details
    private Role role;
    private String name;
    private String aadhaarNo;
    private String panNo;
    private String emailId;
    private String phoneNo;
    private String fatherName;
    private String motherName;
    private String husbandName;

    // Salary Components
    private BigDecimal basic;
    private BigDecimal hra;
    private BigDecimal dailyAllowance;
    private BigDecimal travelAllowance;
    private BigDecimal bonus;
    private BigDecimal incentive;
    private BigDecimal miscellaneous;
    private BigDecimal taLiability;
    private BigDecimal total;

    // Payroll Period
    private String financialYear;
    private String forMonth;

    // Employment Details
    private LocalDate joiningDate;
    private LocalDate leavingDate;
    private BigDecimal taxLiability;
}