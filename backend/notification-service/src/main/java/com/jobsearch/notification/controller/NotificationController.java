package com.jobsearch.notification.controller;

import com.jobsearch.notification.dto.NotificationRequest;
import com.jobsearch.notification.entity.Notification;
import com.jobsearch.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public Notification sendNotification(@RequestBody NotificationRequest request) {
        return notificationService.sendNotification(request);
    }

    @GetMapping("/{email}")
    public List<Notification> getNotifications(@PathVariable String email) {
        return notificationService.getNotifications(email);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "Notification marked as read."));
    }
}
