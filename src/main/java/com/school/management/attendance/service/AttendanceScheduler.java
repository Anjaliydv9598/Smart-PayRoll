package com.school.management.attendance.service;

import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class AttendanceScheduler {

    private final AttendanceService attendanceService;
    private final EmployeeRepository employeeRepository;

    @Scheduled(cron = "0 */1 * * * *")
    public void generateDailyAttendance() {

        log.info("===== ATTENDANCE SCHEDULER STARTED =====");

        var employees = employeeRepository.findAll();

        log.info("Total employees found: {}", employees.size());

        for (Employee employee : employees) {

            try {
                var attendance =
                        attendanceService.generateDailyAttendance(
                                employee.getEmpId()
                        );

                log.info(
                        "{} -> {}",
                        employee.getEmpId(),
                        attendance.getStatus()
                );

            } catch (Exception e) {

                log.error(
                        "Failed for employee {}",
                        employee.getEmpId(),
                        e
                );
            }
        }

        log.info("===== ATTENDANCE SCHEDULER COMPLETED =====");
    }
}