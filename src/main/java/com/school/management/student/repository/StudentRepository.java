
package com.school.management.student.repository;

import com.school.management.student.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Check whether email already exists
    boolean existsByEmailIgnoreCase(String email);

    // Check duplicate roll number within the same class and section
    boolean existsByClassNameIgnoreCaseAndSectionIgnoreCaseAndRollNumberIgnoreCase(
            String className,
            String section,
            String rollNumber
    );

    // Find student using email
    Optional<Student> findByEmailIgnoreCase(String email);

    // Get all students sorted by class, section and roll number
    List<Student> findAllByOrderByClassNameAscSectionAscRollNumberAsc();

    // Search students by name, email, class, section or roll number
    @Query("""
            SELECT s FROM Student s
            WHERE LOWER(s.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s.className) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s.section) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(s.rollNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))
            ORDER BY s.className ASC, s.section ASC, s.rollNumber ASC
            """)
    List<Student> searchStudents(@Param("keyword") String keyword);
}
