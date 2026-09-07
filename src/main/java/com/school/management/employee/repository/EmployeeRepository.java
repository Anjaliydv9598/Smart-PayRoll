package com.school.management.employee.repository;

import com.school.management.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,String> {

    List <Employee> findByEmpIdStartingWith(String prifix);
}
