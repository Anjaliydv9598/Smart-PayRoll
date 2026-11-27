
package com.school.management.student.controller;

import com.school.management.student.dto.StudentLoginRequest;
import com.school.management.student.dto.StudentRegistrationRequest;
import com.school.management.student.dto.StudentResponse;
import com.school.management.student.service.StudentService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174"
        },
        allowCredentials = "true"
)
public class StudentController {

    private static final String STUDENT_ROLE = "ROLE_STUDENT";

    private final StudentService studentService;
    private final SecurityContextRepository securityContextRepository;

    public StudentController(
            StudentService studentService,
            SecurityContextRepository securityContextRepository) {

        this.studentService = studentService;
        this.securityContextRepository = securityContextRepository;
    }

    // =====================================================
    // 1. STUDENT REGISTRATION
    // =====================================================

    @PostMapping("/students/register")
    public ResponseEntity<StudentResponse> registerStudent(
            @Valid @RequestBody StudentRegistrationRequest request) {

        StudentResponse response =
                studentService.registerStudent(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // =====================================================
    // 2. STUDENT LOGIN
    // =====================================================

    @PostMapping("/students/login")
    public ResponseEntity<StudentResponse> loginStudent(
            @Valid @RequestBody StudentLoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        StudentResponse student =
                studentService.loginStudent(request);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        student.email(),
                        null,
                        List.of(
                                new SimpleGrantedAuthority(STUDENT_ROLE)
                        )
                );

        SecurityContext context =
                SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);

        // Save authentication in HTTP session
        securityContextRepository.saveContext(
                context,
                httpRequest,
                httpResponse
        );

        return ResponseEntity.ok(student);
    }

    // =====================================================
    // 3. GET LOGGED-IN STUDENT PROFILE
    // =====================================================

    @GetMapping("/students/me")
    public ResponseEntity<StudentResponse> getMyProfile(
            Authentication authentication) {

        if (authentication == null ||
                authentication.getAuthorities().stream()
                        .noneMatch(authority ->
                                authority.getAuthority().equals(STUDENT_ROLE))) {

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
        }

        StudentResponse student =
                studentService.getStudentByEmail(
                        authentication.getName()
                );

        return ResponseEntity.ok(student);
    }

    // =====================================================
    // 4. STUDENT LOGOUT
    // =====================================================


    @PostMapping("/students/logout")
    public ResponseEntity<String> logout(
            HttpServletRequest request) {

        SecurityContextHolder.clearContext();

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok("Logged out successfully");
    }

}
