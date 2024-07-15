import React, { useState, useEffect } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [numberA, setNumberA] = useState("");
  const [numberB, setNumberB] = useState("");
  const [numberC, setNumberC] = useState("");

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

  const deleteMember = async (name) => {
    try {
      const response = await fetch("/members", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        fetchMembers();
      } else {
        console.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const addNumbers = async () => {
    try {
      const response = await fetch("/sum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numberA, numberB, numberC }),
      });

      if (response.ok) {
        setNumberA("");
        setNumberB("");
        setNumberC("");
        fetchMembers();
      } else {
        console.error("Failed to add sum");
      }
    } catch (error) {
      console.error("Error adding sum:", error);
    }
  };

  return (
    <div>
      <h1>Member List</h1>
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <button onClick={() => deleteMember(member)}>{member}</button>
          </li>
        ))}
      </ul>

      <input
        type="number"
        value={numberA}
        onChange={(e) => setNumberA(e.target.value)}
        placeholder="Number A"
      />
      <input
        type="number"
        value={numberB}
        onChange={(e) => setNumberB(e.target.value)}
        placeholder="Number B"
      />
      <input
        type="number"
        value={numberC}
        onChange={(e) => setNumberC(e.target.value)}
        placeholder="Number C"
      />
      <button onClick={addNumbers}>Add Sum</button>
    </div>
  );
}

export default App;
