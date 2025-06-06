import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RefreshCw,
  Coffee,
  Clock,
  Calendar,
  BarChart,
} from "lucide-react";

// Mock data
const breakHistory = [
  { id: 1, type: "Lunch", duration: "45m", timestamp: "12:30 PM" },
  { id: 2, type: "Coffee", duration: "15m", timestamp: "10:15 AM" },
  { id: 3, type: "Short Break", duration: "10m", timestamp: "3:45 PM" },
];

const breakStats = {
  totalBreaks: 3,
  totalDuration: "70m",
  remainingTime: "20m",
  dailyLimit: "90m"
};

export function BreakTimer() {
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breakType, setBreakType] = useState("Short Break");
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startBreak = () => {
    if (!isBreakActive) {
      const id = window.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsBreakActive(true);
    }
  };

  const pauseBreak = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsBreakActive(false);
  };

  const resetBreak = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsBreakActive(false);
    setTimer(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Break Timer</h2>
        <p className="text-muted-foreground">
          Manage and track your break time
        </p>
      </div>

      {/* Active Break Timer */}
      <Card>
        <CardHeader>
          <CardTitle>Break Timer</CardTitle>
          <CardDescription>Track your current break</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="text-7xl font-bold tracking-tighter">
              {formatTime(timer)}
            </div>
            <p className="text-lg text-muted-foreground">{breakType}</p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={isBreakActive ? pauseBreak : startBreak}
                className={isBreakActive ? "bg-red-500 hover:bg-red-600" : ""}
              >
                {isBreakActive ? (
                  <><Pause className="mr-2 h-5 w-5" /> Pause</>
                ) : (
                  <><Play className="mr-2 h-5 w-5" /> Start Break</>
                )}
              </Button>
              <Button variant="outline" size="lg" onClick={resetBreak}>
                <RefreshCw className="mr-2 h-5 w-5" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Break Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Breaks</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{breakStats.totalBreaks}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{breakStats.totalDuration}</div>
            <p className="text-xs text-muted-foreground">Used today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{breakStats.remainingTime}</div>
            <Progress 
              value={(parseInt(breakStats.totalDuration) / parseInt(breakStats.dailyLimit)) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Daily limit: {breakStats.dailyLimit}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break Usage</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Of daily allowance</p>
          </CardContent>
        </Card>
      </div>

      {/* Break History */}
      <Card>
        <CardHeader>
          <CardTitle>Break History</CardTitle>
          <CardDescription>Your breaks taken today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {breakHistory.map((break_) => (
              <div
                key={break_.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Coffee className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{break_.type}</p>
                    <p className="text-sm text-muted-foreground">{break_.timestamp}</p>
                  </div>
                </div>
                <div className="text-sm font-medium">{break_.duration}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button variant="outline" className="h-20">
          <div className="flex flex-col items-center">
            <Coffee className="h-5 w-5 mb-2" />
            <span>Coffee Break</span>
            <span className="text-xs text-muted-foreground">(15 min)</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20">
          <div className="flex flex-col items-center">
            <Clock className="h-5 w-5 mb-2" />
            <span>Short Break</span>
            <span className="text-xs text-muted-foreground">(10 min)</span>
          </div>
        </Button>
        <Button variant="outline" className="h-20">
          <div className="flex flex-col items-center">
            <Calendar className="h-5 w-5 mb-2" />
            <span>Lunch Break</span>
            <span className="text-xs text-muted-foreground">(45 min)</span>
          </div>
        </Button>
      </div>
    </div>
  );
} 