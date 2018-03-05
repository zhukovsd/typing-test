package com.zhukovsd.controller;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by zhukovsd on 01.06.2017.
 */

//@XmlRootElement(name = "message")
public class Message {
    String name;

    String text;

    public Message() {
    }

    public Message(String name, String text) {
        this.name = name;
        this.text = text;
    }

    public String getName() {
        return name;
    }

    public String getText() {
        return text;
    }

//    @XmlElement
    public void setName(String name) {
        this.name = name;
    }

//    @XmlElement
    public void setText(String text) {
        this.text = text;
    }
}