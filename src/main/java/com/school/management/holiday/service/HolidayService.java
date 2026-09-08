package com.school.management.holiday.service;

import com.school.management.exception.HolidayAlreadyExistsException;
import com.school.management.exception.HolidayNotFoundException;
import com.school.management.holiday.dto.HolidayRequest;
import com.school.management.holiday.entity.Holiday;
import com.school.management.holiday.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HolidayService {

    private final HolidayRepository holidayRepository;

    public List<Holiday> getHolidays(int year) {

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);

        return holidayRepository.findByHolidayDateBetween(
                startDate,
                endDate
        );
    }

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

    public Holiday updateHoliday(
            Long id,
            HolidayRequest request) {

        Holiday holiday =
                holidayRepository.findById(id)
                        .orElseThrow(() ->
                                new HolidayNotFoundException(
                                        "Holiday not found with id: " + id
                                ));

        boolean duplicate =
                holidayRepository
                        .existsByHolidayDateAndHolidayNameAndIdNot(
                                request.holidayDate(),
                                request.holidayName(),
                                id
                        );

        if (duplicate) {
            throw new HolidayAlreadyExistsException(
                    "Another holiday already exists for this date and name."
            );
        }

        holiday.setHolidayDate(request.holidayDate());
        holiday.setHolidayName(request.holidayName());
        holiday.setHolidayType(request.holidayType());

        return holidayRepository.save(holiday);
    }

    public void deleteHoliday(Long id) {

        if (!holidayRepository.existsById(id)) {
            throw new HolidayNotFoundException(
                    "Holiday not found with id: " + id
            );
        }

        holidayRepository.deleteById(id);
    }
}