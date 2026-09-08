package com.school.management.payroll.entity;

import com.school.management.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "com/school/management/payroll")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "emp_id", nullable = false)
    private Employee employee;

    // Payroll Period
    @Column(name = "financial_year", nullable = false)
    private String financialYear;

    @Column(name = "month", nullable = false)
    private String month;

    // Earnings
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

    @Column(name = "gross_salary")
    private BigDecimal grossSalary;

    // Deductions
    @Column(name = "pf")
    private BigDecimal pf;

    @Column(name = "tax_liability")
    private BigDecimal taxLiability;

    @Column(name = "other_deductions")
    private BigDecimal otherDeductions;

    // Final Salary
    @Column(name = "net_salary")
    private BigDecimal netSalary;

    // Employer / Statutory
    @Column(name = "employer_pf")
    private BigDecimal employerPf;

    @Column(name = "statutory_payment")
    private BigDecimal statutoryPayment;
}
