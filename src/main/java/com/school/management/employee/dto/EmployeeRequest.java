package com.school.management.employee.dto;

import com.school.management.employee.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private Role role;
    private String name;
    private String aadhaarNo;
    private String panNo;
    private String emailId;
    private String phoneNo;
    private String fatherName;
    private String motherName;
    private String husbandName;
}
