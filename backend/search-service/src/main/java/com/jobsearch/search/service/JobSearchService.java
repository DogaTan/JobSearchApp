package com.jobsearch.search.service;

import com.jobsearch.search.entity.JobSearch;
import com.jobsearch.search.entity.SearchHistory;
import com.jobsearch.search.repository.JobSearchRepository;
import com.jobsearch.search.repository.SearchHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobSearchService {

    private final JobSearchRepository repository;
    private final SearchHistoryRepository searchHistoryRepository;

    public JobSearch save(JobSearch jobSearch) {
        return repository.save(jobSearch);
    }

    public List<JobSearch> getAllByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public List<JobSearch> getAll() {
        return repository.findAll();
    }

    // Kullanıcının son 5 aramasını döndür
    public List<SearchHistory> getRecentSearches(String userId) {
        return searchHistoryRepository.findTop5ByUserIdOrderByTimestampDesc(userId);
    }

    // Arama geçmişine kayıt ekle (isteğe bağlı)
    public void saveSearchHistory(String userId, String query) {
        SearchHistory history = SearchHistory.builder()
                .userId(userId)
                .query(query)
                .timestamp(LocalDateTime.now())
                .build();
        searchHistoryRepository.save(history);
    }

    public void deleteSearchById(String id) {
        searchHistoryRepository.deleteById(id);
    }

    // Simülasyon için öneri: aynı kullanıcının geçmiş sorgularını dön
    public List<SearchHistory> getRelatedSearches(String userId) {
        return searchHistoryRepository.findByUserId(userId);
    }
}
