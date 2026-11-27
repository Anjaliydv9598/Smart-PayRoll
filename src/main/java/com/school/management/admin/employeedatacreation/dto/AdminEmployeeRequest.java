package com.school.management.admin.employeedatacreation.dto;

import com.school.management.employee.entity.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AdminEmployeeRequest {

    // Personal Details
    private String name;
    private String aadhaarNo;
    private String panNo;
    private String emailId;
    private String phoneNo;

    private String fatherName;
    private String motherName;
    private String husbandName;

    // Employee Role
    private Role role;

    // Salary Details
    private BigDecimal basic;
    private BigDecimal hra;
    private BigDecimal dailyAllowance;
    private BigDecimal travelAllowance;
    private BigDecimal bonus;
    private BigDecimal incentive;
    private BigDecimal miscellaneous;

    private BigDecimal taLiability;
    private BigDecimal total;
    private BigDecimal taxLiability;

    // Payroll Period
    private String financialYear;
    private String forMonth;

    // Employment Details
    private LocalDate joiningDate;
    private LocalDate leavingDate;
}