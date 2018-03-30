package com.zhukovsd

import javax.servlet.ServletContext;
import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.WebApplicationInitializer

class WebServletConfiguration : WebApplicationInitializer {
    override fun onStartup(ctx: ServletContext) {
        val webCtx = AnnotationConfigWebApplicationContext()
        webCtx.register(WebConfig::class.java)
        webCtx.servletContext = ctx
        val servlet = ctx.addServlet("dispatcher", DispatcherServlet(webCtx))
        servlet.setLoadOnStartup(1)
        servlet.addMapping("/")
    }
}