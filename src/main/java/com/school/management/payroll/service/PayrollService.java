package com.school.management.payroll.service;

import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.payroll.entity.Payroll;
import com.school.management.payroll.repository.PayrollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    public Payroll generatePayroll(String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        Payroll payroll = new Payroll();

        payroll.setEmployee(employee);
        payroll.setFinancialYear(employee.getFinancialYear());
        payroll.setMonth(employee.getForMonth());

        // Earnings
        payroll.setBasic(employee.getBasic());
        payroll.setHra(employee.getHra());
        payroll.setDailyAllowance(employee.getDailyAllowance());
        payroll.setTravelAllowance(employee.getTravelAllowance());
        payroll.setBonus(employee.getBonus());
        payroll.setIncentive(employee.getIncentive());
        payroll.setMiscellaneous(employee.getMiscellaneous());

        BigDecimal grossSalary =
                safe(employee.getBasic())
                        .add(safe(employee.getHra()))
                        .add(safe(employee.getDailyAllowance()))
                        .add(safe(employee.getTravelAllowance()))
                        .add(safe(employee.getBonus()))
                        .add(safe(employee.getIncentive()))
                        .add(safe(employee.getMiscellaneous()));

        payroll.setGrossSalary(grossSalary);

        // Deductions
        BigDecimal pf = BigDecimal.ZERO;
        BigDecimal taxLiability = safe(employee.getTaxLiability());
        BigDecimal otherDeductions = BigDecimal.ZERO;

        payroll.setPf(pf);
        payroll.setTaxLiability(taxLiability);
        payroll.setOtherDeductions(otherDeductions);

        // Net salary
        BigDecimal netSalary =
                grossSalary
                        .subtract(pf)
                        .subtract(taxLiability)
                        .subtract(otherDeductions);

        payroll.setNetSalary(netSalary);

        // Employer/statutory
        payroll.setEmployerPf(BigDecimal.ZERO);
        payroll.setStatutoryPayment(
                safe(employee.getTaLiability())
        );

        return payrollRepository.save(payroll);
    }

    private BigDecimal safe(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}