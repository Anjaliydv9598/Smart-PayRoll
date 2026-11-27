package com.school.management.admin.numberseries.repository;

import com.school.management.admin.numberseries.entity.EmployeeNumberSeries;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeeNumberSeriesRepository
        extends JpaRepository<EmployeeNumberSeries, Long> {

    List<EmployeeNumberSeries> findAllByOrderByDepartmentAsc();

    Optional<EmployeeNumberSeries> findByDepartmentIgnoreCase(
            String department
    );

    boolean existsByDepartmentIgnoreCase(String department);

    boolean existsByDepartmentIgnoreCaseAndIdNot(
            String department,
            Long id
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        SELECT s FROM EmployeeNumberSeries s
        WHERE LOWER(s.department) = LOWER(:department)
    """)
    Optional<EmployeeNumberSeries> findByDepartmentForUpdate(
            @Param("department") String department
    );
}