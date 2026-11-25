package com.school.management.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalEmployees;

    private long presentToday;

    private long onLeave;

    private long absentToday;

    private double attendancePercentage;
}
