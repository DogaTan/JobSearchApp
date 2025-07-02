package com.jobsearch.jobposting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class JobpostingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobpostingServiceApplication.class, args);
	}

}
