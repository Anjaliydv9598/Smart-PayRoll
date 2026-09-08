package com.school.management.payroll.repository;

import com.school.management.payroll.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayrollRepository extends JpaRepository<Payroll,Integer> {

}
