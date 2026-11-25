package com.school.management.admin.service;

import com.school.management.admin.dto.SchoolRequest;
import com.school.management.admin.entity.School;
import com.school.management.admin.repository.SchoolRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SchoolService {

    private final SchoolRepository schoolRepository;

    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    // Create school profile
    public SchoolRequest createSchool(SchoolRequest request) {

        if (schoolRepository.findFirstByOrderByIdAsc().isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "School profile already exists"
            );
        }

        School school = new School();

        BeanUtils.copyProperties(request, school);

        School savedSchool = schoolRepository.save(school);

        return convertToResponse(savedSchool);
    }

    // Get school profile
    public SchoolRequest getSchool() {

        School school = schoolRepository
                .findFirstByOrderByIdAsc()
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "School profile not found"
                        )
                );

        return convertToResponse(school);
    }

    // Update school profile
    public SchoolRequest updateSchool(SchoolRequest request) {

        School school = schoolRepository
                .findFirstByOrderByIdAsc()
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "School profile not found"
                        )
                );

        BeanUtils.copyProperties(request, school);

        School updatedSchool = schoolRepository.save(school);

        return convertToResponse(updatedSchool);
    }

    // Convert Entity into DTO
    private SchoolRequest convertToResponse(School school) {

        SchoolRequest response = new SchoolRequest();

        BeanUtils.copyProperties(school, response);

        return response;
    }
}

