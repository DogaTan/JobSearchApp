package com.jobsearch.search.repository;

import com.jobsearch.search.entity.JobSearch;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobSearchRepository extends MongoRepository<JobSearch, String> {
    List<JobSearch> findByUserId(Long userId);
}
