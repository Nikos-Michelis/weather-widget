package com.weather.weatherapi.settings;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

/**
 * 1XX for general errors.
 * 3XX for authentication errors.
 * 4XX for account-related errors.
 */
@Getter
public enum BusinessErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),

    INVALID_REQUEST_PARAM(101, BAD_REQUEST, "Invalid request parameter value."),
    ENTITY_CONFLICT(102, CONFLICT, "Entity has already been added to your list."),
    ENTITY_NOT_FOUND(103, NOT_FOUND, "Entity Not Found."),
    INVALID_HEADERS(104, BAD_REQUEST, "Entity Not Found."),
    UNAVAILABLE_REMOTE_API(105, SERVICE_UNAVAILABLE, "Failed to call remote service."),
    ERROR_REMOTE_API(106, INTERNAL_SERVER_ERROR, "Remote API returned an error."),

    RATE_LIMIT_EXCEED(300, TOO_MANY_REQUESTS, "You have exceed the maximum number of allowed requests. Please try again later."),

    ACCESS_DENIED(400, FORBIDDEN, "You don't have the permission to perform this action."),
    WEATHER_API_ERROR(401, INTERNAL_SERVER_ERROR, "Opps! somthing went wrong with OpenWeather API, correct your request or try again later.")
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus status, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = status;
    }
}