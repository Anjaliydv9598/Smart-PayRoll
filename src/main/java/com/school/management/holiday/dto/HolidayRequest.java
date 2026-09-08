package com.school.management.holiday.dto;

import com.school.management.holiday.entity.HolidayType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record HolidayRequest(

        @NotNull(message = "Holiday date is required")
        LocalDate holidayDate,

        @NotBlank(message = "Holiday name is required")
        String holidayName,

        @NotNull(message = "Holiday type is required")
        HolidayType holidayType
) {
}