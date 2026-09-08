package com.school.management.leave.controller;

import com.school.management.leave.dto.LeaveRequest;
import com.school.management.leave.entity.Leave;
import com.school.management.leave.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping("/{employeeId}")
    public Leave applyLeave(
            @PathVariable String employeeId,
            @Valid @RequestBody LeaveRequest request) {

        return leaveService.applyLeave(employeeId, request);
    }

    @GetMapping("/employee/{employeeId}")
    public List<Leave> getEmployeeLeaves(
            @PathVariable String employeeId) {

        return leaveService.getEmployeeLeaves(employeeId);
    }

    @PutMapping("/{leaveId}/approve")
    public Leave approveLeave(
            @PathVariable Long leaveId) {

        return leaveService.approveLeave(leaveId);
    }

    @PutMapping("/{leaveId}/reject")
    public Leave rejectLeave(
            @PathVariable Long leaveId) {

        return leaveService.rejectLeave(leaveId);
    }


}