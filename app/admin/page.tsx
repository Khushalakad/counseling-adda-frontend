"use client";

import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total NIT Records",
    value: "1,245",
    change: "+12%",
    icon: Building2,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Total IIIT Records",
    value: "856",
    change: "+8%",
    icon: GraduationCap,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Total CSAB Records",
    value: "432",
    change: "+5%",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Placement Records",
    value: "2,156",
    change: "+15%",
    icon: Briefcase,
    color: "from-green-500 to-emerald-500",
  },
];

const recentUploads = [
  {
    id: 1,
    fileName: "NIT_Cutoffs_2024.xlsx",
    type: "NIT Cutoffs",
    uploadedAt: "2 hours ago",
    status: "success",
    records: 245,
  },
  {
    id: 2,
    fileName: "IIIT_Placements_2024.xlsx",
    type: "Placements",
    uploadedAt: "5 hours ago",
    status: "success",
    records: 156,
  },
  {
    id: 3,
    fileName: "CSAB_Round1_2024.xlsx",
    type: "CSAB Data",
    uploadedAt: "1 day ago",
    status: "success",
    records: 432,
  },
  {
    id: 4,
    fileName: "NIT_Placements_2024.xlsx",
    type: "Placements",
    uploadedAt: "2 days ago",
    status: "success",
    records: 189,
  },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-slate-100">Admin Overview</h1>
        <p className="text-slate-400">
          Monitor your data and recent activity
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-100 mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Uploads */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Recent Uploads</CardTitle>
          <CardDescription className="text-slate-400">
            Latest file uploads and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">File Name</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Records</TableHead>
                <TableHead className="text-slate-400">Uploaded</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUploads.map((upload, index) => (
                <motion.tr
                  key={upload.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border-slate-800"
                >
                  <TableCell className="font-medium text-slate-200">
                    {upload.fileName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{upload.type}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">{upload.records}</TableCell>
                  <TableCell className="text-slate-400">{upload.uploadedAt}</TableCell>
                  <TableCell>
                    <Badge variant="safe" className="bg-green-900/30 text-green-400 border-green-700">
                      Success
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Upload New Data</CardTitle>
              <Upload className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Upload cutoff or placement data via Excel
            </p>
          </CardContent>
        </Card>

        <Card variant="glass" className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">View Analytics</CardTitle>
              <TrendingUp className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Analyze trends and patterns in your data
            </p>
          </CardContent>
        </Card>

        <Card variant="glass" className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Manage Cutoffs</CardTitle>
              <Building2 className="h-5 w-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">
              Edit or delete cutoff records
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
