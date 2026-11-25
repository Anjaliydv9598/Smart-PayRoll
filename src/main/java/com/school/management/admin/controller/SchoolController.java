package com.school.management.admin.controller;


import com.school.management.admin.dto.SchoolRequest;
import com.school.management.admin.service.SchoolService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/school")
@CrossOrigin(origins = "http://localhost:5173")
public class SchoolController {

    private final SchoolService schoolService;

    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    // CREATE SCHOOL
    @PostMapping
    public ResponseEntity<SchoolRequest> createSchool(
            @RequestBody SchoolRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(schoolService.createSchool(request));
    }

    // GET SCHOOL
    @GetMapping
    public ResponseEntity<SchoolRequest> getSchool() {

        return ResponseEntity.ok(
                schoolService.getSchool()
        );
    }

    // UPDATE SCHOOL
    @PutMapping
    public ResponseEntity<SchoolRequest> updateSchool(
            @RequestBody SchoolRequest request) {

        return ResponseEntity.ok(
                schoolService.updateSchool(request)
        );
    }
}
