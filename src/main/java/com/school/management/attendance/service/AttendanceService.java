package com.school.management.attendance.service;

import com.school.management.attendance.entity.Attendance;
import com.school.management.attendance.entity.AttendanceStatus;
import com.school.management.attendance.repository.AttendanceRepository;
import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.holiday.entity.Holiday;
import com.school.management.holiday.repository.HolidayRepository;
import com.school.management.leave.entity.Leave;
import com.school.management.leave.entity.LeaveStatus;
import com.school.management.leave.entity.LeaveType;
import com.school.management.leave.repository.LeaveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;
    private final LeaveRepository leaveRepository;
    private final HolidayRepository holidayRepository;

    public Attendance punchIn(String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();

        if (attendanceRepository
                .findByEmployeeAndAttendanceDate(employee, today)
                .isPresent()) {

            throw new RuntimeException(
                    "Attendance already exists for today"
            );
        }

        // Check holiday
        List<Holiday> holidays =
                holidayRepository.findByHolidayDateBetween(
                        today,
                        today
                );

        if (!holidays.isEmpty()) {
            throw new RuntimeException(
                    "Today is a holiday: "
                            + holidays.get(0).getHolidayName()
            );
        }

        // Check approved leave
        Optional<Leave> approvedLeave =
                leaveRepository
                        .findByEmployeeAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                employee,
                                LeaveStatus.APPROVED,
                                today,
                                today
                        );

        if (approvedLeave.isPresent()) {

            Leave leave = approvedLeave.get();

            throw new RuntimeException(
                    "Employee is on approved "
                            + leave.getLeaveType()
                            + " leave today"
            );
        }

        // Normal attendance
        Attendance attendance = new Attendance();

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(today);
        attendance.setPunchIn(LocalDateTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);

        return attendanceRepository.save(attendance);
    }

    public Attendance punchOut(String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();

        Attendance attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(employee, today)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Punch in not found for today"
                                ));

        if (attendance.getPunchOut() != null) {
            throw new RuntimeException(
                    "Employee has already punched out today"
            );
        }

        LocalDateTime punchOut = LocalDateTime.now();

        attendance.setPunchOut(punchOut);

        long minutes = Duration.between(
                attendance.getPunchIn(),
                punchOut
        ).toMinutes();

        double workingHours = minutes / 60.0;

        attendance.setWorkingHours(workingHours);

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getTodayAttendance() {

        return attendanceRepository.findByAttendanceDate(
                LocalDate.now()
        );
    }

    public List<Attendance> getEmployeeAttendance(
            String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        return attendanceRepository.findByEmployee(employee);
    }

    public Attendance generateDailyAttendance(String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        LocalDate today = LocalDate.now();

        // Don't create duplicate attendance
        Optional<Attendance> existing =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(employee, today);

        if (existing.isPresent()) {
            return existing.get();
        }

        // Holiday
        List<Holiday> holidays =
                holidayRepository.findByHolidayDateBetween(
                        today,
                        today
                );

        if (!holidays.isEmpty()) {

            Attendance attendance = new Attendance();

            attendance.setEmployee(employee);
            attendance.setAttendanceDate(today);
            attendance.setStatus(AttendanceStatus.HOLIDAY);

            return attendanceRepository.save(attendance);
        }

        // Approved leave
        Optional<Leave> approvedLeave =
                leaveRepository
                        .findByEmployeeAndStatusAndStartDateLessThanEqualAndEndDateGreaterThanEqual(
                                employee,
                                LeaveStatus.APPROVED,
                                today,
                                today
                        );

        if (approvedLeave.isPresent()) {

            Leave leave = approvedLeave.get();

            Attendance attendance = new Attendance();

            attendance.setEmployee(employee);
            attendance.setAttendanceDate(today);

            if (leave.getLeaveType() == LeaveType.PAID) {
                attendance.setStatus(AttendanceStatus.PAID_LEAVE);
            } else {
                attendance.setStatus(AttendanceStatus.UNPAID_LEAVE);
            }

            return attendanceRepository.save(attendance);
        }

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setAttendanceDate(today);
        attendance.setStatus(AttendanceStatus.ABSENT);

        return attendanceRepository.save(attendance);
    }
}