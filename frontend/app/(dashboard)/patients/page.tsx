import { PatientList } from "@/features/patients";
import { listPatients } from "@/features/patients/server/get-patient";

export default async function PatientsPage() {
  const patients = listPatients();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Patients
        </h1>
        <p className="text-sm text-muted-foreground">
          Service users and care records (reference slice).
        </p>
      </div>
      <PatientList patients={patients} />
    </div>
  );
}
