package com.jobsearch.notification.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class JobMessageListener {

    @RabbitListener(queues = "${app.rabbitmq.queue}")
    public void receiveMessage(String message) {
        System.out.println("📩 Bildirim geldi: " + message);
        // Burada kullanıcılara mail/sms/uyarı gönderebilirsin
    }
}
