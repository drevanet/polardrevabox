
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!supportEmail) {
      setError(
        "Contact form is not configured yet. Please try again later."
      );
      return;
    }

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:${supportEmail}?subject=${mailSubject}&body=${mailBody}`;
  }

  return (
    <main className="min-h-screen bg-[#0b0b12] text-white selection:bg-[#7557f6]/40">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#7557f6]/10 blur-[130px]" />
        <div className="absolute right-0 top-[45%] h-[350px] w-[350px] rounded-full bg-violet-700/10 blur-[120px]" />
      </div>

    

      {/* Main content */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">

        {/* Page heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7557f6]/30 bg-[#7557f6]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a995ff]">
            <MessageCircle className="h-4 w-4" />
            We're here to help
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Need Help?
            <span className="block text-[#927bff]">
              Contact Us
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
            Have a question about RevaBox, need help with your projects,
            or experiencing an issue? Send us a message and we'll be happy
            to help.
          </p>

        </div>

        {/* Contact layout */}
        <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Left information panel */}
          <div className="flex flex-col gap-5">

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 sm:p-8">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7557f6]/15">
                <Mail className="h-6 w-6 text-[#a995ff]" />
              </div>

              <h2 className="text-xl font-bold">
                Get in touch
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Send us your questions, feedback, or suggestions.
                Our support team is ready to assist you.
              </p>

              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Support
                </p>

                <p className="mt-2 text-sm font-medium text-white">
                  RevaBox Customer Support
                </p>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  For account, subscription, payment, project, and
                  download-related enquiries, use the contact form.
                </p>
              </div>

            </div>

            <div className="rounded-3xl border border-[#7557f6]/20 bg-gradient-to-br from-[#7557f6]/20 to-[#7557f6]/[0.04] p-7 sm:p-8">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#7557f6]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <h3 className="text-lg font-bold">
                Designed with RevaBox?
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Jump back into the editor and continue creating
                beautiful 3D packaging designs.
              </p>

              <Link
                href="/editor"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a995ff] transition hover:text-white"
              >
                Open the editor
                <ArrowUpRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#11111b] p-6 shadow-2xl shadow-black/20 sm:p-9">

            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Send us a message
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Fill in the details below and tell us how we can help.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Your name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#7557f6] focus:ring-2 focus:ring-[#7557f6]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#7557f6] focus:ring-2 focus:ring-[#7557f6]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#7557f6] focus:ring-2 focus:ring-[#7557f6]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-300"
                >
                  Your message
                </label>

                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b12] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[#7557f6] focus:ring-2 focus:ring-[#7557f6]/20"
                />
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7557f6] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#7557f6]/20 transition hover:-translate-y-0.5 hover:bg-[#6545ed] hover:shadow-[#7557f6]/30"
              >
                Send message
                <Send className="h-4 w-4" />
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
           
              </p>

            </form>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:px-8 sm:text-left">

          <Link href="/" className="text-lg font-black tracking-tight">
            Reva<span className="text-[#927bff]">Box</span>
          </Link>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} RevaBox. All rights reserved.
          </p>

          <Link
            href="/"
            className="text-xs font-medium text-slate-400 transition hover:text-white"
          >
            Back to home
          </Link>

        </div>
      </footer>

    </main>
  );
}
