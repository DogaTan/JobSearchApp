package com.jobsearch.ai_agent.dto;

public class IntentRequest {
    private String message;

    public IntentRequest() {
    }

    public IntentRequest(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
