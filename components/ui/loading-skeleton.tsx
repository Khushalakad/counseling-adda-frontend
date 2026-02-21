import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
      <LoadingSkeleton className="h-10 w-24" />
    </div>
  );
}
