package com.school.management.holiday.repository;

import com.school.management.holiday.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {

    List<Holiday> findByHolidayDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );


    boolean existsByHolidayDateAndHolidayName(
            LocalDate holidayDate,
            String holidayName
    );
}