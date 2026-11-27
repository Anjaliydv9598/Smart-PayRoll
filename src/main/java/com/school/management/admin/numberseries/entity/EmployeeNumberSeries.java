
package com.school.management.admin.numberseries.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "employee_number_series",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_number_series_department",
                        columnNames = "department"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class EmployeeNumberSeries {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String prefix;

    @Column(nullable = false)
    private int startNumber;

    @Column(nullable = false)
    private int endNumber;

    @Column(nullable = false)
    private int numberLength;

    @Column(nullable = false)
    private int nextNumber;

    @Column(nullable = false)
    private boolean active = true;
}
