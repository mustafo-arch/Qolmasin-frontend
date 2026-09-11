import { ArrowRight, BadgeCheck, CheckCircle2, Leaf, ShoppingBag, Sparkles } from "lucide-react"
import Navbar from "../../../components/public/navbar"

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7f5f0] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-3 pb-10 pt-0 sm:px-5 lg:px-8">
        <Navbar />

          <main
          id="home"
            className="glass-panel relative mt-5 overflow-hidden rounded-[2rem] px-5 py-6 sm:px-8 lg:px-10 lg:py-9 xl:mt-6"
        >
          <div className="hero-dot-grid absolute inset-0 opacity-80" aria-hidden="true" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:gap-12">
            <section className="min-w-0 py-2 lg:py-5 xl:py-8">
              <div className="glass-control mb-7 inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Leaf className="size-3.5" strokeWidth={2.2} />
                </span>
                <span className="text-[15px] font-medium text-emerald-800">
                  Bugun 240+ yangi taklif
                </span>
              </div>

              <h1 className="max-w-[680px] text-[clamp(3.1rem,5.2vw,6.6rem)] font-black leading-[0.94] tracking-[-0.07em] text-slate-900">
                Yaxshi mahsulot
                <span className="block text-emerald-800">isrof bo&apos;lmasin.</span>
              </h1>

              <p className="mt-6 max-w-[600px] text-[clamp(1.08rem,1.45vw,1.35rem)] leading-[1.45] text-slate-600 lg:mt-7">
                Yaqinishingizdagi nonvoyxona, do&apos;kon va kafelardagi sifatli mahsulotlarni 70% gacha arzonroq toping.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(249,115,22,0.35)] transition hover:bg-orange-400 sm:w-auto"
                >
                  Bugungi takliflarni ko&apos;rish
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </button>

                <button
                  type="button"
                  className="glass-control inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-white/70 sm:w-auto"
                >
                  Qanday ishlaydi?
                </button>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-slate-700 sm:text-base">
                <div className="inline-flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded-full border border-slate-300 bg-white">
                    <CheckCircle2 className="size-4 text-emerald-700" strokeWidth={2.3} />
                  </span>
                  Tekshirilgan sotuvchilar
                </div>
                <div className="inline-flex items-center gap-2.5">
                  <span className="flex size-6 items-center justify-center rounded-full border border-slate-300 bg-white">
                    <BadgeCheck className="size-4 text-emerald-700" strokeWidth={2.3} />
                  </span>
                  Tez yetkazib berish
                </div>
              </div>
            </section>

            <section className="grid min-w-0 gap-5 lg:justify-end lg:pt-2">
              <div className="glass-panel overflow-hidden rounded-[2rem] bg-[#dfe2d4]/70">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
                  alt="Bread and pastry product"
                  className="h-[280px] w-full object-cover object-center sm:h-[330px] lg:h-[360px] xl:h-[410px]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="glass-panel overflow-hidden rounded-[2rem] bg-[#f8f5ee]/70">
                  <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80"
                    alt="Fresh pastry meal"
                    className="h-[210px] w-full object-cover object-center sm:h-[230px] lg:h-[220px] xl:h-[250px]"
                  />
                </div>

                <div className="flex min-h-[210px] flex-col justify-between rounded-[2rem] bg-[#0c6f56] p-5 text-white shadow-[0_20px_28px_rgba(12,111,86,0.35)] sm:p-6 lg:min-h-[220px] xl:min-h-[250px]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                      <ShoppingBag className="size-7" strokeWidth={2.4} />
                    </span>
                    <Sparkles className="size-6 text-white/80" />
                  </div>

                  <div>
                    <div className="text-[clamp(3.2rem,4.5vw,5rem)] font-black tracking-[-0.07em] leading-none">-70%</div>
                    <p className="mt-2 text-base text-emerald-50/90">gacha foydali narxlar</p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    Edit with
                    <span className="font-semibold">Lovable</span>
                    <span className="text-lg">×</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home