import { api, apiFetchForm } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadImportResult } from "./types";

export function useUploadImport() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const fd = new FormData();
      fd.append("file", file);
      return apiFetchForm<UploadImportResult>("/admin/imports", { formData: fd });
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "imports", "jobs"] });
      if (result.total > 0) {
        showSuccess(
          `Import started - ${result.total} product${result.total === 1 ? "" : "s"} queued`,
          result.rejected.length > 0
            ? `${result.rejected.length} row${result.rejected.length === 1 ? "" : "s"} rejected before import.`
            : undefined,
        );
      } else {
        showError("No rows to import", "Every row in the file was rejected -- check the file and try again.");
      }
    },
    onError: (error: Error) => {
      showError("Upload failed", error.message);
    },
  });
}

export function useRetryImportJob() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: (jobId: string) => api.post<{ retried: number }>(`/admin/imports/${jobId}/retry`),
    onSuccess: (result, jobId) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "imports", "job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["admin", "imports", "rows", jobId] });
      showSuccess(
        result.retried > 0 ? `Retrying ${result.retried} failed row${result.retried === 1 ? "" : "s"}` : "Nothing to retry",
      );
    },
    onError: (error: Error) => {
      showError("Retry failed", error.message);
    },
  });
}
