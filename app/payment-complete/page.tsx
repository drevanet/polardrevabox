
export default function Activated() {
  return (
    <div className="w-full min-h-screen bg-[#f5f5f0] text-slate-950 flex items-center justify-center">
      <section className="w-full max-w-5xl mx-auto text-center py-20 px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-200">

          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 max-w-2xl mx-auto">

            <h2 className="font-serif text-xl font-extrabold sm:text-2xl mb-4">
              Your Betisports payment has been received and your subscription will be
              activated within 5 minutes.
            </h2>

            <p className="font-serif text-slate-700 mb-8 max-w-md mx-auto text-[20px]">
              For quick activation, send Hi to us on WhatsApp to be activated
              in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://wa.me/447541095459"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-poppins w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-200 text-center"
              >
                CLICK TO CHAT US
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
