import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

export default function Books({ userId, subject }) {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);

  const fetchBooks = async () => {
    if (!userId || !subject) return;
    const res = await fetch(`${API_BASE}/api/books?subject_id=${subject._id}`, { headers: { "X-User-Id": userId } });
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { fetchBooks(); }, [userId, subject?._id]);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const form = new FormData();
    form.append("user_id", userId);
    form.append("subject_id", subject._id);
    form.append("file", file);
    await fetch(`${API_BASE}/api/books/upload`, { method: "POST", body: form });
    setFile(null);
    fetchBooks();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-semibold">Books in {subject?.name}</h2>
      <form onSubmit={upload} className="flex items-center gap-2">
        <input type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files?.[0]||null)} className="text-slate-300" />
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Upload PDF</button>
      </form>
      <ul className="space-y-2">
        {items.map(b => (
          <li key={b._id} className="p-3 bg-slate-800/60 border border-slate-700 rounded">
            <div className="text-white font-medium">{b.title}</div>
            <div className="text-slate-400 text-sm">{b.original_filename}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
