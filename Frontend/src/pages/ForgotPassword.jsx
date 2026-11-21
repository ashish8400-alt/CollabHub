import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, KeyRound, Lock, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPassword, verifyResetOtp, resetPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function sendOtp(e) {
    e.preventDefault();
    try { const data = await forgotPassword(email); setMessage(data.message || "OTP sent."); setError(""); setStep(2); }
    catch (err) { setError(err.response?.data?.message || "Failed to send OTP"); }
  }
  async function verifyOtp(e) {
    e.preventDefault();
    try { await verifyResetOtp(email, otp); setError(""); setStep(3); }
    catch (err) { setError(err.response?.data?.message || "Invalid OTP"); }
  }
  async function submitPassword(e) {
    e.preventDefault();
    try { const data = await resetPassword(email, otp, newPassword); setMessage(data.message || "Password reset successfully"); setError(""); setTimeout(() => navigate("/login"), 800); }
    catch (err) { setError(err.response?.data?.message || "Failed to reset password"); }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D19] px-4 text-white">
      <div className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-700/70 bg-[#151D30]/95 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-lg font-black">CH</div>
          <h1 className="mt-5 text-2xl font-bold">Reset your password</h1>
          <p className="mt-2 text-sm text-gray-400">{step === 1 ? "We'll send a secure code to your email." : step === 2 ? "Enter the verification code." : "Choose a strong new password."}</p>
        </div>
        {message && <div className="mb-5 flex gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"><CheckCircle2 className="h-5 w-5 shrink-0" /><p>{message}</p></div>}
        {error && <div className="mb-5 flex gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"><AlertCircle className="h-5 w-5 shrink-0" /><p>{error}</p></div>}
        {step === 1 && <form onSubmit={sendOtp} className="space-y-4"><label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Email address</label><div className="relative"><Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full rounded-xl border border-gray-700 bg-[#101729] py-3 pl-10 pr-4 outline-none" required /></div><button type="submit" className="w-full rounded-xl bg-violet-600 py-3 font-semibold">Send reset OTP</button></form>}
        {step === 2 && <form onSubmit={verifyOtp} className="space-y-4"><label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">Verification code</label><div className="relative"><KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" /><input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} maxLength={6} placeholder="6-digit OTP" className="w-full rounded-xl border border-gray-700 bg-[#101729] py-3 pl-10 pr-4 tracking-[0.35em] outline-none" required /></div><button type="submit" className="w-full rounded-xl bg-violet-600 py-3 font-semibold">Verify OTP</button></form>}
        {step === 3 && <form onSubmit={submitPassword} className="space-y-4"><label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">New password</label><div className="relative"><Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" /><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} placeholder="At least 8 characters" className="w-full rounded-xl border border-gray-700 bg-[#101729] py-3 pl-10 pr-4 outline-none" required /></div><button type="submit" className="w-full rounded-xl bg-violet-600 py-3 font-semibold">Reset password</button></form>}
        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-violet-300"><ArrowLeft className="h-4 w-4" /> Back to login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
