package com.school.management.employee.repository;

import com.school.management.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,String> {

    //This method is used by your employee ID generation logic.
    List <Employee> findByEmpIdStartingWith(String prefix);

    // // Used for frontend employee search
    List<Employee> findByEmpIdIn(List<String> empIds);
    List<Employee> findByJoiningDate(LocalDate joiningDate);
    List<Employee> findByLeavingDate(LocalDate leavingDate);
    List<Employee> findByNameContainingIgnoreCase(String name);
}
