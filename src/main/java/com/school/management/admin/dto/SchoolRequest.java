package com.school.management.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class SchoolRequest {

    private String schoolName;
    private String schoolType;
    private String address;
    private String city;
    private String state;
    private String pincode;

    private String phone;
    private String email;
    private String website;

    private String affiliationNumber;
    private String registrationNumber;

    private String academicSession;
    private String sessionStart;
    private String sessionEnd;

    private String workingDays;
    private String weeklyHoliday;

    private String schoolStartTime;
    private String schoolEndTime;

    private String principalName;
    private String principalPhone;
    private String principalEmail;

    private String adminName;
    private String managementName;

    private String salaryPaymentDate;
    private String salaryCalculation;
    private String monthlyWorkingDays;

    private String pfApplicable;
    private String taxApplicable;

    private String reportingTime;
    private String lateAfter;
    private String halfDayAfter;

    private String attendanceMethod;
    private String correctionApproval;

    private String registrationDocument;
    private String affiliationDocument;
    private String otherDocuments;
}
