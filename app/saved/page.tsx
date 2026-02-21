"use client";

import { motion } from "framer-motion";
import { Bookmark, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

const savedColleges = [
  {
    id: 1,
    name: "NIT Trichy",
    branch: "Computer Science Engineering",
    closingRank: 1200,
    category: "dream",
    avgPackage: 18.5,
    savedAt: "2 days ago",
  },
  {
    id: 2,
    name: "NIT Surathkal",
    branch: "Computer Science Engineering",
    closingRank: 1800,
    category: "moderate",
    avgPackage: 16.2,
    savedAt: "3 days ago",
  },
];

export default function SavedPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2">Saved Results</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Your bookmarked colleges and predictions
        </p>
      </motion.div>

      {savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="glass" className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={college.category as "safe" | "moderate" | "dream"}>
                      {college.category.toUpperCase()}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle>{college.name}</CardTitle>
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
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      Saved {college.savedAt}
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
      ) : (
        <EmptyState
          icon={Bookmark}
          title="No saved colleges"
          description="Start saving colleges from your predictions to view them here."
        />
      )}
    </div>
  );
}
