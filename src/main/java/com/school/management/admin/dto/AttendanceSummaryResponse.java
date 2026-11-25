package com.school.management.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceSummaryResponse {

    private long present;

    private long absent;

    private long onLeave;

    private long holiday;

    private long totalMarked;
}
