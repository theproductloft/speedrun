"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaceCalculator() {
  const [goalTime, setGoalTime] = useState("")
  const [pace, setPace] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculatePace = () => {
    setError(null)
    setPace(null)

    const timePattern = /^(\d{1,2}):([0-5]\d)$/
    if (!timePattern.test(goalTime)) {
      setError("Please enter a valid time in mm:ss format")
      return
    }

    const [minutes, seconds] = goalTime.split(":").map(Number)
    const totalSeconds = minutes * 60 + seconds
    const paceInSeconds = totalSeconds / 2.4
    const paceMinutes = Math.floor(paceInSeconds / 60)
    const paceSeconds = Math.round(paceInSeconds % 60)

    setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            2.4km Pace Calculator
          </CardTitle>
          <CardDescription>Calculate your pace for a 2.4km run</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="goalTime" className="block text-sm font-medium text-gray-700 mb-1">
                Goal Time (mm:ss)
              </label>
              <Input
                id="goalTime"
                type="text"
                placeholder="e.g., 12:00"
                value={goalTime}
                onChange={(e) => setGoalTime(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={calculatePace} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Calculate Pace
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {pace && (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Your Pace:</h3>
                <p className="text-3xl font-bold text-blue-600">{pace} min/km</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

