package com.school.management.holiday.dto;

import java.time.LocalDate;

public record HolidayResponse(
        LocalDate date,
        String name,
        String type
    )

{


}