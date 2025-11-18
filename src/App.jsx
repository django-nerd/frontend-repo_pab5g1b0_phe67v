import { useState } from "react";
import Subjects from "./components/Subjects.jsx";
import Books from "./components/Books.jsx";

function App() {
  // For demo, we let user enter their Supabase user id. In production, read from auth session
  const [userId, setUserId] = useState("");
  const [subject, setSubject] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <div className="text-white font-semibold mb-2">Your User ID</div>
            <input value={userId} onChange={(e)=>setUserId(e.target.value)} placeholder="paste supabase user id" className="w-full px-3 py-2 rounded bg-slate-900 text-white border border-slate-700" />
          </div>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
            <Subjects userId={userId} onSelect={setSubject} />
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 min-h-[200px]">
            {subject ? (
              <Books userId={userId} subject={subject} />
            ) : (
              <div className="text-slate-300">Select a subject to manage books.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
