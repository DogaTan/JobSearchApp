package com.jobsearch.notification.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class NotificationScheduler {

    // Her gece saat 2:00'de çalışır
    @Scheduled(cron = "0 0 2 * * *")
    public void sendLowCapacityAlerts() {
        System.out.println("🔔 Kapasite uyarısı kontrolü çalıştı...");
        // Buraya kapasitesi azalan ilanları kontrol et → admin’e uyarı gönder
    }

    // Her gece saat 3:00'te çalışır
    @Scheduled(cron = "0 0 3 * * *")
    public void sendRelatedJobSuggestions() {
        System.out.println("📬 İlgili iş önerileri kontrolü çalıştı...");
        // Buraya MongoDB'den arama geçmişini al → öneri üret → kullanıcıya bildir
    }
}
