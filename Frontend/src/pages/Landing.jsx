import { ArrowRight, Check, FolderKanban, Bell, CalendarDays, MessageCircle, Users, CircleCheckBig, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const features = [
  { icon: FolderKanban, title: "Project Management", text: "Plan, organize, and deliver every initiative from one clear workspace." },
  { icon: CircleCheckBig, title: "Task Management", text: "Break work into focused tasks with owners, priorities, and deadlines." },
  { icon: Users, title: "Team Collaboration", text: "Keep everyone aligned with shared context and transparent progress." },
  { icon: MessageCircle, title: "Real-time Messaging", text: "Move conversations closer to the work and reach decisions faster." },
  { icon: CalendarDays, title: "Calendar & Deadlines", text: "See milestones and upcoming commitments without losing momentum." },
  { icon: Bell, title: "Notifications", text: "Stay informed about changes that need your attention." },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  if (!loading && isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen overflow-hidden bg-[#080D19] text-white">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.07] bg-[#080D19]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-black">CH</div><span className="text-lg font-bold">CollabHub</span></Link>
          <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#home" className="hover:text-white">Home</a><a href="#features" className="hover:text-white">Features</a><a href="#about" className="hover:text-white">About Us</a><a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="hidden items-center gap-3 md:flex"><Link to="/login" className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white">Log in</Link><Link to="/register" className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-violet-600/20 hover:bg-violet-500">Get Started</Link></div>
          <button type="button" className="icon-button md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/[0.07] px-5 py-4 md:hidden"><div className="flex flex-col gap-4 text-sm text-gray-300"><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#about" onClick={() => setMenuOpen(false)}>About Us</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><Link to="/login">Log in</Link><Link to="/register" className="rounded-lg bg-violet-600 px-4 py-3 text-center font-semibold">Get Started</Link></div></div>}
      </nav>

      <main id="home">
        <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-44">
          <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/[0.09] blur-[120px]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs font-semibold text-violet-300"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" />Built for modern teams</div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">One Workspace.<br /><span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">Infinite Possibilities.</span></h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">Plan projects, manage tasks, collaborate with your team, and move every idea forward in one beautifully focused workspace.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/register" className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-bold shadow-xl shadow-violet-600/20 hover:bg-violet-500">Get Started Free <ArrowRight className="h-4 w-4" /></Link><a href="#features" className="rounded-xl border border-gray-700 bg-white/[0.025] px-6 py-3.5 text-sm font-semibold text-gray-200 hover:border-gray-600 hover:bg-white/[0.05]">Explore Features</a></div>
          </div>

          <div className="relative mx-auto mt-16 max-w-6xl rounded-2xl border border-white/[0.09] bg-[#11182A] p-2 shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:p-3">
            <div className="flex h-9 items-center gap-2 px-3"><span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" /></div>
            <div className="grid min-h-[380px] grid-cols-[150px_1fr] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0B1020] md:grid-cols-[190px_1fr]">
              <aside className="hidden border-r border-white/[0.06] p-4 sm:block"><div className="mb-7 flex items-center gap-2 text-xs font-bold"><div className="h-7 w-7 rounded-lg bg-violet-600" />CollabHub</div>{["Dashboard","Projects","My Tasks","Team","Messages"].map((item,index)=><div key={item} className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] ${index===1?"bg-violet-600 text-white":"text-gray-500"}`}><span className="h-3 w-3 rounded bg-current opacity-50" />{item}</div>)}</aside>
              <div className="p-4 sm:p-6"><div className="mb-5 flex items-center justify-between"><div><div className="h-3 w-28 rounded bg-white/80" /><div className="mt-2 h-2 w-44 rounded bg-white/10" /></div><div className="h-9 w-9 rounded-full bg-violet-500/30" /></div><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{["12","48","31","17"].map((num,index)=><div key={num} className="rounded-xl border border-white/[0.06] bg-[#151D30] p-3 md:p-4"><div className={`mb-5 h-7 w-7 rounded-lg ${index===0?"bg-violet-500/20":index===1?"bg-blue-500/20":index===2?"bg-emerald-500/20":"bg-amber-500/20"}`} /><div className="text-xl font-bold">{num}</div><div className="mt-1 h-1.5 w-16 rounded bg-white/10" /></div>)}</div><div className="mt-3 grid gap-3 md:grid-cols-[1.5fr_.7fr]"><div className="h-40 rounded-xl border border-white/[0.06] bg-[#151D30] p-4"><div className="mb-6 h-2.5 w-24 rounded bg-white/70" /><div className="flex h-24 items-end gap-2">{[35,52,45,68,58,82,74].map((height,index)=><div key={index} className="flex-1 rounded-t bg-violet-500/70" style={{height:`${height}%`}} />)}</div></div><div className="h-40 rounded-xl border border-white/[0.06] bg-[#151D30] p-4"><div className="h-2.5 w-20 rounded bg-white/70" /><div className="mt-5 space-y-3">{[1,2,3].map((item)=><div key={item} className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-white/[0.06]" /><div className="h-2 flex-1 rounded bg-white/10" /></div>)}</div></div></div></div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-white/[0.06] bg-white/[0.015] py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-400">Everything in one place</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Built for focused, high-performing teams</h2></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-white/[0.07] bg-[#151D30] p-6 transition hover:-translate-y-1 hover:border-violet-500/30"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-gray-400">{text}</p></article>)}</div></div>
        </section>

        <section id="about" className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid items-center gap-12 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-400">How it works</p><h2 className="mt-4 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">From idea to shipped work, effortlessly.</h2><p className="mt-5 max-w-lg leading-7 text-gray-400">A simple workflow gives every team the clarity to move faster without adding more process.</p></div><div className="grid gap-3 sm:grid-cols-2">{[{n:"01",title:"Create a Project",text:"Define the goal and organize the work."},{n:"02",title:"Invite Your Team",text:"Bring the right people into the workspace."},{n:"03",title:"Assign Tasks",text:"Turn plans into clear, owned actions."},{n:"04",title:"Track Progress",text:"Monitor momentum and remove blockers."}].map((step)=><div key={step.n} className="rounded-2xl border border-white/[0.07] bg-[#151D30] p-5"><span className="text-xs font-bold text-violet-400">{step.n}</span><h3 className="mt-4 font-bold">{step.title}</h3><p className="mt-2 text-sm text-gray-400">{step.text}</p></div>)}</div></div></div></section>

        <section className="px-5 pb-24 lg:px-8"><div className="mx-auto max-w-7xl rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-600/15 via-[#151D30] to-blue-600/10 p-8 sm:p-12"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">Why CollabHub</p><h2 className="mt-4 text-3xl font-bold">Less busywork. More meaningful progress.</h2><div className="mt-6 grid gap-3 text-sm text-gray-300 sm:grid-cols-2">{["Clean, distraction-free interface","Real project and team insights","Simple setup for every team","Secure account verification"].map((item)=><div key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-violet-400" />{item}</div>)}</div></div><Link to="/register" className="flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-violet-600 px-6 text-sm font-bold hover:bg-violet-500">Start for free <ArrowRight className="h-4 w-4" /></Link></div></div></section>
      </main>

      <footer id="contact" className="border-t border-white/[0.07]"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8"><Link to="/" className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-black">CH</div><span className="font-bold">CollabHub</span></Link><div className="flex flex-wrap gap-6 text-sm text-gray-500"><a href="#about" className="hover:text-white">About</a><a href="#features" className="hover:text-white">Features</a><a href="#contact" className="hover:text-white">Contact</a></div><p className="text-sm text-gray-600">© 2026 CollabHub</p></div></footer>
    </div>
  );
}

export default Landing;
