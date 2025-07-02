package com.jobsearch.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobsearch.admin.dto.JobRequest;
import com.jobsearch.admin.entity.JobPosting;
import com.jobsearch.admin.service.JobAdminService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/admin/jobs")
@RequiredArgsConstructor
public class JobAdminController {

    private final JobAdminService jobAdminService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY')")
    public ResponseEntity<JobPosting> createJob(@RequestBody JobRequest request) {
        JobPosting createdJob = jobAdminService.createJob(request);
        return ResponseEntity.ok(createdJob);
    }

    // Güncelleme için PUT endpoint'i
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY')")
    public ResponseEntity<JobPosting> updateJob(@PathVariable Long id, @RequestBody JobRequest request) {
        JobPosting updatedJob = jobAdminService.updateJob(id, request);
        return ResponseEntity.ok(updatedJob);
    }

    // Silme için DELETE endpoint'i
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY')")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobAdminService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    // Listeleme endpoint'i (tüm ilanlar ya da şirkete göre)
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_COMPANY')")
    public ResponseEntity<List<JobPosting>> getAllJobs(@RequestParam(required = false) Long userId) {
        List<JobPosting> jobs = (userId == null) ? 
            jobAdminService.getAllJobs() : 
            jobAdminService.getJobsByUserId(userId);
        return ResponseEntity.ok(jobs);
    }

}
