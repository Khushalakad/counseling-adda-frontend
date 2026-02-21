"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const placementData = [
  {
    college: "NIT Trichy",
    avgPackage: 18.5,
    maxPackage: 45.0,
    placementRate: 95,
    topRecruiters: ["Google", "Microsoft", "Amazon", "Adobe"],
    studentsPlaced: 475,
    totalStudents: 500,
  },
  {
    college: "NIT Surathkal",
    avgPackage: 16.2,
    maxPackage: 42.0,
    placementRate: 92,
    topRecruiters: ["Microsoft", "Amazon", "Goldman Sachs", "Oracle"],
    studentsPlaced: 441,
    totalStudents: 480,
  },
  {
    college: "IIIT Hyderabad",
    avgPackage: 22.3,
    maxPackage: 55.0,
    placementRate: 98,
    topRecruiters: ["Google", "Microsoft", "Apple", "Meta"],
    studentsPlaced: 196,
    totalStudents: 200,
  },
];

export default function PlacementsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Placement Insights</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive placement statistics and trends
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placementData.map((data, index) => (
          <motion.div
            key={data.college}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle>{data.college}</CardTitle>
                <CardDescription>Placement Statistics 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Avg Package
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ₹{data.avgPackage} LPA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Max Package
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{data.maxPackage} LPA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Placement Rate
                    </span>
                    <span className="font-bold">{data.placementRate}%</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-semibold mb-2">Top Recruiters</p>
                  <div className="flex flex-wrap gap-2">
                    {data.topRecruiters.map((recruiter) => (
                      <Badge key={recruiter} variant="default">
                        {recruiter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
