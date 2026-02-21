"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";

interface PlacementRecord {
  id: number;
  institute: string;
  branch: string;
  avgPackage: number;
  medianPackage: number;
  highestPackage: number;
  placementRate: number;
  year: number;
}

const mockData: PlacementRecord[] = [
  {
    id: 1,
    institute: "NIT Trichy",
    branch: "Computer Science Engineering",
    avgPackage: 18.5,
    medianPackage: 16.0,
    highestPackage: 45.0,
    placementRate: 95,
    year: 2024,
  },
  {
    id: 2,
    institute: "NIT Surathkal",
    branch: "Computer Science Engineering",
    avgPackage: 16.2,
    medianPackage: 14.5,
    highestPackage: 42.0,
    placementRate: 92,
    year: 2024,
  },
  {
    id: 3,
    institute: "IIIT Hyderabad",
    branch: "Computer Science Engineering",
    avgPackage: 22.3,
    medianPackage: 20.0,
    highestPackage: 55.0,
    placementRate: 98,
    year: 2024,
  },
];

export default function ManagePlacementsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PlacementRecord | null>(null);
  const [records, setRecords] = useState(mockData);

  const filteredRecords = records.filter(
    (record) =>
      record.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedRecord(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (record: PlacementRecord) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSave = (record: PlacementRecord) => {
    if (record.id) {
      setRecords(records.map((r) => (r.id === record.id ? record : r)));
      setIsEditModalOpen(false);
    } else {
      const newRecord = { ...record, id: Date.now() };
      setRecords([...records, newRecord]);
      setIsAddModalOpen(false);
    }
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2 text-slate-100">Manage Placements</h1>
          <p className="text-slate-400">
            View and manage placement statistics
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Placement
        </Button>
      </motion.div>

      {/* Search */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search institutes, branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-slate-800 border-slate-700 text-slate-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">
            {filteredRecords.length} Placement Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">Institute</TableHead>
                <TableHead className="text-slate-400">Branch</TableHead>
                <TableHead className="text-slate-400">Avg Package (LPA)</TableHead>
                <TableHead className="text-slate-400">Median Package (LPA)</TableHead>
                <TableHead className="text-slate-400">Highest Package (LPA)</TableHead>
                <TableHead className="text-slate-400">Placement %</TableHead>
                <TableHead className="text-slate-400">Year</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-slate-800"
                >
                  <TableCell className="font-medium text-slate-200">
                    {record.institute}
                  </TableCell>
                  <TableCell className="text-slate-400">{record.branch}</TableCell>
                  <TableCell className="text-green-400 font-semibold">
                    ₹{record.avgPackage}
                  </TableCell>
                  <TableCell className="text-slate-300">{record.medianPackage}</TableCell>
                  <TableCell className="text-indigo-400 font-semibold">
                    ₹{record.highestPackage}
                  </TableCell>
                  <TableCell>
                    <Badge variant="safe" className="bg-green-900/30 text-green-400 border-green-700">
                      {record.placementRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">{record.year}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(record)}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        title={selectedRecord ? "Edit Placement" : "Add Placement"}
        size="lg"
      >
        <PlacementForm
          record={selectedRecord}
          onSave={handleSave}
          onCancel={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setSelectedRecord(null);
          }}
        />
      </Modal>
    </div>
  );
}

function PlacementForm({
  record,
  onSave,
  onCancel,
}: {
  record: PlacementRecord | null;
  onSave: (record: PlacementRecord) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<PlacementRecord>(
    record || {
      id: 0,
      institute: "",
      branch: "",
      avgPackage: 0,
      medianPackage: 0,
      highestPackage: 0,
      placementRate: 0,
      year: 2024,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Institute"
          value={formData.institute}
          onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Branch"
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Average Package (LPA)"
          type="number"
          step="0.1"
          value={formData.avgPackage}
          onChange={(e) =>
            setFormData({ ...formData, avgPackage: parseFloat(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Median Package (LPA)"
          type="number"
          step="0.1"
          value={formData.medianPackage}
          onChange={(e) =>
            setFormData({ ...formData, medianPackage: parseFloat(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Highest Package (LPA)"
          type="number"
          step="0.1"
          value={formData.highestPackage}
          onChange={(e) =>
            setFormData({ ...formData, highestPackage: parseFloat(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Placement Rate (%)"
          type="number"
          step="0.1"
          value={formData.placementRate}
          onChange={(e) =>
            setFormData({ ...formData, placementRate: parseFloat(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
        <Input
          label="Year"
          type="number"
          value={formData.year}
          onChange={(e) =>
            setFormData({ ...formData, year: parseInt(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
          required
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
