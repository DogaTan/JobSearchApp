package com.jobsearch.jobposting.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobsearch.jobposting.entity.JobPosting;
import com.jobsearch.jobposting.service.JobPostingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
public class JobPostingController {

    private final JobPostingService jobService;

    // @PostMapping
    // @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY')")
    // public ResponseEntity<JobPosting> createJob(@RequestBody JobPosting job) {
    //     JobPosting created = jobService.create(job);
    //     return ResponseEntity.ok(created);
    // }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY') or hasAuthority('ROLE_USER')")
    public ResponseEntity<JobPosting> getJob(@PathVariable Long id) {
        JobPosting job = jobService.getById(id);
        return ResponseEntity.ok(job);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY') or hasAuthority('ROLE_USER')")
    public ResponseEntity<Page<JobPosting>> getAllPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobPosting> jobs = jobService.getAllPaginated(pageable);
        return ResponseEntity.ok(jobs);
    }

      // Yeni eklenen arama endpointi
    @GetMapping("/search")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY') or hasAuthority('ROLE_USER')")
    public ResponseEntity<Page<JobPosting>> searchJobs(
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "") String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobPosting> jobs = jobService.searchJobs(title, city, pageable);
        return ResponseEntity.ok(jobs);
    }
}
