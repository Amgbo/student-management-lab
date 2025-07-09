import { useEffect, useState } from 'react';

type Student = {
  name: string;
  email: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/students")
      .then(res => res.json())
      .then(setStudents);
  }, []);

  const addStudent = async () => {
    if (!name || !email) return alert("Both fields are required");

    await fetch("http://localhost:8081/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    const res = await fetch("http://localhost:8081/students");
    setStudents(await res.json());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Students</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((s, i) => (
          <li key={i}>
            {s.name} - {s.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
