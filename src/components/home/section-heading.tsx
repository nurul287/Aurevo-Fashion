import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** Centered uppercase title with thin side rules — matches Catalog heading. */
export function SectionHeading({
  id,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 flex items-center justify-center gap-3 sm:mb-10 sm:gap-5 md:gap-6",
        className,
      )}
    >
      <span className="h-px w-8 bg-slate-300 sm:w-14 md:w-20" aria-hidden />
      <h2
        id={id}
        className="shrink-0 text-center text-2xl font-bold uppercase tracking-[0.12em] text-slate-900 sm:text-3xl md:text-4xl"
      >
        {children}
      </h2>
      <span className="h-px w-8 bg-slate-300 sm:w-14 md:w-20" aria-hidden />
    </div>
  );
}
