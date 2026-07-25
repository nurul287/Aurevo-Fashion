import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { apiDownloadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import {
  useImportJob,
  useImportJobs,
  useImportRows,
  useRetryImportJob,
  useUploadImport,
  type ImportJobStatus,
} from "@/services/imports";
import { CloudUpload, Download, RefreshCw } from "lucide-react";

const ACCEPTED_TYPES = ".xlsx,.xls,.csv,.json,.ndjson";
const ACCEPTED_EXTENSIONS = ["xlsx", "xls", "csv", "json", "ndjson"];

const STATUS_STYLES: Record<ImportJobStatus, string> = {
  pending: "bg-muted text-muted-foreground border-transparent",
  running: "bg-blue-100 text-blue-700 border-transparent",
  completed: "bg-green-100 text-green-700 border-transparent",
  partial: "bg-amber-100 text-amber-700 border-transparent",
  failed: "bg-red-100 text-red-700 border-transparent",
};

function StatusBadge({ status }: { status: ImportJobStatus }) {
  return <Badge className={cn(STATUS_STYLES[status], "capitalize")}>{status}</Badge>;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

const AdminImportsPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showError } = useToast();

  const upload = useUploadImport();
  const activeJob = useImportJob(activeJobId);
  const failedRows = useImportRows(activeJobId, "failed");
  const retry = useRetryImportJob();
  const jobsList = useImportJobs(1, 10);

  const isUploading = upload.isPending;

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const file = Array.from(files)[0];
      if (!file) return;
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ACCEPTED_EXTENSIONS.includes(ext)) {
        showError("Unsupported file type", "Upload a .xlsx, .csv, .json, or .ndjson file.");
        return;
      }
      upload.mutate(file, {
        onSuccess: (result) => setActiveJobId(result.job_id),
      });
    },
    [upload, showError],
  );

  const handleDownloadTemplate = async () => {
    setIsDownloadingTemplate(true);
    try {
      await apiDownloadFile("/admin/imports/template");
    } catch {
      showError("Download failed", "Could not download the template. Please try again.");
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const job = activeJob.data;
  const progressPct = job && job.total_rows > 0 ? (job.processed_rows / job.total_rows) * 100 : 0;
  const uploadRejected = upload.data?.rejected ?? [];
  const canRetry = job?.status !== "running" && job?.status !== "pending";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bulk Import</h1>
          <p className="text-muted-foreground">
            Upload a spreadsheet to create or update many products at once.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownloadTemplate} disabled={isDownloadingTemplate}>
          <Download className="h-4 w-4 mr-2" />
          {isDownloadingTemplate ? "Downloading..." : "Download template"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload products</CardTitle>
          <CardDescription>
            One row = one product colorway. Sizes fan out into variants automatically - see the
            template for the exact column layout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (!isUploading) handleFiles(e.dataTransfer.files);
            }}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/25 hover:border-muted-foreground/50",
              isUploading && "opacity-50 cursor-not-allowed",
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
                e.target.value = "";
              }}
              className="hidden"
              disabled={isUploading}
            />
            <CloudUpload className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Drop a file here, or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">.xlsx, .xls, .csv, .json, or .ndjson</p>
          </div>

          {uploadRejected.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-destructive">
                {uploadRejected.length} row{uploadRejected.length === 1 ? "" : "s"} rejected before import
              </p>
              <div className="max-h-40 overflow-y-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">Row</TableHead>
                      <TableHead>Error</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadRejected.map((r) => (
                      <TableRow key={r.row_number}>
                        <TableCell>{r.row_number}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{r.error}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {activeJobId && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current job</CardTitle>
              {job && <StatusBadge status={job.status} />}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeJob.isLoading || !job ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>
                      {job.processed_rows} / {job.total_rows} rows processed
                    </span>
                    <span className="text-muted-foreground">
                      {job.succeeded} succeeded - {job.failed} failed
                    </span>
                  </div>
                  <ProgressBar value={progressPct} />
                </div>

                {job.status === "failed" && job.error && <p className="text-sm text-destructive">{job.error}</p>}

                {job.failed > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Failed rows</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retry.mutate(job.id)}
                        disabled={retry.isPending || !canRetry}
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-2" />
                        Retry failed rows
                      </Button>
                    </div>
                    <div className="max-h-60 overflow-y-auto rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-20">Row</TableHead>
                            <TableHead>External ID</TableHead>
                            <TableHead>Error</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {failedRows.isLoading ? (
                            <TableRow>
                              <TableCell colSpan={3}>
                                <Skeleton className="h-4 w-full" />
                              </TableCell>
                            </TableRow>
                          ) : (
                            (failedRows.data?.data ?? []).map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.row_number}</TableCell>
                                <TableCell className="font-mono text-xs">{row.external_id}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{row.error}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent imports</CardTitle>
        </CardHeader>
        <CardContent>
          {jobsList.isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : (jobsList.data?.data.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No imports yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Started</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Rows</TableHead>
                    <TableHead className="text-right">Succeeded</TableHead>
                    <TableHead className="text-right">Failed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(jobsList.data?.data ?? []).map((j) => (
                    <TableRow key={j.id} className="cursor-pointer" onClick={() => setActiveJobId(j.id)}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {new Date(j.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">{j.source}</TableCell>
                      <TableCell>
                        <StatusBadge status={j.status} />
                      </TableCell>
                      <TableCell className="text-right">{j.total_rows}</TableCell>
                      <TableCell className="text-right">{j.succeeded}</TableCell>
                      <TableCell className="text-right">{j.failed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminImportsPage;
