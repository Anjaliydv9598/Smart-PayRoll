package com.school.management.employee.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmployeeSearchRequest {

    private String empIds;

    private LocalDate joiningDate;

    private LocalDate leavingDate;

    private String name;
}