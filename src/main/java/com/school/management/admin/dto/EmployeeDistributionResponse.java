package com.school.management.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDistributionResponse {

    private long teachingStaff;

    private long nonTeachingStaff;

    private long administrativeStaff;

    private long totalEmployees;
}
