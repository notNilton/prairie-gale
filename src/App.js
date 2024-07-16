import React, { useState, useEffect } from "react";

function App() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [numbers, setNumbers] = useState({
    numberA: "",
    numberB: "",
    numberC: "",
  });

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

  const addNumbers = async () => {
    try {
      const parsedNumbers = {
        numberA: JSON.parse(numbers.numberA),
        numberB: JSON.parse(numbers.numberB),
        numberC: JSON.parse(numbers.numberC),
      };

      const response = await fetch("/sum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedNumbers),
      });

      if (response.ok) {
        console.log(parsedNumbers);
        setNumbers({ numberA: "", numberB: "", numberC: "" });
        fetchMembers();
      } else {
        console.error("Failed to add sum");
      }
    } catch (error) {
      console.error("Error adding sum:", error);
    }
  };

  const handleInputChange = (e, key) => {
    setNumbers({ ...numbers, [key]: e.target.value });
  };

  return (
    <div>
      <h1>Input</h1>
      <input
        type="text"
        value={numbers.numberA}
        onChange={(e) => handleInputChange(e, "numberA")}
        placeholder="Text A (JSON array)"
      />
      <input
        type="text"
        value={numbers.numberB}
        onChange={(e) => handleInputChange(e, "numberB")}
        placeholder="Text B (JSON array)"
      />
      <input
        type="text"
        value={numbers.numberC}
        onChange={(e) => handleInputChange(e, "numberC")}
        placeholder="Text C (JSON array)"
      />
      <button onClick={addNumbers}>Add Sum</button>

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
