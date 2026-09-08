package com.school.management.holiday.client;

import java.time.LocalDate;

public record ExternalHolidayResponse(
        LocalDate date,
        String name,
        String local_name,
        String type,
        String observed_date,
        boolean is_observed_shifted,
        String description
) {
}