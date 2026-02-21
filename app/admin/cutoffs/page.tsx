"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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

interface CutoffRecord {
  id: number;
  institute: string;
  branch: string;
  category: string;
  gender: string;
  quota: string;
  openingRank: number;
  closingRank: number;
  year: number;
}

const mockData: CutoffRecord[] = [
  {
    id: 1,
    institute: "NIT Trichy",
    branch: "Computer Science Engineering",
    category: "GEN",
    gender: "Male",
    quota: "Home State",
    openingRank: 800,
    closingRank: 1200,
    year: 2024,
  },
  {
    id: 2,
    institute: "NIT Surathkal",
    branch: "Computer Science Engineering",
    category: "GEN",
    gender: "Male",
    quota: "Other State",
    openingRank: 1200,
    closingRank: 1800,
    year: 2024,
  },
  {
    id: 3,
    institute: "NIT Warangal",
    branch: "Electronics and Communication",
    category: "OBC",
    gender: "Female",
    quota: "Home State",
    openingRank: 2500,
    closingRank: 3200,
    year: 2024,
  },
  {
    id: 4,
    institute: "IIIT Hyderabad",
    branch: "Computer Science Engineering",
    category: "GEN",
    gender: "Male",
    quota: "All India",
    openingRank: 500,
    closingRank: 800,
    year: 2024,
  },
];

export default function ManageCutoffsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [filterInstitute, setFilterInstitute] = useState("ALL");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CutoffRecord | null>(null);
  const [records, setRecords] = useState(mockData);

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.branch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "ALL" || record.category === filterCategory;
    const matchesInstitute = filterInstitute === "ALL" || record.institute === filterInstitute;

    return matchesSearch && matchesCategory && matchesInstitute;
  });

  const handleEdit = (record: CutoffRecord) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleDelete = (record: CutoffRecord) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRecord) {
      setRecords(records.filter((r) => r.id !== selectedRecord.id));
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const handleSave = (updatedRecord: CutoffRecord) => {
    setRecords(
      records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
    setIsEditModalOpen(false);
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
          <h1 className="text-4xl font-bold mb-2 text-slate-100">Manage Cutoffs</h1>
          <p className="text-slate-400">
            View, edit, and delete cutoff records
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Record
        </Button>
      </motion.div>

      {/* Filters */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search institutes, branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 bg-slate-800 border-slate-700 text-slate-100"
              />
            </div>
            <Select
              label="Category"
              options={[
                { value: "ALL", label: "All Categories" },
                { value: "GEN", label: "General" },
                { value: "OBC", label: "OBC" },
                { value: "SC", label: "SC" },
                { value: "ST", label: "ST" },
              ]}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100"
            />
            <Select
              label="Institute"
              options={[
                { value: "ALL", label: "All Institutes" },
                { value: "NIT Trichy", label: "NIT Trichy" },
                { value: "NIT Surathkal", label: "NIT Surathkal" },
                { value: "NIT Warangal", label: "NIT Warangal" },
                { value: "IIIT Hyderabad", label: "IIIT Hyderabad" },
              ]}
              value={filterInstitute}
              onChange={(e) => setFilterInstitute(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">
            {filteredRecords.length} Records Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">Institute</TableHead>
                <TableHead className="text-slate-400">Branch</TableHead>
                <TableHead className="text-slate-400">Category</TableHead>
                <TableHead className="text-slate-400">Gender</TableHead>
                <TableHead className="text-slate-400">Quota</TableHead>
                <TableHead className="text-slate-400">Opening Rank</TableHead>
                <TableHead className="text-slate-400">Closing Rank</TableHead>
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
                  <TableCell>
                    <Badge variant="default">{record.category}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-400">{record.gender}</TableCell>
                  <TableCell className="text-slate-400">{record.quota}</TableCell>
                  <TableCell className="text-slate-300 font-semibold">
                    {record.openingRank}
                  </TableCell>
                  <TableCell className="text-slate-300 font-semibold">
                    {record.closingRank}
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
                        onClick={() => handleDelete(record)}
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

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRecord(null);
        }}
        title="Edit Cutoff Record"
        size="lg"
      >
        {selectedRecord && (
          <EditCutoffForm
            record={selectedRecord}
            onSave={handleSave}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedRecord(null);
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecord(null);
        }}
        title="Delete Record"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-400">
            Are you sure you want to delete this cutoff record? This action cannot be undone.
          </p>
          {selectedRecord && (
            <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
              <p className="font-medium text-slate-200">{selectedRecord.institute}</p>
              <p className="text-sm text-slate-400">{selectedRecord.branch}</p>
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EditCutoffForm({
  record,
  onSave,
  onCancel,
}: {
  record: CutoffRecord;
  onSave: (record: CutoffRecord) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(record);

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
        />
        <Input
          label="Branch"
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
          className="bg-slate-800 border-slate-700 text-slate-100"
        />
        <Input
          label="Opening Rank"
          type="number"
          value={formData.openingRank}
          onChange={(e) =>
            setFormData({ ...formData, openingRank: parseInt(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
        />
        <Input
          label="Closing Rank"
          type="number"
          value={formData.closingRank}
          onChange={(e) =>
            setFormData({ ...formData, closingRank: parseInt(e.target.value) })
          }
          className="bg-slate-800 border-slate-700 text-slate-100"
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
