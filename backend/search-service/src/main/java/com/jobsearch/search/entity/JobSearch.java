package com.jobsearch.search.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "job_searches")
public class JobSearch {

    @Id
    private String id;
    private Long userId;
    private String position;
    private String city;
    private String country;
    private String town;
    private String workPreference;
    private LocalDateTime searchDate = LocalDateTime.now();
}
