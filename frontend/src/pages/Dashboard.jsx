import { useState } from "react";
import { motion } from "framer-motion";
import StatsCard from "../components/dashboard/StatsCard";
import { Users, AlertTriangle, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock Data for the Chart
const chartData = [
  { name: "Mon", assessments: 12 },
  { name: "Tue", assessments: 19 },
  { name: "Wed", assessments: 15 },
  { name: "Thu", assessments: 22 },
  { name: "Fri", assessments: 28 },
  { name: "Sat", assessments: 10 },
  { name: "Sun", assessments: 14 },
];

// Mock Data for Recent Activity
const recentActivity = [
  { id: "1042", age: 45, gender: "Male", risk: "Low", date: "2 hours ago" },
  { id: "1043", age: 62, gender: "Female", risk: "High", date: "4 hours ago" },
  { id: "1044", age: 55, gender: "Male", risk: "Medium", date: "5 hours ago" },
  { id: "1045", age: 38, gender: "Female", risk: "Low", date: "Yesterday" },
  { id: "1046", age: 71, gender: "Male", risk: "High", date: "Yesterday" },
];

// Framer Motion variants for a smooth staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  // In the future, you will replace these with real database queries
  const [stats] = useState({
    total: 128,
    highRisk: 34,
    lowRisk: 94,
    avgAge: 52,
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen overflow-y-auto no-scrollbar">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">System Overview</h1>
          <p className="text-slate-400 mt-1">
            Real-time heart risk assessment metrics.
          </p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        {/* --- Top Row: Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Total Assessments"
              value={stats.total}
              icon={Users}
              trend={{ value: "12%", positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="High Risk Cases"
              value={stats.highRisk}
              icon={AlertTriangle}
              trend={{ value: "4%", positive: false }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Low Risk Cases"
              value={stats.lowRisk}
              icon={ShieldCheck}
              trend={{ value: "8%", positive: true }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatsCard
              title="Average Patient Age"
              value={stats.avgAge}
              icon={Activity}
            />
          </motion.div>
        </div>

        {/* --- Bottom Row: Charts and Tables --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Section (Takes up 2/3 of the screen) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-white font-medium">
                  Weekly Assessment Volume
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorAssessments"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#e2e8f0" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="assessments"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAssessments)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity Feed (Takes up 1/3 of the screen) */}
          <motion.div variants={itemVariants}>
            <Card className="bg-slate-900 border-slate-800 h-full">
              <CardHeader>
                <CardTitle className="text-lg text-white font-medium">
                  Recent Screenings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((log, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">
                          Patient #{log.id}
                        </p>
                        <p className="text-xs text-slate-400">
                          {log.age} yrs • {log.gender}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            log.risk === "High"
                              ? "bg-rose-500/20 text-rose-400"
                              : log.risk === "Medium"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {log.risk}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">
                          {log.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
