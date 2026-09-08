package com.school.management.holiday.service;

import com.school.management.exception.HolidayAlreadyExistsException;
import com.school.management.exception.HolidayNotFoundException;
import com.school.management.holiday.client.ExternalHolidayResponse;
import com.school.management.holiday.client.HolidayApiClient;
import com.school.management.holiday.dto.HolidayRequest;
import com.school.management.holiday.entity.Holiday;
import com.school.management.holiday.entity.HolidayType;
import com.school.management.holiday.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HolidayService {

    private final HolidayRepository holidayRepository;
    private final HolidayApiClient holidayApiClient;


    // =========================
    // IMPORT HOLIDAYS FROM API
    // =========================

    public int importHolidays(int year) {

        String countryCode = "IN";

        var holidays =
                holidayApiClient.getHolidays(countryCode, year);

        if (holidays == null || holidays.isEmpty()) {
            return 0;
        }

        int importedCount = 0;

        for (ExternalHolidayResponse externalHoliday : holidays) {

            boolean exists =
                    holidayRepository.existsByHolidayDateAndHolidayName(
                            externalHoliday.date(),
                            externalHoliday.name()
                    );

            if (!exists) {

                Holiday holiday = new Holiday();

                holiday.setHolidayDate(externalHoliday.date());
                holiday.setHolidayName(externalHoliday.name());

                holiday.setHolidayType(
                        mapHolidayType(externalHoliday)
                );

                holiday.setSource("TALLYFY_API");

                holidayRepository.save(holiday);

                importedCount++;
            }
        }

        return importedCount;
    }

    // =========================
    // MAP API HOLIDAY TYPE
    // =========================

    private HolidayType mapHolidayType(
            ExternalHolidayResponse externalHoliday) {

        if (externalHoliday.type() != null
                && externalHoliday.type().equalsIgnoreCase("national")) {

            return HolidayType.GOVERNMENT;
        }

        return HolidayType.TRADITIONAL;
    }


    // =========================
    // ADMIN ADD HOLIDAY
    // =========================

    public Holiday addHoliday(HolidayRequest request) {

        boolean exists =
                holidayRepository.existsByHolidayDateAndHolidayName(
                        request.holidayDate(),
                        request.holidayName()
                );

        if (exists) {
            throw new HolidayAlreadyExistsException(
                    "Holiday already exists for this date and name."
            );
        }

        Holiday holiday = new Holiday();

        holiday.setHolidayDate(request.holidayDate());
        holiday.setHolidayName(request.holidayName());
        holiday.setHolidayType(request.holidayType());
        holiday.setSource("ADMIN");

        return holidayRepository.save(holiday);
    }


    // =========================
    // ADMIN UPDATE HOLIDAY
    // =========================

    public Holiday updateHoliday(
            Long id,
            HolidayRequest request) {

        Holiday holiday =
                holidayRepository.findById(id)
                        .orElseThrow(() ->
                                new HolidayNotFoundException(
                                        "Holiday not found with id: " + id
                                ));

        holiday.setHolidayDate(request.holidayDate());
        holiday.setHolidayName(request.holidayName());
        holiday.setHolidayType(request.holidayType());

        return holidayRepository.save(holiday);
    }


    // =========================
    // ADMIN DELETE HOLIDAY
    // =========================
    public void deleteHoliday(Long id) {

        if (!holidayRepository.existsById(id)) {
            throw new HolidayNotFoundException(
                    "Holiday not found with id: " + id
            );
        }

        holidayRepository.deleteById(id);
    }

}