package com.jobsearch.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.jobsearch.admin.dto.JobRequest;
import com.jobsearch.admin.entity.JobPosting;
import com.jobsearch.admin.repository.JobPostingRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobAdminService {

    private final JobPostingRepository jobPostingRepository;

    public JobPosting createJob(JobRequest request) {
        JobPosting job = mapRequestToJob(request);
        return jobPostingRepository.save(job);
    }

    public JobPosting updateJob(Long id, JobRequest request) {
        JobPosting job = jobPostingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Job not found"));
        updateJobFromRequest(job, request);
        return jobPostingRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobPostingRepository.deleteById(id);
    }

    public List<JobPosting> getAllJobs() {
        return jobPostingRepository.findAll();
    }

    public List<JobPosting> getJobsByUserId(Long userId) {
        return jobPostingRepository.findByUserId(userId);
    }

    private JobPosting mapRequestToJob(JobRequest request) {
        JobPosting job = new JobPosting();
        job.setTitle(request.getTitle());
        job.setCompanyName(request.getCompanyName());
        job.setCity(request.getCity());
        job.setWorkingType(request.getWorkingType());
        job.setLevel(request.getLevel());
        job.setDepartment(request.getDepartment());
        job.setDescription(request.getDescription());
        job.setUserId(request.getUserId()); 
        return job;
    }

    private void updateJobFromRequest(JobPosting job, JobRequest request) {
        job.setTitle(request.getTitle());
        job.setCompanyName(request.getCompanyName());
        job.setCity(request.getCity());
        job.setWorkingType(request.getWorkingType());
        job.setLevel(request.getLevel());
        job.setDepartment(request.getDepartment());
        job.setDescription(request.getDescription());
        job.setUserId(request.getUserId()); 
    }
}
