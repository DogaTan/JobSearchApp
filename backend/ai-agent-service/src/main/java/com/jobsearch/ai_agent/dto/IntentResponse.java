package com.jobsearch.ai_agent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IntentResponse {
    private String intent;
    private String message;
    private SearchResultDTO searchResult;
    private ApplyResultDTO applyResult;
}
