package com.school.management.leave.service;

import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.leave.dto.LeaveRequest;
import com.school.management.leave.entity.Leave;
import com.school.management.leave.entity.LeaveStatus;
import com.school.management.leave.repository.LeaveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public Leave applyLeave(
            String employeeId,
            LeaveRequest request) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        if (request.endDate().isBefore(request.startDate())) {
            throw new RuntimeException(
                    "End date cannot be before start date");
        }

        Leave leave = new Leave();

        leave.setEmployee(employee);
        leave.setStartDate(request.startDate());
        leave.setEndDate(request.endDate());
        leave.setLeaveType(request.leaveType());
        leave.setStatus(LeaveStatus.PENDING);
        leave.setReason(request.reason());

        return leaveRepository.save(leave);
    }

    public List<Leave> getEmployeeLeaves(String employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        return leaveRepository.findByEmployee(employee);
    }

    public Leave approveLeave(Long leaveId) {

        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException("Leave not found"));

        leave.setStatus(LeaveStatus.APPROVED);

        return leaveRepository.save(leave);
    }

    public Leave rejectLeave(Long leaveId) {

        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException("Leave not found"));

        leave.setStatus(LeaveStatus.REJECTED);

        return leaveRepository.save(leave);
    }
}