import { getUserList } from "@/lib/actions/user.actions"; 
import { UserCheck, UserMinus } from "lucide-react";
import UserActionButton from "@/components/UserActionButton"; 
import AddUserForm from "@/components/AddUserForm";

export default async function UserManagementPage() {
  const users = await getUserList(); 

  return (
    <div className="p-10 space-y-8">
      {/* 1. Header Bereich */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
            System <span className="text-blue-500">Users</span>
          </h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-2">
            SPECTORA // Internal Identity Management
          </p>
        </div>
        <div className="text-right font-mono text-[10px] text-slate-600 uppercase">
          Entities Found: <span className="text-white">{users.length}</span>
        </div>
      </div>

      {/* 2. Formular Bereich */}
      <AddUserForm /> 

      {/* 3. User Liste Bereich */}
      <div className="grid gap-4">
        {users.map((user: any) => (
          <div 
            key={user.id} 
            className="bg-[#0d111c] border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:border-blue-500/30 transition-all group shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center text-xl font-black italic border border-white/10 shadow-lg shadow-blue-500/20">
                {user.username ? user.username[0] : "U"}
              </div>
              <div>
                <h3 className="text-white font-bold tracking-tight text-lg leading-tight uppercase italic">
                  {user.username || "Unknown User"}
                </h3>
                <p className="text-slate-500 font-mono text-[11px] mt-1">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-slate-600 font-mono text-[8px] uppercase tracking-widest mb-1 text-right">Access Level</p>
                <span className="px-3 py-1 rounded-full font-mono text-[10px] border bg-blue-500/10 text-blue-500 border-blue-500/20">
                  {user.role || 'ADMIN'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <UserActionButton userId={user.id} type="AUTHORIZE" />
                <UserActionButton userId={user.id} type="TERMINATE" />
              </div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-slate-600 font-mono text-sm uppercase tracking-widest italic">
              No entities detected in 'users' cluster.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}