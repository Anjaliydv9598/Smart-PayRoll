
package com.school.management.student.entity;

import com.school.management.admin.entity.School;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_student_email",
                        columnNames = "email"
                ),
                @UniqueConstraint(
                        name = "uk_student_class_section_roll",
                        columnNames = {"class_name", "section", "roll_number"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "class_name", nullable = false)
    private String className;

    @Column(nullable = false)
    private String section;

    @Column(name = "roll_number", nullable = false)
    private String rollNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "father_name", nullable = false)
    private String fatherName;

    @Column(name = "father_mobile", nullable = false)
    private String fatherMobile;

    @Column(name = "mother_name", nullable = false)
    private String motherName;

    @Column(name = "mother_mobile", nullable = false)
    private String motherMobile;

    @Column(name = "alternative_mobile")
    private String alternativeMobile;

    // Store only the BCrypt hash, never the original password.
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "school_id", nullable = false)
    private School school;
}
