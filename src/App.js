import React, { useState, useEffect } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

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

  return (
    <div>
      <h1>Member List</h1>
      <ul>
        {members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Add new member"
      />
      <button onClick={addMember}>Add Member</button>
    </div>
  );
}
// Dummy Code
export default App;
