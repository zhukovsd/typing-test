package com.zhukovsd.service;

import org.springframework.stereotype.Service;

/**
 * Created by ZhukovSD on 09.06.2017.
 */
@Service
public class TestServiceImpl implements TestService {
    @Override
    public String greet(String name) {
        return "Hi, " + name;
    }
}
