package com.jobsearch.ai_agent.service;

import com.jobsearch.ai_agent.dto.ApplyResultDTO;
import com.jobsearch.ai_agent.dto.IntentRequest;
import com.jobsearch.ai_agent.dto.SearchResultDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GatewayClientService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${gateway.url}")
    private String gatewayUrl;

    public SearchResultDTO performSearch(IntentRequest request, String token) {
        String url = gatewayUrl + "/api/search";
        HttpHeaders headers = createHeaders(token);
        HttpEntity<IntentRequest> entity = new HttpEntity<>(request, headers);
        ResponseEntity<SearchResultDTO> response = restTemplate.postForEntity(url, entity, SearchResultDTO.class);
        return response.getBody();
    }

    public ApplyResultDTO performApply(IntentRequest request, String token) {
        String url = gatewayUrl + "/api/apply";
        HttpHeaders headers = createHeaders(token);
        HttpEntity<IntentRequest> entity = new HttpEntity<>(request, headers);
        ResponseEntity<ApplyResultDTO> response = restTemplate.postForEntity(url, entity, ApplyResultDTO.class);
        return response.getBody();
    }

    private HttpHeaders createHeaders(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);
        return headers;
    }
}
