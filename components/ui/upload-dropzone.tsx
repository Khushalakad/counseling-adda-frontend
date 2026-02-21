"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  label?: string;
  description?: string;
}

export function UploadDropzone({
  onFileSelect,
  acceptedTypes = ".xlsx,.xls,.csv",
  maxSize = 10,
  label = "Upload File",
  description = "Drag and drop your file here, or click to browse",
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    setError("");
    setFile(null);
    setIsUploaded(false);

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    const allowedExtensions = acceptedTypes
      .split(",")
      .map((ext) => ext.replace(".", "").trim());
    
    if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      setError(`File type not supported. Allowed: ${acceptedTypes}`);
      return;
    }

    setFile(selectedFile);
    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsUploaded(true);
      onFileSelect(selectedFile);
    }, 1500);
  };

  const handleRemove = () => {
    setFile(null);
    setIsUploaded(false);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300",
          isDragging
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 shadow-lg shadow-indigo-500/20"
            : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-900/50",
          error && "border-red-500 bg-red-50 dark:bg-red-950/20"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="hidden"
        />

        {!file ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-base font-medium text-slate-900 dark:text-slate-100">
                {isDragging ? "Drop file here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {acceptedTypes} (max {maxSize}MB)
              </p>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Uploading...</span>
              </div>
            ) : isUploaded ? (
              <div className="space-y-2">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <File className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {file.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="ml-2 p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Upload successful!
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <File className="h-5 w-5" />
                <span className="font-medium">{file.name}</span>
              </div>
            )}
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
}
