"use client";

type PaginationInfo = {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
};

export function Pagination({
  pagination,
  page,
  onPageChange,
}: {
  pagination: PaginationInfo | null;
  page:       number;
  onPageChange: (page: number) => void;
}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between text-sm">
      <p className="text-muted-foreground">
        Showing {(page - 1) * pagination.limit + 1}–{Math.min(page * pagination.limit, pagination.total)} of {pagination.total}
      </p>
      <div className="flex items-center gap-1">
        <PaginationBtn label="← Prev" onClick={() => onPageChange(page - 1)} disabled={page === 1} />
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
          .map((p, i, arr) => (
            <span key={p}>
              {i > 0 && arr[i - 1] !== p - 1 && (
                <span className="px-1 text-muted-foreground">…</span>
              )}
              <button
                onClick={() => onPageChange(p)}
                className={`rounded-md border px-3 py-1.5 text-xs transition ${
                  p === page
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {p}
              </button>
            </span>
          ))}
        <PaginationBtn label="Next →" onClick={() => onPageChange(page + 1)} disabled={page === pagination.totalPages} />
      </div>
    </div>
  );
}

function PaginationBtn({ label, onClick, disabled }: { label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
