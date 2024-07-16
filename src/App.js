import React, { useState, useEffect } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [incidenceMatrix, setIncidenceMatrix] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [tolerances, setTolerances] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch("/members");
      const data = await response.json();
      setMembers(data.members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const addMember = async () => {
    if (!newMember.trim()) return;

    try {
      const response = await fetch("/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newMember }),
      });

      if (response.ok) {
        setNewMember("");
        fetchMembers();
      } else {
        console.error("Failed to add member");
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  const reconcileData = async () => {
    try {
      const response = await fetch("/reconcile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incidence_matrix: JSON.parse(incidenceMatrix),
          measurements: JSON.parse(measurements),
          tolerances: JSON.parse(tolerances),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Reconciled Measurements:", data.reconciled_measurements);
        setIncidenceMatrix("");
        setMeasurements("");
        setTolerances("");
        fetchMembers();
      } else {
        console.error("Failed to reconcile data");
      }
    } catch (error) {
      console.error("Error reconciling data:", error);
    }
  };

  return (
    <div>
      <h1>Input</h1>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="New Member Name"
      />
      <button onClick={addMember}>Add Member</button>

      <h2>Reconciliation</h2>
      <textarea
        value={incidenceMatrix}
        onChange={(e) => setIncidenceMatrix(e.target.value)}
        placeholder='Incidence Matrix (e.g. "[[1, 0], [0, 1]]")'
      />
      <textarea
        value={measurements}
        onChange={(e) => setMeasurements(e.target.value)}
        placeholder='Measurements (e.g. "[6, 55]")'
      />
      <textarea
        value={tolerances}
        onChange={(e) => setTolerances(e.target.value)}
        placeholder='Tolerances (e.g. "[0.1, 0.2]")'
      />
      <button onClick={reconcileData}>Reconcile Data</button>

      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <button>{member}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
