package com.school.management.attendance.entity;

import com.school.management.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "emp_id", nullable = false)
    private Employee employee;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate attendanceDate;

    @Column(name = "punch_in")
    private LocalDateTime punchIn;

    @Column(name = "punch_out")
    private LocalDateTime punchOut;

    @Column(name = "working_hours")
    private Double workingHours;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private AttendanceStatus status;
}