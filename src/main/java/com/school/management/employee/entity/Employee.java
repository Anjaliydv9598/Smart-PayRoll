package com.school.management.employee.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "school_management_record")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public abstract class Employee {

    @Id
    @Column(name = "emp_id", nullable = false, unique = true)
    private String empId;

    // Employee Details
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "aadhaar_no", nullable = false)
    private String aadhaarNo;

    @Column(name = "pan_no", nullable = false)
    private String panNo;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "father_name")
    private String fatherName;

    @Column(name = "mother_name")
    private String motherName;

    @Column(name = "husband_name")
    private String husbandName;

    // Salary Components or Employment detaail
    @Column(name = "basic")
    private BigDecimal basic;

    @Column(name = "hra")
    private BigDecimal hra;

    @Column(name = "daily_allowance")
    private BigDecimal dailyAllowance;

    @Column(name = "travel_allowance")
    private BigDecimal travelAllowance;

    @Column(name = "bonus")
    private BigDecimal bonus;

    @Column(name = "incentive")
    private BigDecimal incentive;

    @Column(name = "miscellaneous")
    private BigDecimal miscellaneous;

    @Column(name = "ta_liability")
    private BigDecimal taLiability;

    @Column(name = "total")
    private BigDecimal total;

    // Payroll Period
    @Column(name = "financial_year")
    private String financialYear;

    @Column(name = "for_month")
    private String forMonth;

    // Employment Details
    @Column(name = "joining_date")
    private LocalDate joiningDate;

    @Column(name = "leaving_date")
    private LocalDate leavingDate;

    @Column(name = "tax_liability")
    private BigDecimal taxLiability;

    // Employee Role
    @Enumerated(EnumType.STRING)
    private Role role;
}