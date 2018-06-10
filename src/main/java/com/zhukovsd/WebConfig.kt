package com.zhukovsd

import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.CacheControl
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer
import java.util.concurrent.TimeUnit

@Configuration
@ComponentScan(basePackages = ["com.zhukovsd"])
@EnableWebMvc
open class WebConfig : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
//        registry?.addResourceHandler("/WEB-INF/pages/**")?.addResourceLocations("/pages/");

        registry.addResourceHandler("/*.html").addResourceLocations("/")
                .setCacheControl(CacheControl.noStore())

        registry.addResourceHandler("/*.css").addResourceLocations("/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
        registry.addResourceHandler("/*.js").addResourceLocations("/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))

    }

    override fun configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer?) {
        configurer?.enable()
    }
}