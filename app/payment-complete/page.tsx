
export default function Activated() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 flex items-center justify-center px-4 py-8 sm:px-5 sm:py-12 font-sans text-slate-900">
      <section className="w-full max-w-xl">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-slate-100 bg-white px-5 py-8 sm:px-12 sm:py-14 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-100/60 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-rose-100/60 blur-3xl" />

          <div className="relative z-10">

            {/* Success icon */}
            <div className="mx-auto mb-5 sm:mb-7 flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-50 ring-4 sm:ring-8 ring-green-50/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="h-7 w-7 sm:h-10 sm:w-10 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </div>

            <p className="mb-2 sm:mb-3 text-[10px] sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-green-600">
              Payment successful
            </p>

            <h1 className="mb-3 sm:mb-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Payment Received!
            </h1>

            <p className="mx-auto mb-7 sm:mb-9 max-w-md text-sm sm:text-lg leading-6 sm:leading-7 text-slate-500">
              Your subscription payment has been received.
              Send us a quick message on WhatsApp to get activated in seconds.
            </p>

            <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-6">
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-slate-600">
                Click the button below to send us Hi.
              </p>

              <a
                href="https://wa.me/447541095459?text=Hi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-[#25D366] px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fbd5b] hover:shadow-xl sm:min-w-[260px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.47 0 .12 5.35.12 11.92c0 2.1.55 4.16 1.6 5.98L0 24l6.26-1.64a11.9 11.9 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.92a11.84 11.84 0 0 0-3.45-8.43ZM12.05 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.62-.23-.37a9.88 9.88 0 0 1-1.52-5.27c0-5.46 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.02c0 5.46-4.45 9.91-9.91 9.91Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                </svg>
                SEND HI ON WHATSAPP
              </a>
            </div>

            <p className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-medium tracking-wide text-slate-400">
              THANK YOU FOR CHOOSING BETISPORTS
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}
