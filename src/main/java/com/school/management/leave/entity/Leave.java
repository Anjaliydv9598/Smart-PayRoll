package com.school.management.leave.entity;

import com.school.management.employee.entity.Employee;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee_leave")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "emp_id", nullable = false)
    private Employee employee;

    @Column(name = "leave_date", nullable=false)
    private LocalDate leaveDate;

    @Enumerated(EnumType.STRING)
    @Column(name= "leave_type")
    private LeaveType leaveType;

    @Column(name = "reason")
    private String reason;

}
