package com.jobsearch.ai_agent.service;

import com.jobsearch.ai_agent.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    private final IntentDetectionService intentDetectionService;
    private final GatewayClientService gatewayClientService;

    @Autowired
    public AIService(IntentDetectionService intentDetectionService, GatewayClientService gatewayClientService) {
        this.intentDetectionService = intentDetectionService;
        this.gatewayClientService = gatewayClientService;
    }

    public IntentResponse processIntent(IntentRequest request, String token) {
        String intent = intentDetectionService.detectIntent(request);

        if ("search".equalsIgnoreCase(intent)) {
            SearchResultDTO result = gatewayClientService.performSearch(request, token);
            return new IntentResponse("search", "Here are some jobs I found 👇", result, null);
        } else if ("apply".equalsIgnoreCase(intent)) {
            ApplyResultDTO result = gatewayClientService.performApply(request, token);
            return new IntentResponse("apply", "You've successfully applied! ✅", null, result);
        } else {
            return new IntentResponse("unknown", "Sorry, I didn't understand your request 🤖", null, null);
        }
    }
}
