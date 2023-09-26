import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState for local state

function PatientCard({ patients, filters,setFilteredPatients}) {
  // Local state for filteredPatients
  const [patientCards, setPatientCards] = useState([]);

  // Priority: Active, On Boarding, Inquiry, Churned
  let active = patients.filter((patient) => patient.status.toLowerCase() === "active");
  let onBoarding = patients.filter((patient) => patient.status.toLowerCase() === "onboarding");
  let inquiry = patients.filter((patient) => patient.status.toLowerCase() === "inquiry");
  let churned = patients.filter((patient) => patient.status.toLowerCase() === "churned");

  let priority_list = [...active, ...onBoarding, ...inquiry, ...churned];

  // ------------------- Use Effect -------------------
  useEffect(() => {
    // ----- Helper for Filtering -----
    function filterPatients(priority_list, filters) {
      let cities = filters?.city || [];
      let states = filters?.state || [];
      let statuses = filters?.status || [];

      let filtered = priority_list;

      if (cities.length) {
        filtered = filtered.filter((patient) => cities.includes(patient.addresses[0].city));
      }
      if (states.length) {
        filtered = filtered.filter((patient) => states.includes(patient.addresses[0].state));
      }
      if (statuses.length) {
        filtered = filtered.filter((patient) => statuses.includes(patient.status));
      }

      return filtered;
    }

    // Update the local state
    const updatedFilteredPatients = filterPatients(patients, filters);
    setPatientCards(updatedFilteredPatients)
    setFilteredPatients(updatedFilteredPatients)
  }, [patients, filters]); // Add dependencies for the useEffect

  return patientCards.map((patient) => {
    return (
      <li key={`${patient.id}`}>
        {/* left side */}
        <div>
          <NavLink to={`/patients/${patient.id}`}>
            <p>
              {patient.last_name}
              {patient?.middle_name && ` ${patient.middle_name}`}, {patient.first_name}
            </p>
          </NavLink>
          <p>
            {patient.addresses[0].city} {patient.addresses[0].state}
          </p>
        </div>
        {/* right side */}
        <div>
          <p>{patient.status}</p>
        </div>
      </li>
    );
  });
}

export default PatientCard;