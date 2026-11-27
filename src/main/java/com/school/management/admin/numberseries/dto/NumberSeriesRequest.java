package com.school.management.admin.numberseries.dto;

public record NumberSeriesRequest(
        String department,
        String prefix,
        Integer startNumber,
        Integer endNumber,
        Integer numberLength,
        Boolean active
) {
}