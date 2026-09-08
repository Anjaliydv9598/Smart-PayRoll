package com.school.management.holiday.controller;

import com.school.management.holiday.dto.HolidayRequest;
import com.school.management.holiday.entity.Holiday;
import com.school.management.holiday.service.HolidayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holidays")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class HolidayController {

    private final HolidayService holidayService;

    @GetMapping
    public List<Holiday> getHolidays(
            @RequestParam int year) {

        return holidayService.getHolidays(year);
    }

    @PostMapping
    public Holiday addHoliday(
            @Valid @RequestBody HolidayRequest request) {

        return holidayService.addHoliday(request);
    }

    @PutMapping("/{id}")
    public Holiday updateHoliday(
            @PathVariable Long id,
            @Valid @RequestBody HolidayRequest request) {

        return holidayService.updateHoliday(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteHoliday(
            @PathVariable Long id) {

        holidayService.deleteHoliday(id);

        return "Holiday deleted successfully.";
    }
}