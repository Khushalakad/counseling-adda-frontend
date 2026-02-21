"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { BarChart3 } from "lucide-react";

interface RankBandData {
  id: number;
  college: string;
  branch: string;
  minRank: number;
  maxRank: number;
  avgPackage: number;
  location: string;
  type: string;
}

const mockData: RankBandData[] = [
  {
    id: 1,
    college: "NIT Trichy",
    branch: "Computer Science Engineering",
    minRank: 800,
    maxRank: 1200,
    avgPackage: 18.5,
    location: "Tamil Nadu",
    type: "NIT",
  },
  {
    id: 2,
    college: "NIT Surathkal",
    branch: "Computer Science Engineering",
    minRank: 1200,
    maxRank: 1800,
    avgPackage: 16.2,
    location: "Karnataka",
    type: "NIT",
  },
  {
    id: 3,
    college: "NIT Warangal",
    branch: "Computer Science Engineering",
    minRank: 1800,
    maxRank: 2200,
    avgPackage: 15.8,
    location: "Telangana",
    type: "NIT",
  },
  {
    id: 4,
    college: "NIT Calicut",
    branch: "Computer Science Engineering",
    minRank: 2200,
    maxRank: 3500,
    avgPackage: 14.5,
    location: "Kerala",
    type: "NIT",
  },
  {
    id: 5,
    college: "IIIT Hyderabad",
    branch: "Computer Science Engineering",
    minRank: 500,
    maxRank: 800,
    avgPackage: 22.3,
    location: "Telangana",
    type: "IIIT",
  },
  {
    id: 6,
    college: "NIT Rourkela",
    branch: "Computer Science Engineering",
    minRank: 2000,
    maxRank: 2800,
    avgPackage: 15.2,
    location: "Odisha",
    type: "NIT",
  },
  {
    id: 7,
    college: "NIT Durgapur",
    branch: "Computer Science Engineering",
    minRank: 3500,
    maxRank: 5000,
    avgPackage: 13.8,
    location: "West Bengal",
    type: "NIT",
  },
  {
    id: 8,
    college: "IIIT Bangalore",
    branch: "Computer Science Engineering",
    minRank: 1000,
    maxRank: 1500,
    avgPackage: 20.1,
    location: "Karnataka",
    type: "IIIT",
  },
];

type SortField = "college" | "minRank" | "maxRank" | "avgPackage";
type SortDirection = "asc" | "desc";

export default function RankBandPage() {
  const [minRank, setMinRank] = useState("");
  const [maxRank, setMaxRank] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredAndSortedData = useMemo(() => {
    let filtered = mockData;

    // Filter by rank range
    if (minRank) {
      const min = parseInt(minRank);
      filtered = filtered.filter((item) => item.maxRank >= min);
    }
    if (maxRank) {
      const max = parseInt(maxRank);
      filtered = filtered.filter((item) => item.minRank <= max);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.college.toLowerCase().includes(query) ||
          item.branch.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    }

    return filtered;
  }, [minRank, maxRank, searchQuery, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
      {children}
      {sortField === field ? (
        sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Rank Band Analysis</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Analyze colleges within your rank range
        </p>
      </motion.div>

      {/* Filters */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Filter by Rank Range</CardTitle>
          <CardDescription>
            Enter your minimum and maximum rank to see matching colleges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Minimum Rank"
              type="number"
              placeholder="e.g., 1000"
              value={minRank}
              onChange={(e) => setMinRank(e.target.value)}
            />
            <Input
              label="Maximum Rank"
              type="number"
              placeholder="e.g., 5000"
              value={maxRank}
              onChange={(e) => setMaxRank(e.target.value)}
            />
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search colleges, branches..."
                className="flex h-14 w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 pl-11 text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      {filteredAndSortedData.length > 0 ? (
        <Card variant="glass">
          <CardHeader>
            <CardTitle>
              {filteredAndSortedData.length} Colleges Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <SortButton field="college">College</SortButton>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      Branch
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <SortButton field="minRank">Min Rank</SortButton>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <SortButton field="maxRank">Max Rank</SortButton>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      <SortButton field="avgPackage">Avg Package</SortButton>
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      Location
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {item.college}
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                        {item.branch}
                      </td>
                      <td className="py-4 px-4 font-semibold">{item.minRank}</td>
                      <td className="py-4 px-4 font-semibold">{item.maxRank}</td>
                      <td className="py-4 px-4 font-semibold text-green-600 dark:text-green-400">
                        ₹{item.avgPackage} LPA
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                        {item.location}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="default">{item.type}</Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={BarChart3}
          title="No colleges found"
          description="Try adjusting your rank range or search query to see more results."
        />
      )}
    </div>
  );
}
