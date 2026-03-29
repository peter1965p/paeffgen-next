export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#05070a] flex items-center justify-center relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Subtiler Matrix-Glow Effekt im Hintergrund */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(5,7,10,1)_100%)] pointer-events-none" />
      
      {/* Ein feines Grid für den Tech-Look */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-lg p-4">
        {children}
      </main>
    </div>
  );
}