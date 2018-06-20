package com.zhukovsd.persistence

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import java.sql.Timestamp
import org.springframework.stereotype.Service
import redis.clients.jedis.JedisPoolConfig
import redis.clients.jedis.JedisPool
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import javax.annotation.PostConstruct

@Service
@PropertySource("classpath:persistence-\${env}.properties")
class RedisPersistenceService : PersistenceService {
    @Value("\${redis.host}")
    private val redisHost: String? = null

    private lateinit var jedisPool: JedisPool
    private lateinit var executor: ExecutorService

    @PostConstruct
    private fun init() {
        println("redisHost = $redisHost")

        jedisPool = JedisPool(JedisPoolConfig(), redisHost)
        executor = Executors.newFixedThreadPool(4)
    }

    override fun recordTestResults(cpm: Int, wpm: Int, typosCount: Int, timestamp: Timestamp) {
        executor.submit({  ->
            jedisPool.getResource().use({ jedis ->
                // http://www.rediscookbook.org/create_unique_ids.html
                val id = "test-result:" + jedis.incr("test-result-record-id-generator").toString()

                jedis.hset(id, "cpm", cpm.toString())
                jedis.hset(id, "wpm", wpm.toString())
                jedis.hset(id, "typosCount", typosCount.toString())
                jedis.hset(id, "timestamp", timestamp.time.toString())
            })
        })
    }

}