package com.jobsearch.jobposting.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobsearch.jobposting.entity.JobPosting;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    Page<JobPosting> findByTitleContainingAndCityContaining(String title, String city, Pageable pageable);
    Page<JobPosting> findByTitleContaining(String title, Pageable pageable);
    Page<JobPosting> findByCityContaining(String city, Pageable pageable);
}
