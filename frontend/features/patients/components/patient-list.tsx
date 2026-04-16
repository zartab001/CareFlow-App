import Link from "next/link";
import type { ReactElement } from "react";

import type { PatientDto } from "../schemas/patient.schema";

export function PatientList({
  patients,
}: {
  patients: PatientDto[];
}): ReactElement {
  if (patients.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No service users yet.</p>
    );
  }

  return (
    <ul className="divide-y divide-border rounded-lg border border-border bg-card">
      {patients.map((p) => (
        <li key={p.id}>
          <Link
            href={`/patients/${p.id}`}
            className="flex flex-col gap-0.5 px-4 py-3 text-sm transition hover:bg-muted/60"
          >
            <span className="font-medium text-card-foreground">
              {p.displayName}
            </span>
            {p.nhsNumber ? (
              <span className="text-muted-foreground">NHS {p.nhsNumber}</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
