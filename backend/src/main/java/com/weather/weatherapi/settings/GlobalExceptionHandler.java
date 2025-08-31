package com.weather.weatherapi.settings;

import com.weather.weatherapi.settings.exceptions.RateLimitException;
import com.weather.weatherapi.settings.exceptions.WeatherFetchException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static com.weather.weatherapi.settings.BusinessErrorCodes.*;
import static org.springframework.http.HttpStatus.TOO_MANY_REQUESTS;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WeatherFetchException.class)
    public ResponseEntity<ExceptionResponse> handleException(WeatherFetchException exp) {
        return ResponseEntity
                .status(exp.getHttpStatusCode())
                .body(ExceptionResponse.builder()
                        .businessErrorCode(WEATHER_API_ERROR.getCode())
                        .businessErrorDescription(exp.getMessage())
                        .error(exp.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(WebClientResponseException.class)
    public ResponseEntity<ExceptionResponse> handleWebClientResponseException(WebClientResponseException exp) {
        return ResponseEntity
                .status(exp.getStatusCode())
                .body(ExceptionResponse.builder()
                        .businessErrorCode(ERROR_REMOTE_API.getCode())
                        .businessErrorDescription(ERROR_REMOTE_API.getDescription())
                        .error(exp.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(WebClientRequestException.class)
    public ResponseEntity<ExceptionResponse> handleWebClientRequestException(WebClientRequestException exp) {
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(UNAVAILABLE_REMOTE_API.getCode())
                        .businessErrorDescription(UNAVAILABLE_REMOTE_API.getDescription())
                        .error(exp.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(RateLimitException.class)
    public ResponseEntity<ExceptionResponse> handleException(RateLimitException exp) {
        return ResponseEntity
                .status(TOO_MANY_REQUESTS)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(RATE_LIMIT_EXCEED.getCode())
                        .businessErrorDescription(RATE_LIMIT_EXCEED.getDescription())
                        .delay(exp.getDelay())
                        .error(exp.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Set<Map<String, String>>> handleConstraintViolationException(ConstraintViolationException ex) {
        Set<Map<String, String>> errors = new HashSet<>();

        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.add(Map.of(fieldName, errorMessage));
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
