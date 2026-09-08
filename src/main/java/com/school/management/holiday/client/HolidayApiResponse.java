package com.school.management.holiday.client;

import java.util.List;

public record HolidayApiResponse(
        Country country,
        int year,
        List<ExternalHolidayResponse> holidays
) {
}