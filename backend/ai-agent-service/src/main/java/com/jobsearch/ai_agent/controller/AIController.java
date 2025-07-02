package com.jobsearch.ai_agent.controller;

import com.jobsearch.ai_agent.dto.IntentRequest;
import com.jobsearch.ai_agent.dto.IntentResponse;
import com.jobsearch.ai_agent.service.AIService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
public class AIController {

    private final AIService aiService;

    @Autowired
    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/process")
    public ResponseEntity<IntentResponse> process(@RequestBody IntentRequest request,
                                                  HttpServletRequest servletRequest) {
        String token = "";

        // Swagger authorize kullanılmışsa otomatik header olarak gelir:
        String authHeader = servletRequest.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.replace("Bearer ", "");
        }

        IntentResponse response = aiService.processIntent(request, token);
        return ResponseEntity.ok(response);
    }
}
