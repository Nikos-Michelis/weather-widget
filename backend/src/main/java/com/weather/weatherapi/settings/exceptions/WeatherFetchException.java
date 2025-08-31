package com.weather.weatherapi.settings.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class WeatherFetchException extends RuntimeException{
    private HttpStatusCode httpStatusCode;
    public WeatherFetchException (String message, HttpStatusCode httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }
    public WeatherFetchException (String message) {
        super(message);
    }
}
