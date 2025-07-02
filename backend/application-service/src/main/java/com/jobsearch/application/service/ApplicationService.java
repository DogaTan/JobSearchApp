package com.jobsearch.application.service;

import com.jobsearch.application.entity.Application;
import com.jobsearch.application.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    // ✅ Yeni başvuru oluştur
    public Application apply(Application application) {
        return applicationRepository.save(application);
    }

    // ✅ Tüm başvuruları getir
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // ✅ Kullanıcının başvurularını getir
    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    // ✅ Belirli bir ilana gelen başvuruları getir
    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // ✅ Başvuru ID ile başvuruyu getir
    public Application getById(Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    // ✅ Başvuruyu sil
    public void deleteById(Long id) {
        applicationRepository.deleteById(id);
    }
}
