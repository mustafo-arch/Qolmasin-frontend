import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../../../components/public/navbar"
import Footer from "../../../components/public/Footer"

const categories = [
  {
    title: "Restoranlar",
    text: "Kun oxirida qolgan tayyor taomlarni yangi mijozlarga yetkazing.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Kafe va qahvaxonalar",
    text: "Yangi pishiriq va ichimliklarni foydali narxda taklif qiling.",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Nonvoyxonalar",
    text: "Har kuni yangi yopilgan non va shirinliklar o‘z xaridorini topsin.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85",
  },
]

const steps = [
  {
    number: "01",
    icon: Store,
    title: "Biznes taklif joylaydi",
    text: "Restoran, kafe yoki nonvoyxona sotilmay qolishi mumkin bo‘lgan mahsulotlarini tanlaydi va chegirmali narx belgilaydi.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Xaridor yaqinini topadi",
    text: "Siz xaritada atrofingizdagi mazali takliflarni ko‘rasiz, tarkibi va olib ketish vaqtini oldindan bilasiz.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Olib keting va tejang",
    text: "Buyurtmani ilovada tasdiqlab, belgilangan vaqtda olib keting. Mazali mahsulot ham, pulingiz ham isrof bo‘lmaydi.",
  },
]

const About = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5f0] text-slate-900">
      <Navbar />

      <main>
        <section className="mx-auto max-w-[1280px] px-5 pb-16 pt-10 sm:px-8 lg:px-10 lg:pb-24 lg:pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                <Leaf className="size-4" />
                Yaxshilik taomdan boshlanadi
              </div>
              <h1 className="max-w-2xl text-[clamp(2.9rem,6vw,5.6rem)] font-black leading-[0.95] tracking-[-0.065em] text-slate-900">
                Mazali mahsulotlar
                <span className="block text-emerald-800">qolib ketmasin.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 lg:text-xl">
                Qolmasin — restoran, kafe, nonvoyxona va boshqa oziq-ovqat bizneslarida qolib ketayotgan sifatli mahsulotlarni xaridorlarga chegirmali narxda taklif qiluvchi marketplace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/offers"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-[0_12px_24px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Takliflarni ko&apos;rish
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#qanday-ishlaydi"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-6 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800"
                >
                  Qanday ishlaydi?
                  <ChevronRight className="size-4" />
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2"><BadgeCheck className="size-5 text-emerald-700" /> Tekshirilgan bizneslar</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="size-5 text-emerald-700" /> Aniq olib ketish vaqti</span>
              </div>
            </div>

            <div className="relative min-h-[430px] sm:min-h-[500px]">
              <div className="absolute right-0 top-0 h-[72%] w-[78%] overflow-hidden rounded-[2rem] shadow-[0_24px_55px_rgba(15,23,42,0.15)]">
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1300&q=85"
                  alt="Restoranda tayyorlangan ovqatlar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 h-[57%] w-[60%] overflow-hidden rounded-[2rem] border-[10px] border-[#f7f5f0] shadow-[0_20px_40px_rgba(15,23,42,0.14)]">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
                  alt="Yangi sabzavotlardan tayyorlangan taom"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-8 right-0 rounded-2xl bg-[#0c6f56] px-5 py-4 text-white shadow-[0_16px_30px_rgba(12,111,86,0.3)] sm:right-4">
                <div className="text-3xl font-black tracking-tight">70% gacha</div>
                <div className="mt-1 text-sm text-emerald-50">tejamkor narxlar</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-white/45 py-12 lg:py-16">
          <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:grid-cols-3 sm:px-8 lg:px-10">
            <div className="flex items-start gap-4 border-b border-slate-200 pb-6 sm:border-b-0 sm:border-r sm:pb-0">
              <span className="rounded-xl bg-orange-100 p-3 text-orange-600"><Heart className="size-6" /></span>
              <div><strong className="block text-2xl font-black">Sifatli</strong><span className="text-sm text-slate-500">mahsulotlar isrof bo‘lmaydi</span></div>
            </div>
            <div className="flex items-start gap-4 border-b border-slate-200 pb-6 sm:border-b-0 sm:border-r sm:pb-0 sm:pl-6">
              <span className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><Users className="size-6" /></span>
              <div><strong className="block text-2xl font-black">Yaqin</strong><span className="text-sm text-slate-500">xaridor va bizneslar bir joyda</span></div>
            </div>
            <div className="flex items-start gap-4 sm:pl-6">
              <span className="rounded-xl bg-sky-100 p-3 text-sky-700"><Leaf className="size-6" /></span>
              <div><strong className="block text-2xl font-black">Yashil</strong><span className="text-sm text-slate-500">kelajak uchun kichik qadam</span></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Hamjamiyatimiz</p>
              <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Har bir biznesda<br /><span className="text-emerald-800">yaxshi imkoniyat bor.</span></h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-slate-500">Sevimli joyingizdagi yangi taomlarni tatib ko‘ring va mahalliy bizneslarni qo‘llab-quvvatlang.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <article key={category.title} className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white/70 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                <div className="h-56 overflow-hidden"><img src={category.image} alt={category.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-5"><h3 className="text-xl font-bold">{category.title}</h3><p className="mt-2 leading-6 text-slate-500">{category.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="qanday-ishlaydi" className="bg-[#0c6f56] px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-200">Oddiy va foydali</p><h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Qolmasin qanday ishlaydi?</h2><p className="mt-5 text-lg leading-8 text-emerald-50/80">Sotuvchi uchun qo‘shimcha daromad, xaridor uchun esa mazali topilma. Jarayon atigi uch qadamdan iborat.</p></div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step) => { const Icon = step.icon; return <div key={step.number} className="border-t border-white/20 pt-5"><div className="flex items-center justify-between"><span className="text-sm font-bold text-orange-200">{step.number}</span><Icon className="size-7 text-emerald-100" /></div><h3 className="mt-12 text-xl font-bold">{step.title}</h3><p className="mt-3 leading-7 text-emerald-50/75">{step.text}</p></div> })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid overflow-hidden rounded-[2rem] bg-[#f0e9dc] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-8 sm:p-12 lg:p-16"><p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Siz ham qo‘shiling</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">Bugungi yaxshi taom ertangi isrofga aylanmasin.</h2><p className="mt-5 max-w-lg leading-7 text-slate-600">Qolmasin bilan tejamkor xarid qiling, mahalliy bizneslarga yordam bering va birgalikda tabiatga e’tiborli hayot tarzini yarating.</p><Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-emerald-800">Boshlash <ArrowRight className="size-4" /></Link></div>
            <div className="relative min-h-[280px] overflow-hidden"><img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1100&q=85" alt="Rang-barang yangi mahsulotlar" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-emerald-900/10" /></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
