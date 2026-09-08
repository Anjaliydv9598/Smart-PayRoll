package com.school.management.holiday.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "holidays",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"holiday_date", "holiday_name"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "holiday_date", nullable = false)
    private LocalDate holidayDate;

    @Column(name = "holiday_name", nullable = false)
    private String holidayName;

    @Enumerated(EnumType.STRING)
    @Column(name = "holiday_type", nullable = false)
    private HolidayType holidayType;

    @Column(name = "source")
    private String source;
}
