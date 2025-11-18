import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Subjects({ userId, onSelect }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchSubjects = async () => {
    if (!userId) return;
    const res = await fetch(`${API_BASE}/api/subjects`, { headers: { "X-User-Id": userId } });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { fetchSubjects(); }, [userId]);

  const create = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await fetch(`${API_BASE}/api/subjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-User-Id": userId },
      body: JSON.stringify({ user_id: userId, name, description }),
    });
    setName(""); setDescription("");
    fetchSubjects();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-semibold">Subjects</h2>
      <form onSubmit={create} className="flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Add subject" className="flex-1 px-3 py-2 rounded bg-slate-800 text-white border border-slate-700"/>
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Add</button>
      </form>
      <ul className="space-y-2">
        {items.map(s => (
          <li key={s._id} className="p-3 bg-slate-800/60 border border-slate-700 rounded cursor-pointer hover:bg-slate-800" onClick={()=>onSelect(s)}>
            <div className="text-white font-medium">{s.name}</div>
            {s.description && <div className="text-slate-400 text-sm">{s.description}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
