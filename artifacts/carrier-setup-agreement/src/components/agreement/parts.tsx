import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

export function SectionHeader({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) {
  return (
    <div className="mb-7 flex items-center gap-4 border-b border-border pb-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/20 bg-foreground/10 text-foreground sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div className="min-w-0">
        <h2 className="text-lg font-bold text-foreground sm:text-2xl">{title}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export function InfoTile({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="glass flex items-center gap-3.5 rounded-xl p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-foreground/5 text-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="mt-0.5 break-words text-sm font-bold leading-snug text-foreground">{children}</div>
      </div>
    </div>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string | undefined;
  inputClassName?: string | undefined;
};

export function Field({ id, label, icon: Icon, error, inputClassName, ...rest }: FieldProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
        <Icon className="h-4 w-4 shrink-0 text-foreground" />
        <span>{label}</span>
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`dark-field-input ${inputClassName ?? ""}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
