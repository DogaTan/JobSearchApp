package com.jobsearch.search.repository;

import com.jobsearch.search.entity.SearchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SearchHistoryRepository extends MongoRepository<SearchHistory, String> {
    List<SearchHistory> findTop5ByUserIdOrderByTimestampDesc(String userId);
    List<SearchHistory> findByUserId(String userId);
}
