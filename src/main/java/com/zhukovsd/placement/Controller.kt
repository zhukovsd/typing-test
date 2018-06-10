package com.zhukovsd.placement

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class Controller @Autowired constructor(val service: Service) {
    @RequestMapping(value = ["/rest/getPlacement"], method = arrayOf(RequestMethod.GET))
    fun getPlacement(@RequestParam(value = "cpm") cpm: Int): ResponseSuccess {
        return ResponseSuccess(
                service.getPercentage(cpm)
        );
    }

    @ExceptionHandler(Exception::class)
    fun onException(ex: Exception): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ResponseError(ex.javaClass.simpleName, ex.message!!)
        )
    }
}