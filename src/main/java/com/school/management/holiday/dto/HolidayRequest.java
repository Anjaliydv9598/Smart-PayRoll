package com.school.management.holiday.dto;

import com.school.management.holiday.entity.HolidayType;

import java.time.LocalDate;

public record HolidayRequest(
        LocalDate holidayDate,

        String holidayName,

        HolidayType holidayType
) {
}
