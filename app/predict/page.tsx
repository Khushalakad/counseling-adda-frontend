"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { GraduationCap } from "lucide-react";

interface CollegeResult {
  id: number;
  name: string;
  branch: string;
  closingRank: number;
  category: "safe" | "moderate" | "dream";
  avgPackage: number;
  location: string;
  type: string;
}

const mockResults: CollegeResult[] = [
  {
    id: 1,
    name: "NIT Trichy",
    branch: "Computer Science Engineering",
    closingRank: 1200,
    category: "dream",
    avgPackage: 18.5,
    location: "Tamil Nadu",
    type: "NIT",
  },
  {
    id: 2,
    name: "NIT Surathkal",
    branch: "Computer Science Engineering",
    closingRank: 1800,
    category: "moderate",
    avgPackage: 16.2,
    location: "Karnataka",
    type: "NIT",
  },
  {
    id: 3,
    name: "NIT Warangal",
    branch: "Computer Science Engineering",
    closingRank: 2200,
    category: "moderate",
    avgPackage: 15.8,
    location: "Telangana",
    type: "NIT",
  },
  {
    id: 4,
    name: "NIT Calicut",
    branch: "Computer Science Engineering",
    closingRank: 3500,
    category: "safe",
    avgPackage: 14.5,
    location: "Kerala",
    type: "NIT",
  },
  {
    id: 5,
    name: "IIIT Hyderabad",
    branch: "Computer Science Engineering",
    closingRank: 800,
    category: "dream",
    avgPackage: 22.3,
    location: "Telangana",
    type: "IIIT",
  },
];

export default function PredictPage() {
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GEN");
  const [gender, setGender] = useState("Male");
  const [state, setState] = useState("Home");
  const [instituteType, setInstituteType] = useState("ALL");
  const [results, setResults] = useState<CollegeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = () => {
    if (!rank) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Predict Colleges</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Enter your details to get AI-powered college predictions
        </p>
      </motion.div>

      {/* Filters */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>
            Provide your details for accurate predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="JEE Main Rank"
              type="number"
              placeholder="Enter your rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
            />

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-indigo-600 dark:text-indigo-400">
                Category
              </label>
              <select
                className="flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="GEN">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-indigo-600 dark:text-indigo-400">
                Gender
              </label>
              <select
                className="flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-indigo-600 dark:text-indigo-400">
                State Quota
              </label>
              <select
                className="flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="Home">Home State</option>
                <option value="Other">Other State</option>
              </select>
            </div>

            <div className="relative">
              <label className="absolute left-4 top-2 text-xs text-indigo-600 dark:text-indigo-400">
                Institute Type
              </label>
              <select
                className="flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pt-6 pb-2 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={instituteType}
                onChange={(e) => setInstituteType(e.target.value)}
              >
                <option value="ALL">All Types</option>
                <option value="NIT">NIT</option>
                <option value="IIIT">IIIT</option>
                <option value="GFTI">GFTI</option>
                <option value="CSAB">CSAB</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handlePredict}
                disabled={isLoading || !rank}
                className="w-full"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                {isLoading ? "Predicting..." : "Predict Colleges"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} variant="glass">
              <CardHeader>
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {results.length} Colleges Found
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={college.category}>
                        {college.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {college.type}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{college.name}</CardTitle>
                    <CardDescription>{college.branch}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Closing Rank
                        </span>
                        <span className="font-semibold">{college.closingRank}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Avg Package
                        </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ₹{college.avgPackage} LPA
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Location
                        </span>
                        <span className="font-medium">{college.location}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full group">
                      View Details
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="No predictions yet"
          description="Enter your rank and preferences above to get started with college predictions."
        />
      )}
    </div>
  );
}
