package com.school.management.exception;

public class HolidayNotFoundException extends RuntimeException {

    public HolidayNotFoundException(String message) {
        super(message);
    }
}
