"use client";

import { updateUserRole } from "@/lib/actions"; // Nutzt die neue Action für die 'users' Tabelle [cite: 2026-03-08]
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string | number;
  type: "AUTHORIZE" | "TERMINATE";
}

export default function UserActionButton({ userId, type }: Props) {
  const router = useRouter();

  const handleAction = async () => {
    // Wir schalten hier zwischen ADMIN und GUEST um (als Beispiel für 'users') [cite: 2026-03-08]
    const newRole = type === "AUTHORIZE" ? "ADMIN" : "GUEST";
    const res = await updateUserRole(userId, newRole);

    if (res.success) {
      router.refresh(); // Sorgt dafür, dass die Server Component die neuen Daten lädt [cite: 2026-03-08]
    } else {
      alert("Fehler beim Update: " + res.error);
    }
  };

  return (
    <button 
      onClick={handleAction}
      className={`p-3 rounded-xl transition-all border shadow-sm ${
        type === "AUTHORIZE" 
          ? "bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white border-blue-500/20" 
          : "bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border-red-500/20"
      }`}
      title={type === "AUTHORIZE" ? "Promote to Admin" : "Demote/Restrict"}
    >
      {type === "AUTHORIZE" ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
    </button>
  );
}