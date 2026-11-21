import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";
import { login as loginApi, verifyLoginOtp } from "../services/authService";
import { Mail, Lock, KeyRound, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = credentials, 2 = OTP verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/";

  // If already authenticated, redirect to destination
  if (isAuthenticated) {
    navigate(destination, { replace: true });
    return null;
  }

  // Step 1: Submit Credentials & Request OTP
  async function handleCredentialsSubmit(e) {
    e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginApi(email, password);
      setInfoMessage(res.message || "OTP sent to your email. Please check your inbox.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify Login OTP
  async function handleOtpSubmit(e) {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter the 6-digit OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyLoginOtp(email, otp);
      if (res.token && res.user) {
        login(res.token, res.user);
        navigate(destination, { replace: true });
      } else {
        setError("Invalid response received from server. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    setError("");
    setInfoMessage("");
    try {
      setLoading(true);
      const res = await loginApi(email, password);
      setInfoMessage(res.message || "New OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D19] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-[-10%] top-[-25%] h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="relative w-full max-w-md space-y-8 rounded-2xl border border-gray-700/70 bg-[#151D30]/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-lg shadow-violet-500/20">
            <span className="text-2xl font-black tracking-tight text-white">CH</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
            {step === 1 ? "Welcome to CollabHub" : "Two-Step Verification"}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {step === 1
              ? "Sign in to access your projects and team workspace."
              : `Enter the 6-digit security code sent to ${email}`}
          </p>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <p>{error}</p>
          </div>
        )}

        {infoMessage && (
          <div className="flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            <p>{infoMessage}</p>
          </div>
        )}

        {/* STEP 1: Email & Password Form */}
        {step === 1 && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                Email Address
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification Form */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
                One-Time Security Code (OTP)
              </label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3 pl-10 pr-4 tracking-widest text-sm text-white placeholder-gray-500 outline-none transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
                  required
                  autoFocus
                />
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Code expires in 5 minutes.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <span>Verify & Login</span>
              )}
            </button>

            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="text-violet-400 hover:text-violet-300 underline font-medium disabled:opacity-50"
              >
                Resend code
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setError("");
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                Change email
              </button>
            </div>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <Link
            to="/forgot-password"
            className="mr-3 font-semibold text-violet-400 transition hover:text-violet-300 hover:underline"
          >
            Forgot password?
          </Link>
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-violet-400 transition hover:text-violet-300 hover:underline"
          >
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
