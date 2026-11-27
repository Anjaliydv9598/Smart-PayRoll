
package com.school.management.student.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record StudentUpdateRequest(

        @NotBlank
        @Size(max = 100)
        String fullName,

        LocalDate dateOfBirth,

        @NotBlank
        String className,

        @NotBlank
        String section,

        @NotBlank
        String rollNumber,

        @NotBlank
        @Email
        String email,

        @NotBlank
        String fatherName,

        @NotBlank
        @Pattern(regexp = "^[0-9]{10}$")
        String fatherMobile,

        @NotBlank
        String motherName,

        @NotBlank
        @Pattern(regexp = "^[0-9]{10}$")
        String motherMobile,

        @Pattern(regexp = "^$|^[0-9]{10}$")
        String alternativeMobile
) {}

