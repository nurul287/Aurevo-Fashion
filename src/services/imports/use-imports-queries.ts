import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TERMINAL_JOB_STATUSES, type ImportJob, type ImportRow, type ImportRowStatus } from "./types";

export function useImportJobs(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["admin", "imports", "jobs", page, limit],
    queryFn: () => api.list<ImportJob>(`/admin/imports?page=${page}&limit=${limit}`),
    staleTime: 10 * 1000,
  });
}

/**
 * Polls a single job's status every 2s until it reaches a terminal state
 * (completed/partial/failed). This is the first refetchInterval usage in the
 * codebase -- there's no prior polling convention to match.
 */
export function useImportJob(jobId: string | undefined) {
  return useQuery({
    queryKey: ["admin", "imports", "job", jobId],
    queryFn: () => api.get<ImportJob>(`/admin/imports/${jobId}`),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && TERMINAL_JOB_STATUSES.includes(status) ? false : 2000;
    },
  });
}

export function useImportRows(jobId: string | undefined, status?: ImportRowStatus, page = 1, limit = 50) {
  return useQuery({
    queryKey: ["admin", "imports", "rows", jobId, status, page, limit],
    queryFn: () => {
      const q = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (status) q.set("status", status);
      return api.list<ImportRow>(`/admin/imports/${jobId}/rows?${q.toString()}`);
    },
    enabled: !!jobId,
  });
}
