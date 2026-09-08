package com.school.management.holiday.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Year;

@Component
@RequiredArgsConstructor
@Slf4j
public class HolidayScheduler {

    private final HolidayService holidayService;

    @Scheduled(
            cron = "0 0 2 * * *",
            zone = "Asia/Kolkata"
    )
    public void syncHolidays() {

        int currentYear = Year.now().getValue();
        int nextYear = currentYear + 1;

        try {

            int currentYearCount =
                    holidayService.importHolidays(currentYear);

            int nextYearCount =
                    holidayService.importHolidays(nextYear);

            log.info(
                    "Holiday synchronization completed. " +
                            "Current year: {}, Next year: {}",
                    currentYearCount,
                    nextYearCount
            );

        } catch (Exception e) {

            log.error(
                    "Holiday synchronization failed.",
                    e
            );
        }
    }
}
