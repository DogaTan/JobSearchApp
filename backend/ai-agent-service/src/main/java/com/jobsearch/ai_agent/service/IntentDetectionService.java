package com.jobsearch.ai_agent.service;

import com.jobsearch.ai_agent.dto.IntentRequest;
import org.springframework.stereotype.Service;

@Service
public class IntentDetectionService {

    public String detectIntent(IntentRequest request) {
        String message = request.getMessage().toLowerCase();

        if (message.contains("search") || message.contains("find")) {
            return "search";
        } else if (message.contains("apply") || message.contains("submit")) {
            return "apply";
        } else {
            return "unknown";
        }
    }
}
