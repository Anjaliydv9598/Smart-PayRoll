package com.school.management.attendance.repository;

import com.school.management.attendance.entity.Attendance;
import com.school.management.employee.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndAttendanceDate(
            Employee employee,
            LocalDate attendanceDate
    );

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    List<Attendance> findByEmployee(Employee employee);

    List<Attendance> findByAttendanceDateAndPunchInIsNull(
            LocalDate attendanceDate
    );
}