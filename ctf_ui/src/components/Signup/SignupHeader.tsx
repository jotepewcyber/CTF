"use client";

export default function SignupHeader() {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold mb-2 relative group">
        <span className="absolute -inset-1 bg-linear-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
        <span className="relative inline-block text-3xl font-bold mb-2 text-white">
          Join CTF Arena
        </span>
        <span className="absolute -inset-0.5 bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      </h2>
      <div className="text-white/80 flex flex-col items-center space-y-1">
        <span className="relative group cursor-default">
          <span className="absolute -inset-1 bg-linear-to-r from-purple-600/20 to-pink-600/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          <span className="relative inline-block animate-pulse">
            Create your account to compete
          </span>
        </span>
        <span className="text-xs text-white/50 animate-pulse">
          [Unleash your cybersecurity skills]
        </span>
        <div className="flex space-x-2 text-xs text-white/40">
          <span className="animate-pulse">🔓</span>
          <span className="animate-bounce">💻</span>
          <span className="animate-pulse">🏅</span>
        </div>
      </div>
    </div>
  );
}
