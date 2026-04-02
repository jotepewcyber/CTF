"use client";

export default function LoginFooter() {
  return (
    <>
      {/* Divider */}
      <div className="mt-8">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 absolute w-full"></div>
          <div className="bg-black/50 px-4 relative text-white/60 text-sm">
            New to the arena?
          </div>
        </div>
      </div>

      {/* Sign Up Link */}
      <p className="mt-8 text-center text-sm text-white/60">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-white hover:text-purple-300 transition-colors"
        >
          Create Account
        </a>
      </p>
    </>
  );
}
