
package com.school.management.student.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record StudentRegistrationRequest(

        @NotBlank(message = "Full name is required")
        String fullName,

        @NotNull(message = "Date of birth is required")
        LocalDate dateOfBirth,

        @NotBlank(message = "Class is required")
        String className,

        @NotBlank(message = "Section is required")
        String section,

        @NotBlank(message = "Roll number is required")
        String rollNumber,

        @NotBlank(message = "Email is required")
        @Email(message = "Enter a valid email address")
        String email,

        @NotBlank(message = "Father's name is required")
        String fatherName,

        @NotBlank(message = "Father's mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$",
                message = "Father's mobile must contain 10 digits")
        String fatherMobile,

        @NotBlank(message = "Mother's name is required")
        String motherName,

        @NotBlank(message = "Mother's mobile number is required")
        @Pattern(regexp = "^[0-9]{10}$",
                message = "Mother's mobile must contain 10 digits")
        String motherMobile,

        @Pattern(regexp = "^[0-9]{10}$",
                message = "Alternative mobile must contain 10 digits")
        String alternativeMobile,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must contain at least 8 characters")
        String password,

        @NotBlank(message = "Confirm password is required")
        String confirmPassword

) {}
