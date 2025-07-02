package com.jobsearch.application.dto;

import lombok.Data;

@Data
public class ApplicationRequest {

    private Long jobId;
    private Long userId;
    private String resumeUrl; // opsiyonel olarak özgeçmiş bağlantısı alınabilir
}
