package com.jobsearch.application.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;

    private Long userId;

    private String resumeUrl;

    private String status; // örnek: "PENDING", "APPROVED", "REJECTED"

    private LocalDateTime appliedAt;
}
