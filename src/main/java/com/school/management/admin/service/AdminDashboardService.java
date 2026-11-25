package com.school.management.admin.service;

import com.school.management.admin.dto.AdminDashboardResponse;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    /*
     * Next we will inject your existing:
     *
     * EmployeeRepository
     * AttendanceRepository
     * LeaveRepository
     *
     * All queries must be filtered by the
     * logged-in admin's company.
     */

    public AdminDashboardResponse getDashboardSummary(
            long totalEmployees,
            long presentToday,
            long onLeave,
            long absentToday) {

        double percentage = totalEmployees == 0
                ? 0.0
                : (presentToday * 100.0) / totalEmployees;

        return AdminDashboardResponse.builder()
                .totalEmployees(totalEmployees)
                .presentToday(presentToday)
                .onLeave(onLeave)
                .absentToday(absentToday)
                .attendancePercentage(
                        Math.round(percentage * 100.0) / 100.0
                )
                .build();
    }
}
