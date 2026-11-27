package com.school.management.admin.numberseries.dto;

import com.school.management.admin.numberseries.entity.EmployeeNumberSeries;

public record NumberSeriesResponse(
        Long id,
        String department,
        String prefix,
        int startNumber,
        int endNumber,
        int numberLength,
        int nextNumber,
        String nextEmployeeId,
        boolean active
) {
    public static NumberSeriesResponse from(
            EmployeeNumberSeries series) {

        String nextEmployeeId = series.getPrefix()
                + String.format(
                "%0" + series.getNumberLength() + "d",
                series.getNextNumber()
        );

        return new NumberSeriesResponse(
                series.getId(),
                series.getDepartment(),
                series.getPrefix(),
                series.getStartNumber(),
                series.getEndNumber(),
                series.getNumberLength(),
                series.getNextNumber(),
                nextEmployeeId,
                series.isActive()
        );
    }
}