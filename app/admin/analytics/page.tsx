"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const cutoffTrendData = [
  { year: "2020", NIT: 1200, IIIT: 800, CSAB: 500 },
  { year: "2021", NIT: 1100, IIIT: 750, CSAB: 450 },
  { year: "2022", NIT: 1000, IIIT: 700, CSAB: 400 },
  { year: "2023", NIT: 950, IIIT: 650, CSAB: 350 },
  { year: "2024", NIT: 900, IIIT: 600, CSAB: 300 },
];

const branchPopularityData = [
  { branch: "CSE", count: 1250 },
  { branch: "ECE", count: 980 },
  { branch: "EEE", count: 750 },
  { branch: "ME", count: 620 },
  { branch: "CE", count: 580 },
  { branch: "Others", count: 420 },
];

const placementTrendData = [
  { year: "2020", avgPackage: 12.5, maxPackage: 35.0 },
  { year: "2021", avgPackage: 14.2, maxPackage: 38.5 },
  { year: "2022", avgPackage: 15.8, maxPackage: 42.0 },
  { year: "2023", avgPackage: 17.3, maxPackage: 45.5 },
  { year: "2024", avgPackage: 18.9, maxPackage: 48.0 },
];

const rankDistributionData = [
  { name: "0-1000", value: 15 },
  { name: "1000-5000", value: 25 },
  { name: "5000-10000", value: 30 },
  { name: "10000-20000", value: 20 },
  { name: "20000+", value: 10 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-slate-100">Analytics</h1>
        <p className="text-slate-400">
          Visualize trends and patterns in your data
        </p>
      </motion.div>

      {/* Cutoff Trend Chart */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Cutoff Trend Over Years</CardTitle>
          <CardDescription className="text-slate-400">
            Average closing ranks for NIT, IIIT, and CSAB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={cutoffTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="NIT"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="IIIT"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="CSAB"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Popularity */}
        <Card variant="glass" className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">Branch Popularity</CardTitle>
            <CardDescription className="text-slate-400">
              Number of applications by branch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchPopularityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="branch" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f1f5f9" }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Placement Trend */}
        <Card variant="glass" className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100">Placement Trend</CardTitle>
            <CardDescription className="text-slate-400">
              Average and maximum packages over years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#f1f5f9" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgPackage"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                  name="Avg Package (LPA)"
                />
                <Line
                  type="monotone"
                  dataKey="maxPackage"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 4 }}
                  name="Max Package (LPA)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rank Distribution */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Rank Distribution</CardTitle>
          <CardDescription className="text-slate-400">
            Distribution of student ranks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={rankDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {rankDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f1f5f9" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
