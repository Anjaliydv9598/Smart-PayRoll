package com.school.management.attendance.correction;

import com.school.management.employee.entity.Employee;
import com.school.management.employee.repository.EmployeeRepository;
import com.school.management.attendance.entity.Attendance;
import com.school.management.attendance.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/attendance/correction")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceCorrectionController {

    private final AttendanceCorrectionRepository correctionRepository;
    private final EmployeeRepository employeeRepository;
    private final AttendanceRepository attendanceRepository;

    @PostMapping("/{employeeId}")
    public AttendanceCorrectionRequest createRequest(
            @PathVariable String employeeId,
            @RequestBody AttendanceCorrectionRequest request) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        request.setId(null);
        request.setEmployee(employee);
        request.setStatus(CorrectionStatus.PENDING);

        return correctionRepository.save(request);
    }

    @GetMapping("/pending")
    public List<AttendanceCorrectionRequest> getPendingRequests() {

        return correctionRepository.findByStatus(
                CorrectionStatus.PENDING
        );
    }

    @PutMapping("/{id}/approve")
    public AttendanceCorrectionRequest approve(
            @PathVariable Long id) {

        AttendanceCorrectionRequest request =
                correctionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Correction request not found"));

        Attendance attendance =
                attendanceRepository
                        .findByEmployeeAndAttendanceDate(
                                request.getEmployee(),
                                request.getAttendanceDate()
                        )
                        .orElseGet(() -> {

                            Attendance a = new Attendance();

                            a.setEmployee(request.getEmployee());
                            a.setAttendanceDate(
                                    request.getAttendanceDate());

                            return a;
                        });

        attendance.setPunchIn(request.getRequestedPunchIn());
        attendance.setPunchOut(request.getRequestedPunchOut());
        attendance.setStatus(
                com.school.management.attendance.entity.AttendanceStatus.PRESENT
        );

        if (request.getRequestedPunchIn() != null &&
                request.getRequestedPunchOut() != null) {

            long minutes =
                    java.time.Duration.between(
                            request.getRequestedPunchIn(),
                            request.getRequestedPunchOut()
                    ).toMinutes();

            attendance.setWorkingHours(minutes / 60.0);
        }

        attendance.setCorrectionReason(request.getReason());
        attendance.setModifiedBy("ADMIN");
        attendance.setModifiedAt(LocalDateTime.now());

        attendanceRepository.save(attendance);

        request.setStatus(CorrectionStatus.APPROVED);
        request.setReviewedBy("ADMIN");
        request.setReviewedAt(LocalDateTime.now());

        return correctionRepository.save(request);
    }

    @PutMapping("/{id}/reject")
    public AttendanceCorrectionRequest reject(
            @PathVariable Long id) {

        AttendanceCorrectionRequest request =
                correctionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Correction request not found"));

        request.setStatus(CorrectionStatus.REJECTED);
        request.setReviewedBy("ADMIN");
        request.setReviewedAt(LocalDateTime.now());

        return correctionRepository.save(request);
    }
}