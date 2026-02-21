"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Building } from "lucide-react";

interface CollegeData {
  name: string;
  branch: string;
  closingRank: number;
  avgPackage: number;
  maxPackage: number;
  minPackage: number;
  placementRate: number;
  topRecruiters: string[];
  location: string;
  type: string;
  established: number;
  totalStudents: number;
}

const mockColleges: CollegeData[] = [
  {
    name: "NIT Trichy",
    branch: "Computer Science Engineering",
    closingRank: 1200,
    avgPackage: 18.5,
    maxPackage: 45.0,
    minPackage: 12.0,
    placementRate: 95,
    topRecruiters: ["Google", "Microsoft", "Amazon", "Adobe"],
    location: "Tamil Nadu",
    type: "NIT",
    established: 1964,
    totalStudents: 5000,
  },
  {
    name: "NIT Surathkal",
    branch: "Computer Science Engineering",
    closingRank: 1800,
    avgPackage: 16.2,
    maxPackage: 42.0,
    minPackage: 10.0,
    placementRate: 92,
    topRecruiters: ["Microsoft", "Amazon", "Goldman Sachs", "Oracle"],
    location: "Karnataka",
    type: "NIT",
    established: 1960,
    totalStudents: 4800,
  },
  {
    name: "IIIT Hyderabad",
    branch: "Computer Science Engineering",
    closingRank: 800,
    avgPackage: 22.3,
    maxPackage: 55.0,
    minPackage: 15.0,
    placementRate: 98,
    topRecruiters: ["Google", "Microsoft", "Apple", "Meta"],
    location: "Telangana",
    type: "IIIT",
    established: 1998,
    totalStudents: 2000,
  },
];

export default function ComparePage() {
  const [college1, setCollege1] = useState<CollegeData | null>(null);
  const [college2, setCollege2] = useState<CollegeData | null>(null);
  const [showSelector1, setShowSelector1] = useState(false);
  const [showSelector2, setShowSelector2] = useState(false);

  const handleSelectCollege = (
    college: CollegeData,
    position: 1 | 2
  ) => {
    if (position === 1) {
      setCollege1(college);
      setShowSelector1(false);
    } else {
      setCollege2(college);
      setShowSelector2(false);
    }
  };

  const StatCard = ({
    label,
    value1,
    value2,
    higher,
    format,
  }: {
    label: string;
    value1: number | string;
    value2: number | string;
    higher?: 1 | 2;
    format?: (val: number | string) => string;
  }) => {
    const formatted1 = format ? format(value1) : value1;
    const formatted2 = format ? format(value2) : value2;
    return (
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </div>
        <div
          className={`text-center font-bold ${
            higher === 1 ? "text-green-600 dark:text-green-400" : ""
          }`}
        >
          {formatted1}
        </div>
        <div
          className={`text-center font-bold ${
            higher === 2 ? "text-green-600 dark:text-green-400" : ""
          }`}
        >
          {formatted2}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Compare Colleges</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Compare two colleges side by side to make informed decisions
        </p>
      </motion.div>

      {/* College Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" className="relative">
          <CardHeader>
            <CardTitle>College 1</CardTitle>
          </CardHeader>
          <CardContent>
            {college1 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{college1.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSelector1(true)}
                  >
                    Change
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {college1.branch}
                </p>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowSelector1(true)}
              >
                Select College 1
              </Button>
            )}
            {showSelector1 && (
              <div className="absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-h-64 overflow-y-auto">
                {mockColleges.map((college) => (
                  <button
                    key={college.name}
                    onClick={() => handleSelectCollege(college, 1)}
                    className="w-full text-left p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-b border-slate-200 dark:border-slate-800 last:border-0"
                  >
                    <div className="font-semibold">{college.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {college.branch}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card variant="glass" className="relative">
          <CardHeader>
            <CardTitle>College 2</CardTitle>
          </CardHeader>
          <CardContent>
            {college2 ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{college2.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSelector2(true)}
                  >
                    Change
                  </Button>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {college2.branch}
                </p>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowSelector2(true)}
              >
                Select College 2
              </Button>
            )}
            {showSelector2 && (
              <div className="absolute z-10 mt-2 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl max-h-64 overflow-y-auto">
                {mockColleges.map((college) => (
                  <button
                    key={college.name}
                    onClick={() => handleSelectCollege(college, 2)}
                    className="w-full text-left p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border-b border-slate-200 dark:border-slate-800 last:border-0"
                  >
                    <div className="font-semibold">{college.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {college.branch}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison */}
      {college1 && college2 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 font-semibold">
                <div>Metric</div>
                <div className="text-center">{college1.name}</div>
                <div className="text-center">{college2.name}</div>
              </div>

              <StatCard
                label="Closing Rank"
                value1={college1.closingRank}
                value2={college2.closingRank}
                higher={college1.closingRank < college2.closingRank ? 1 : 2}
              />

              <StatCard
                label="Average Package"
                value1={college1.avgPackage}
                value2={college2.avgPackage}
                higher={college1.avgPackage > college2.avgPackage ? 1 : 2}
                format={(val) => `₹${val} LPA`}
              />

              <StatCard
                label="Maximum Package"
                value1={college1.maxPackage}
                value2={college2.maxPackage}
                higher={college1.maxPackage > college2.maxPackage ? 1 : 2}
                format={(val) => `₹${val} LPA`}
              />

              <StatCard
                label="Placement Rate"
                value1={college1.placementRate}
                value2={college2.placementRate}
                higher={college1.placementRate > college2.placementRate ? 1 : 2}
                format={(val) => `${val}%`}
              />

              <StatCard
                label="Established"
                value1={college1.established}
                value2={college2.established}
              />

              <StatCard
                label="Total Students"
                value1={college1.totalStudents}
                value2={college2.totalStudents}
                format={(val) => val.toLocaleString()}
              />

              {/* Location */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <div className="text-center">{college1.location}</div>
                <div className="text-center">{college2.location}</div>
              </div>

              {/* Top Recruiters */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Top Recruiters</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {college1.topRecruiters.map((recruiter) => (
                      <Badge key={recruiter} variant="default" className="mr-2">
                        {recruiter}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {college2.topRecruiters.map((recruiter) => (
                      <Badge key={recruiter} variant="default" className="mr-2">
                        {recruiter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Range Visualization */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Package Range</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{college1.name}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        ₹{college1.minPackage} - ₹{college1.maxPackage} LPA
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        style={{
                          width: `${((college1.avgPackage - college1.minPackage) / (college1.maxPackage - college1.minPackage)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{college2.name}</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        ₹{college2.minPackage} - ₹{college2.maxPackage} LPA
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{
                          width: `${((college2.avgPackage - college2.minPackage) / (college2.maxPackage - college2.minPackage)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <EmptyState
          icon={Building}
          title="Select colleges to compare"
          description="Choose two colleges from above to see a detailed side-by-side comparison."
        />
      )}
    </div>
  );
}
