'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react'

const DOCUMENT_TYPES = [
  { value: 'medical_letter', label: 'Arztbrief' },
  { value: 'diagnostic_report', label: 'Befundbericht' },
  { value: 'hospital_discharge', label: 'Krankenhausentlassbrief' },
  { value: 'prescription', label: 'Rezept' },
  { value: 'consent', label: 'Vollmacht / Einwilligung' },
  { value: 'insurance_card', label: 'Versicherungskarte' },
  { value: 'care_assessment', label: 'Pflegebescheid' },
  { value: 'other', label: 'Sonstiges' },
]

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  status: 'uploading' | 'success' | 'error'
  documentType: string
}

export function PatientDocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [selectedDocType, setSelectedDocType] = useState('other')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      type: f.type,
      size: f.size,
      status: 'uploading',
      documentType: selectedDocType,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload (replace with actual Payload API call)
    for (const file of newFiles) {
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))
      setFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: Math.random() > 0.1 ? 'success' : 'error' } : f
        )
      )
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files)
  }

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id))

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

  return (
    <div className="space-y-4">
      {/* Document type selector */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Dokumententyp</label>
        <select
          value={selectedDocType}
          onChange={(e) => setSelectedDocType(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-viconia-500"
        >
          {DOCUMENT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
          ${isDragging ? 'border-viconia-400 bg-viconia-50' : 'border-gray-200 hover:border-viconia-300 hover:bg-gray-50'}
        `}
      >
        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-gray-700 text-sm mb-1">
          Datei hier ablegen oder <span className="text-viconia-600">auswählen</span>
        </p>
        <p className="text-xs text-muted-foreground">PDF, JPG, PNG, DOCX – max. 10 MB</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3"
            >
              <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <div className="shrink-0">
                {file.status === 'uploading' && (
                  <div className="h-4 w-4 border-2 border-viconia-500 border-t-transparent rounded-full animate-spin" />
                )}
                {file.status === 'success' && (
                  <CheckCircle className="h-4 w-4 text-viconia-500" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              {file.status !== 'uploading' && (
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
