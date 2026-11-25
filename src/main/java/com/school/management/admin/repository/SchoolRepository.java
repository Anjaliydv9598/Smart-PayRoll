package com.school.management.admin.repository;

import com.school.management.admin.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {

    Optional<School> findFirstByOrderByIdAsc();

}
