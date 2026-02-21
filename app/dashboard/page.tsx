"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  GraduationCap,
  Building2,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const quickActions = [
  {
    icon: GraduationCap,
    title: "Predict Colleges",
    description: "Get AI-powered college predictions",
    href: "/predict",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: TrendingUp,
    title: "Rank Band Analysis",
    description: "Analyze your rank range",
    href: "/rank-band",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Building2,
    title: "Compare Colleges",
    description: "Compare multiple colleges",
    href: "/compare",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Briefcase,
    title: "Placement Insights",
    description: "View placement statistics",
    href: "/placements",
    color: "from-green-500 to-emerald-500",
  },
];

const recentActivity = [
  { action: "Predicted colleges for Rank 12,000", time: "2 hours ago" },
  { action: "Compared NIT Trichy vs NIT Surathkal", time: "1 day ago" },
  { action: "Saved 5 colleges to favorites", time: "2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here's your overview.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Saved Colleges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Your favorites
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Comparisons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Active comparisons
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
