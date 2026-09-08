package com.school.management.attendance.controller;

import com.school.management.attendance.entity.Attendance;
import com.school.management.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/punch-in/{employeeId}")
    public Attendance punchIn(
            @PathVariable String employeeId) {

        return attendanceService.punchIn(employeeId);
    }

    @PostMapping("/punch-out/{employeeId}")
    public Attendance punchOut(
            @PathVariable String employeeId) {

        return attendanceService.punchOut(employeeId);
    }

    @GetMapping("/today")
    public List<Attendance> getTodayAttendance() {

        return attendanceService.getTodayAttendance();
    }

    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getEmployeeAttendance(
            @PathVariable String employeeId) {

        return attendanceService.getEmployeeAttendance(employeeId);
    }

    @PostMapping("/generate/{employeeId}")
    public Attendance generateDailyAttendance(
            @PathVariable String employeeId) {

        return attendanceService.generateDailyAttendance(employeeId);
    }
}