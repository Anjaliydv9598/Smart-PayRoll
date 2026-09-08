package com.school.management.attendance.service;

import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AttendanceScheduler {

    private final AttendanceService attendanceService;
    private final EmployeeRepository employeeRepository;

    @Scheduled(cron = "0 */1 * * * *")
    public void generateDailyAttendance() {

        for (Employee employee : employeeRepository.findAll()) {

            attendanceService.generateDailyAttendance(
                    employee.getEmpId()
            );
        }
    }
}