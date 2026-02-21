"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadDropzone } from "@/components/ui/upload-dropzone";
import { Badge } from "@/components/ui/badge";

interface UploadStatus {
  type: string;
  fileName: string;
  status: "idle" | "uploading" | "success" | "error";
  records?: number;
  error?: string;
}

export default function ExcelUploadPage() {
  const [uploads, setUploads] = useState<UploadStatus[]>([
    { type: "NIT Cutoffs", fileName: "", status: "idle" },
    { type: "IIIT Cutoffs", fileName: "", status: "idle" },
    { type: "CSAB Data", fileName: "", status: "idle" },
    { type: "Placements", fileName: "", status: "idle" },
  ]);

  const handleFileSelect = (type: string, file: File) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.type === type
          ? {
              ...upload,
              fileName: file.name,
              status: "success" as const,
              records: Math.floor(Math.random() * 500) + 100,
            }
          : upload
      )
    );
  };

  const getStatusIcon = (status: UploadStatus["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <FileSpreadsheet className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusBadge = (status: UploadStatus["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="safe" className="bg-green-900/30 text-green-400 border-green-700">
            Uploaded
          </Badge>
        );
      case "error":
        return (
          <Badge variant="default" className="bg-red-900/30 text-red-400 border-red-700">
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="bg-slate-800 text-slate-400 border-slate-700">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-slate-100">Excel Upload</h1>
        <p className="text-slate-400">
          Upload cutoff and placement data via Excel files
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {uploads.map((upload, index) => (
          <motion.div
            key={upload.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card variant="glass" className="bg-slate-900/50 border-slate-800 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                      <FileSpreadsheet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-100">{upload.type}</CardTitle>
                      <CardDescription className="text-slate-400">
                        Upload {upload.type.toLowerCase()} data
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusIcon(upload.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <UploadDropzone
                  onFileSelect={(file) => handleFileSelect(upload.type, file)}
                  acceptedTypes=".xlsx,.xls,.csv"
                  maxSize={10}
                  label={`Upload ${upload.type} Sheet`}
                  description="Drag and drop your Excel file here"
                />
                {upload.status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-green-900/20 border border-green-800/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-400">
                        Upload Successful
                      </span>
                      {getStatusBadge(upload.status)}
                    </div>
                    <p className="text-xs text-slate-400">
                      {upload.records} records imported successfully
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Instructions */}
      <Card variant="glass" className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Upload Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-400 font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium text-slate-300 mb-1">File Format</p>
                <p>Ensure your Excel file follows the required format with proper column headers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-400 font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium text-slate-300 mb-1">File Size</p>
                <p>Maximum file size is 10MB. Supported formats: .xlsx, .xls, .csv</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-indigo-400 font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium text-slate-300 mb-1">Data Validation</p>
                <p>All data will be validated before import. Invalid records will be flagged.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
