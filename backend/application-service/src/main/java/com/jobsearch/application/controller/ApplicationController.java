package com.jobsearch.application.controller;

import com.jobsearch.application.entity.Application;
import com.jobsearch.application.service.ApplicationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ApplicationController {

    private final ApplicationService applicationService;

    // ✅ Yeni başvuru oluştur
    @PostMapping
    public ResponseEntity<Application> apply(@RequestBody Application application) {
        return ResponseEntity.ok(applicationService.apply(application));
    }

    // ✅ Tüm başvuruları getir
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // ✅ Kullanıcının başvuruları
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Application>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(applicationService.getApplicationsByUserId(userId));
    }

    // ✅ İlanın başvuruları
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getByJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJobId(jobId));
    }

    // ✅ Tekil başvuru
    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getById(id));
    }

    // ✅ Başvuru sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        applicationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
