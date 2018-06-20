package com.zhukovsd.persistence

import java.sql.Timestamp

interface PersistenceService {
    fun recordTestResults(cpm: Int, wpm: Int, typosCount: Int, timestamp: Timestamp)
}