package com.jobsearch.ai_agent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class AiAgentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiAgentServiceApplication.class, args);
	}

}
