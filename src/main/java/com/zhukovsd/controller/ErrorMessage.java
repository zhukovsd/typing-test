package com.zhukovsd.controller;

/**
 * Created by zhukovsd on 03.06.2017.
 */
public class ErrorMessage {
    public final String exceptionClass, exceptionMessage;

    public ErrorMessage(String exceptionClass, String exceptionMessage) {
        this.exceptionClass = exceptionClass;
        this.exceptionMessage = exceptionMessage;
    }
}
