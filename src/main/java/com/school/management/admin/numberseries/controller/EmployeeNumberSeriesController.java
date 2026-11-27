package com.school.management.admin.numberseries.controller;

import com.school.management.admin.numberseries.dto.NumberSeriesRequest;
import com.school.management.admin.numberseries.dto.NumberSeriesResponse;
import com.school.management.admin.numberseries.service.EmployeeNumberSeriesService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employee-number-series")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class EmployeeNumberSeriesController {

    private final EmployeeNumberSeriesService service;

    public EmployeeNumberSeriesController(
            EmployeeNumberSeriesService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<NumberSeriesResponse>> getAllSeries() {
        return ResponseEntity.ok(service.getAllSeries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSeriesById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.getSeriesById(id));
        } catch (IllegalArgumentException e) {
            return error(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createSeries(
            @RequestBody NumberSeriesRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(service.createSeries(request));
        } catch (IllegalArgumentException e) {
            return error(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeries(
            @PathVariable Long id,
            @RequestBody NumberSeriesRequest request) {
        try {
            return ResponseEntity.ok(service.updateSeries(id, request));
        } catch (IllegalArgumentException e) {
            return error(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeries(@PathVariable Long id) {
        try {
            service.deleteSeries(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return error(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    private ResponseEntity<Map<String, String>> error(
            HttpStatus status, String message) {
        return ResponseEntity.status(status)
                .body(Map.of("message", message));
    }
}