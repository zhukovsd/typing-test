package com.zhukovsd.placement.service

import org.springframework.stereotype.Service
import java.io.File
import java.util.*

@Service
class EmbeddedDistributionPlacementService : PlacementService {
    private var minCpm: Int
    private var maxCpm: Int

    private val percentages: Map<Int, String>

    init {
        // get file from resources folder
        val classLoader = javaClass.classLoader
        val file = File(classLoader.getResource("placements.data")!!.file)

        minCpm = 0
        maxCpm = 0

        percentages = HashMap()

        val scanner: Scanner = Scanner(file)

        // triple quotes wrap unescaped string
        val regex = """(\d+)=([\d.]+)""".toRegex()

        while (scanner.hasNextLine()) {
            val line = scanner.nextLine()
//            println(line);

            val match = regex.find(line)
            val (cpm, percentage) = match!!.destructured

            minCpm = minOf(minCpm, cpm.toInt())
            maxCpm = maxOf(maxCpm, cpm.toInt())

            percentages.put(cpm.toInt(), percentage)
        }

//        println(percentages)
    }

    override fun getPercentage(cpm: Int): String {
        if (cpm < minCpm)
            return "0.00"
        else if (cpm > maxCpm)
            return "100.00"
        else
            return percentages[cpm]!!
    }
}