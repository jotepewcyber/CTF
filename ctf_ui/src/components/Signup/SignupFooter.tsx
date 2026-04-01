"use client";

export default function SignupFooter() {
  return (
    <>
      {/* Divider */}
      <div className="mt-8">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 absolute w-full"></div>
          <div className="bg-black/50 px-4 relative text-white/60 text-sm">
            Already a member?
          </div>
        </div>
      </div>

      {/* Login Link */}
      <p className="mt-8 text-center text-sm text-white/60">
        Have an account?{" "}
        <a
          href="/login"
          className="font-medium text-white hover:text-purple-300 transition-colors"
        >
          Login here
        </a>
      </p>
    </>
  );
}
