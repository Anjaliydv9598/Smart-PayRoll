
package com.school.management.student.service;

import com.school.management.admin.entity.School;
import com.school.management.admin.repository.SchoolRepository;
import com.school.management.student.dto.StudentLoginRequest;
import com.school.management.student.dto.StudentRegistrationRequest;
import com.school.management.student.dto.StudentResponse;
import com.school.management.student.dto.StudentUpdateRequest;
import com.school.management.student.entity.Student;
import com.school.management.student.repository.StudentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final SchoolRepository schoolRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(
            StudentRepository studentRepository,
            SchoolRepository schoolRepository,
            PasswordEncoder passwordEncoder) {

        this.studentRepository = studentRepository;
        this.schoolRepository = schoolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =====================================================
    // STUDENT REGISTRATION
    // =====================================================

    @Transactional
    public StudentResponse registerStudent(
            StudentRegistrationRequest request) {

        String email = request.email().trim().toLowerCase(Locale.ROOT);

        if (!request.password().equals(request.confirmPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Passwords do not match");
        }

        if (studentRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered");
        }

        boolean rollExists =
                studentRepository
                        .existsByClassNameIgnoreCaseAndSectionIgnoreCaseAndRollNumberIgnoreCase(
                                request.className().trim(),
                                request.section().trim(),
                                request.rollNumber().trim());

        if (rollExists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Roll number already exists in this class and section");
        }

        School school = schoolRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Create school profile first"));

        Student student = new Student();

        student.setFullName(request.fullName().trim());
        student.setDateOfBirth(request.dateOfBirth());
        student.setClassName(request.className().trim());
        student.setSection(request.section().trim());
        student.setRollNumber(request.rollNumber().trim());
        student.setEmail(email);

        student.setFatherName(request.fatherName().trim());
        student.setFatherMobile(request.fatherMobile().trim());
        student.setMotherName(request.motherName().trim());
        student.setMotherMobile(request.motherMobile().trim());

        student.setAlternativeMobile(
                request.alternativeMobile() == null ||
                        request.alternativeMobile().isBlank()
                        ? null
                        : request.alternativeMobile().trim());

        student.setPasswordHash(
                passwordEncoder.encode(request.password()));

        student.setActive(true);
        student.setSchool(school);

        return convertToResponse(studentRepository.save(student));
    }

    // =====================================================
    // STUDENT LOGIN
    // =====================================================

    @Transactional(readOnly = true)
    public StudentResponse loginStudent(StudentLoginRequest request) {

        String email = request.email().trim().toLowerCase(Locale.ROOT);

        Student student = studentRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"));

        if (!student.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Student account is inactive");
        }

        if (!passwordEncoder.matches(
                request.password(),
                student.getPasswordHash())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password");
        }

        return convertToResponse(student);
    }

    // =====================================================
    // STUDENT PROFILE
    // =====================================================

    @Transactional(readOnly = true)
    public StudentResponse getStudentByEmail(String email) {

        Student student = studentRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found"));

        if (!student.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Student account is inactive");
        }

        return convertToResponse(student);
    }

    // =====================================================
    // ADMIN: GET ALL STUDENTS
    // =====================================================

    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {

        return studentRepository
                .findAllByOrderByClassNameAscSectionAscRollNumberAsc()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Alias for the admin controller
    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudentsForAdmin() {
        return getAllStudents();
    }

    // =====================================================
    // ADMIN: GET STUDENT BY ID
    // =====================================================

    @Transactional(readOnly = true)
    public StudentResponse getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found with ID: " + id));

        return convertToResponse(student);
    }

    // =====================================================
    // ADMIN: SEARCH STUDENTS
    // =====================================================

    @Transactional(readOnly = true)
    public List<StudentResponse> searchStudents(String keyword) {

        if (keyword == null || keyword.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Search keyword cannot be empty");
        }

        return studentRepository.searchStudents(keyword.trim())
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // =====================================================
    // ADMIN: UPDATE STUDENT
    // =====================================================

    @Transactional
    public StudentResponse updateStudent(
            Long id,
            StudentUpdateRequest request) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found with ID: " + id));

        String email = request.email().trim().toLowerCase(Locale.ROOT);
        String className = request.className().trim();
        String section = request.section().trim();
        String rollNumber = request.rollNumber().trim();

        boolean emailUsedByAnotherStudent =
                studentRepository.findByEmailIgnoreCase(email)
                        .filter(existing -> !existing.getId().equals(id))
                        .isPresent();

        if (emailUsedByAnotherStudent) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered by another student");
        }

        boolean rollExists =
                studentRepository
                        .existsByClassNameIgnoreCaseAndSectionIgnoreCaseAndRollNumberIgnoreCase(
                                className,
                                section,
                                rollNumber);

        boolean sameRollNumber =
                student.getClassName().equalsIgnoreCase(className)
                        && student.getSection().equalsIgnoreCase(section)
                        && student.getRollNumber().equalsIgnoreCase(rollNumber);

        if (rollExists && !sameRollNumber) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Roll number already exists in this class and section");
        }

        student.setFullName(request.fullName().trim());
        student.setDateOfBirth(request.dateOfBirth());
        student.setClassName(className);
        student.setSection(section);
        student.setRollNumber(rollNumber);
        student.setEmail(email);

        student.setFatherName(request.fatherName().trim());
        student.setFatherMobile(request.fatherMobile().trim());
        student.setMotherName(request.motherName().trim());
        student.setMotherMobile(request.motherMobile().trim());

        student.setAlternativeMobile(
                request.alternativeMobile() == null ||
                        request.alternativeMobile().isBlank()
                        ? null
                        : request.alternativeMobile().trim());

        return convertToResponse(studentRepository.save(student));
    }

    // =====================================================
    // ADMIN: DEACTIVATE STUDENT
    // =====================================================

    @Transactional
    public StudentResponse deactivateStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found with ID: " + id));

        student.setActive(false);

        return convertToResponse(studentRepository.save(student));
    }

    // =====================================================
    // ADMIN: ACTIVATE STUDENT
    // =====================================================

    @Transactional
    public StudentResponse activateStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found with ID: " + id));

        student.setActive(true);

        return convertToResponse(studentRepository.save(student));
    }

    // =====================================================
    // ADMIN: PERMANENTLY DELETE STUDENT
    // =====================================================

    @Transactional
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Student not found with ID: " + id));

        studentRepository.delete(student);
    }

    // =====================================================
    // CONVERT ENTITY TO RESPONSE
    // =====================================================

    private StudentResponse convertToResponse(Student student) {

        return new StudentResponse(
                student.getId(),
                student.getFullName(),
                student.getDateOfBirth(),
                student.getClassName(),
                student.getSection(),
                student.getRollNumber(),
                student.getEmail(),
                student.getFatherName(),
                student.getFatherMobile(),
                student.getMotherName(),
                student.getMotherMobile(),
                student.getAlternativeMobile(),
                student.isActive());
    }
}
