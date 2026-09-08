package com.school.management.leave.repository;

import com.school.management.employee.entity.Employee;
import com.school.management.leave.entity.Leave;
import com.school.management.leave.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LeaveRepository
        extends JpaRepository<Leave, Long> {

    List<Leave> findByEmployee(Employee employee);

    List<Leave> findByEmployeeAndStatus(
            Employee employee,
            LeaveStatus status
    );

    List<Leave> findByStatus(LeaveStatus status);

    List<Leave> findByStartDateLessThanEqualAndEndDateGreaterThanEqual(
            LocalDate date1,
            LocalDate date2
    );

    Optional<Leave>
    findByEmployeeAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
            Employee employee,
            LeaveStatus status,
            LocalDate date1,
            LocalDate date2
    );
}