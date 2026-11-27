
package com.school.management.admin.controller;

import com.school.management.student.dto.StudentResponse;
import com.school.management.student.dto.StudentUpdateRequest;
import com.school.management.student.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/students")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
@PreAuthorize("hasRole('ADMIN')")
public class AdminStudentController {

    private final StudentService studentService;

    public AdminStudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        return ResponseEntity.ok(
                studentService.getAllStudentsForAdmin()
        );
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> getStudentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id)
        );
    }

    // Search students
    @GetMapping("/search")
    public ResponseEntity<List<StudentResponse>> searchStudents(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                studentService.searchStudents(keyword)
        );
    }

    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentUpdateRequest request) {

        return ResponseEntity.ok(
                studentService.updateStudent(id, request)
        );
    }

    // Deactivate student
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<StudentResponse> deactivateStudent(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.deactivateStudent(id)
        );
    }

    // Activate student
    @PatchMapping("/{id}/activate")
    public ResponseEntity<StudentResponse> activateStudent(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.activateStudent(id)
        );
    }

    // Permanently delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.noContent().build();
    }
}
