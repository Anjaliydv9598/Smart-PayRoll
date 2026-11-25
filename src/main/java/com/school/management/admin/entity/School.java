package com.school.management.admin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin_school_profile")
@Getter
@Setter
@NoArgsConstructor
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Information
    private String schoolName;
    private String schoolType;

    @Column(length = 500)
    private String address;

    private String city;
    private String state;
    private String pincode;

    private String phone;
    private String email;
    private String website;

    private String affiliationNumber;
    private String registrationNumber;

    // Academic Information
    private String academicSession;
    private String sessionStart;
    private String sessionEnd;

    private String workingDays;
    private String weeklyHoliday;

    private String schoolStartTime;
    private String schoolEndTime;

    // Administration
    private String principalName;
    private String principalPhone;
    private String principalEmail;

    private String adminName;
    private String managementName;

    // Payroll Configuration
    private String salaryPaymentDate;
    private String salaryCalculation;
    private String monthlyWorkingDays;

    private String pfApplicable;
    private String taxApplicable;

    // Attendance Policies
    private String reportingTime;
    private String lateAfter;
    private String halfDayAfter;

    private String attendanceMethod;
    private String correctionApproval;

    // Document References
    private String registrationDocument;
    private String affiliationDocument;
    private String otherDocuments;
}
