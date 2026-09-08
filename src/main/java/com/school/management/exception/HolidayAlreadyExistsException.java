package com.school.management.exception;


public class HolidayAlreadyExistsException extends RuntimeException {

    public HolidayAlreadyExistsException(String message) {
        super(message);
    }
}
