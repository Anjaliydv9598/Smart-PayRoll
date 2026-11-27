
package com.school.management.student.dto;

import java.time.LocalDate;

public record StudentResponse(

        Long id,
        String fullName,
        LocalDate dateOfBirth,
        String className,
        String section,
        String rollNumber,
        String email,
        String fatherName,
        String fatherMobile,
        String motherName,
        String motherMobile,
        String alternativeMobile,
        boolean active

) {}
