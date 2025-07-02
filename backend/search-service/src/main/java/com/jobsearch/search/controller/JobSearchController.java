package com.jobsearch.search.controller;

import com.jobsearch.search.entity.JobSearch;
import com.jobsearch.search.entity.SearchHistory;
import com.jobsearch.search.service.JobSearchService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class JobSearchController {

    private final JobSearchService service;

    @PostMapping
    public ResponseEntity<JobSearch> save(@RequestBody JobSearch jobSearch) {
        return ResponseEntity.ok(service.save(jobSearch));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobSearch>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getAllByUserId(userId));
    }

    @GetMapping
    public ResponseEntity<List<JobSearch>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // Kullanıcının son 5 arama geçmişini döndürür
    @GetMapping("/recent/{userId}")
    public ResponseEntity<List<SearchHistory>> getRecentSearches(@PathVariable String userId) {
        return ResponseEntity.ok(service.getRecentSearches(userId));
    }

    @GetMapping("/related/{userId}")
    public ResponseEntity<List<SearchHistory>> getRelatedSearches(@PathVariable String userId) {
        return ResponseEntity.ok(service.getRelatedSearches(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSearch(@PathVariable String id) {
        service.deleteSearchById(id);
        return ResponseEntity.ok("Search with ID " + id + " was successfully deleted.");
    }
}
