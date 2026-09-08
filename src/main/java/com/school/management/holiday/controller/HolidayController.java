package com.school.management.holiday.controller;

import com.school.management.holiday.dto.HolidayRequest;
import com.school.management.holiday.entity.Holiday;
import com.school.management.holiday.repository.HolidayRepository;
import com.school.management.holiday.service.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class HolidayController {

    private final HolidayRepository holidayRepository;
    private final HolidayService holidayService;

    @PostMapping("/import/{year}")
    public String importHolidays(@PathVariable int year) {

        int count = holidayService.importHolidays(year);

        return count + " holidays imported successfully.";
    }

    @GetMapping
    public List<Holiday> getHolidays(
            @RequestParam int year
    ) {

        LocalDate startDate =
                LocalDate.of(year, 1, 1);

        LocalDate endDate =
                LocalDate.of(year, 12, 31);

        return holidayRepository
                .findByHolidayDateBetween(
                        startDate,
                        endDate
                );
    }


    @PostMapping
    public Holiday addHoliday(
            @RequestBody HolidayRequest request
    ) {

        return holidayService.addHoliday(request);
    }

    @PutMapping("/{id}")
    public Holiday updateHoliday(
            @PathVariable Long id,
            @RequestBody HolidayRequest request
    ) {

        return holidayService.updateHoliday(id, request);
    }


    @DeleteMapping("/{id}")
    public String deleteHoliday(
            @PathVariable Long id
    ) {

        holidayService.deleteHoliday(id);

        return "Holiday deleted successfully.";
    }


}