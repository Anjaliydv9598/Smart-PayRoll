package com.school.management.admin.controller;


import com.school.management.admin.dto.AdminDashboardResponse;
import com.school.management.admin.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    public AdminDashboardController(
            AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /*
     * Temporary calculation endpoint.
     * Replace with database-backed service
     * before using in production.
     */

    @GetMapping("/calculate")
    public ResponseEntity<AdminDashboardResponse> calculate(
            @RequestParam long totalEmployees,
            @RequestParam long presentToday,
            @RequestParam long onLeave,
            @RequestParam long absentToday) {

        AdminDashboardResponse response =
                dashboardService.getDashboardSummary(
                        totalEmployees,
                        presentToday,
                        onLeave,
                        absentToday
                );

        return ResponseEntity.ok(response);
    }
}
