package com.school.management.holiday.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.List;

@Component
public class HolidayApiClient {

    private final RestClient restClient;

    public HolidayApiClient(RestClient.Builder builder) {

        this.restClient = builder
                .baseUrl("https://tallyfy.com")
                .build();
    }

    public List<ExternalHolidayResponse> getHolidays(
            String countryCode,
            int year) {

        HolidayApiResponse response =
                restClient
                        .get()
                        .uri(
                                "/national-holidays/api/{countryCode}/{year}.json",
                                countryCode,
                                year
                        )
                        .retrieve()
                        .body(HolidayApiResponse.class);

        if (response == null || response.holidays() == null) {
            return List.of();
        }

        return response.holidays();
    }
}