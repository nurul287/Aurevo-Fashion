// Response keys arrive snake_case -- api.get/apiFetchForm convert the BE's
// camelCase (see src/lib/api.ts snakifyKeys). Mirrors Aurevo.BE's
// import_jobs/import_rows tables (supabase/migrations/045_product_import.sql).

export type ImportJobStatus = "pending" | "running" | "completed" | "partial" | "failed";
export type ImportRowStatus = "pending" | "processing" | "done" | "failed" | "skipped";

export type ImportJob = {
  id: string;
  source: string;
  status: ImportJobStatus;
  total_rows: number;
  processed_rows: number;
  succeeded: number;
  failed: number;
  created_by: string | null;
  error: string | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
};

export type ImportRejection = { row_number: number; error: string };

export type UploadImportResult = {
  job_id: string;
  total: number;
  status: ImportJobStatus;
  rejected: ImportRejection[];
};

export type ImportRow = {
  id: string;
  job_id: string;
  row_number: number;
  source: string;
  external_id: string;
  payload: unknown;
  status: ImportRowStatus;
  product_id: string | null;
  error: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
};

// Terminal job statuses -- once reached, polling stops.
export const TERMINAL_JOB_STATUSES: ImportJobStatus[] = ["completed", "partial", "failed"];
