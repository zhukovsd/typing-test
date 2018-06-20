package com.zhukovsd.placement

import com.zhukovsd.persistence.PersistenceService
import com.zhukovsd.placement.service.PlacementService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.sql.Timestamp

@RestController
class Controller @Autowired constructor(
        private val placementService: PlacementService,
        private val persistenceService: PersistenceService
) {
    @RequestMapping(value = ["/rest/getPlacement"], method = arrayOf(RequestMethod.GET))
    fun getPlacement(
            @RequestParam(value = "cpm") cpm: Int,
            @RequestParam(value = "wpm") wpm: Int,
            @RequestParam(value = "typosCount") typosCount: Int
    ): ResponseSuccess {
        persistenceService.recordTestResults(
                cpm, wpm, typosCount, Timestamp(System.currentTimeMillis())
        )

        return ResponseSuccess(
                placementService.getPercentage(cpm)
        );
    }

    @ExceptionHandler(Exception::class)
    fun onException(ex: Exception): ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ResponseError(ex.javaClass.simpleName, ex.message!!)
        )
    }
}