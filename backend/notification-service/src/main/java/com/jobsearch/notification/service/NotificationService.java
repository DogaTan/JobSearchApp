package com.jobsearch.notification.service;

import com.jobsearch.notification.dto.NotificationRequest;
import com.jobsearch.notification.entity.Notification;
import com.jobsearch.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;

    public Notification sendNotification(NotificationRequest request) {
        Notification notification = Notification.builder()
                .recipientEmail(request.getRecipientEmail())
                .message(request.getMessage())
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        return repository.save(notification);
    }

    public List<Notification> getNotifications(String email) {
        return repository.findByRecipientEmail(email);
    }

    public void markAsRead(Long id) {
        Notification notification = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        repository.save(notification);
    }
}
