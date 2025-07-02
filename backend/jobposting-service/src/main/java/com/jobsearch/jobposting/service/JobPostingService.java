package com.jobsearch.jobposting.service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jobsearch.jobposting.entity.JobPosting;
import com.jobsearch.jobposting.messaging.MessageSender;
import com.jobsearch.jobposting.repository.JobPostingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobPostingService {

    private final JobPostingRepository jobRepository;
    private final MessageSender messageSender;

    public JobPosting create(JobPosting job) {
        JobPosting saved = jobRepository.save(job);

        // Bildirim mesajı oluştur
        String msg = "Yeni iş ilanı yayınlandı: " +
                saved.getTitle() + " - " +
                saved.getCompanyName() + " - " +
                saved.getCity() + "/" + saved.getTown();

        messageSender.send(msg);

        return saved;
    }

    @Cacheable(value = "jobs", key = "#id")
    public JobPosting getById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public List<JobPosting> getAll() {
        return jobRepository.findAll();
    }

    public Page<JobPosting> getAllPaginated(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

      public Page<JobPosting> searchJobs(String title, String city, Pageable pageable) {
        if (!title.isEmpty() && !city.isEmpty()) {
            return jobRepository.findByTitleContainingAndCityContaining(title, city, pageable);
        } else if (!title.isEmpty()) {
            return jobRepository.findByTitleContaining(title, pageable);
        } else if (!city.isEmpty()) {
            return jobRepository.findByCityContaining(city, pageable);
        } else {
            return jobRepository.findAll(pageable);
        }
    }
}
