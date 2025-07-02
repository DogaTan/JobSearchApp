package com.jobsearch.ai_agent.dto;

import lombok.Data;
import java.util.List;

@Data
public class SearchResultDTO {
    private List<JobPostingDTO> jobs;
    private String message;

    @Data
    public static class JobPostingDTO {
        private String title;
        private String location;
        private String company;
        private String description;
        private String applyUrl; // opsiyonel
    }
}
