package com.zhukovsd

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer

@Configuration
@ComponentScan(basePackages = ["com.zhukovsd"])
@EnableWebMvc
open class WebConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry?) {
        registry?.addResourceHandler("/WEB-INF/pages/**")?.addResourceLocations("/pages/");
    }

    override fun configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer?) {
        configurer?.enable()
    }
}