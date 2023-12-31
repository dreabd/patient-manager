import AddPatientModal from "../../AddPatientModal";

function EditPatient({
  edit,
  setEditPatient,
  edittedPatient,
  patientId
}) {
  setEditPatient(true)
  return (
    <AddPatientModal
      editPatientBool={edit}
      setEditPatient={setEditPatient}
      editPatientVals={edittedPatient}
      patientId={patientId}
    />
  )
}

export default EditPatient
