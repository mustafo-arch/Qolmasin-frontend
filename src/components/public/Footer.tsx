import {
  ArrowUpRight,
  Camera,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Send,
} from "lucide-react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer id="contact" className="overflow-hidden bg-[#092f27] text-white">
      <div className="relative mx-auto max-w-[1280px] px-5 pb-8 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border border-emerald-300/10" />
        <div className="pointer-events-none absolute -right-8 -top-12 size-48 rounded-full border border-orange-200/10" />

        <div className="relative grid gap-10 border-b border-white/15 pb-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-200/10 px-3 py-2 text-sm font-medium text-emerald-100">
              <Leaf className="size-4" />
              Yaxshi taom, yaxshi odat
            </div>
            <h2 className="max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Mazali narsalar
              <span className="block text-orange-300">qolib ketmasin.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-emerald-100/70 sm:text-lg">
              Qolmasin bilan yaqin atrofdagi sevimli bizneslardan sifatli mahsulotlarni foydali narxda toping va isrofni birga kamaytiring.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <Link
              to="/offers"
              className="group inline-flex items-center gap-3 rounded-2xl bg-orange-400 px-5 py-4 font-bold text-[#092f27] shadow-[0_12px_30px_rgba(251,146,60,0.2)] transition hover:-translate-y-1 hover:bg-orange-300"
            >
              Takliflarni ko&apos;rish
              <span className="grid size-8 place-items-center rounded-full bg-[#092f27]/10 transition group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative grid gap-12 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Qolmasin bosh sahifasi">
              <span className="grid size-10 place-items-center rounded-full bg-orange-300 text-[#092f27]">
                <Leaf className="size-5" strokeWidth={2.6} />
              </span>
              <span className="text-2xl font-black tracking-tight">Qol<span className="text-orange-300">masin</span></span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-emerald-100/60">
              Har bir ortiqcha mahsulot uchun yangi imkoniyat. Har bir xarid uchun foydali tanlov.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a href="https://instagram.com" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/15 text-emerald-100 transition hover:border-orange-300 hover:bg-orange-300 hover:text-[#092f27]"><Camera className="size-4" /></a>
              <a href="mailto:salom@qolmasin.uz" aria-label="Email yuborish" className="grid size-10 place-items-center rounded-full border border-white/15 text-emerald-100 transition hover:border-orange-300 hover:bg-orange-300 hover:text-[#092f27]"><Mail className="size-4" /></a>
              <a href="https://t.me" aria-label="Telegram" className="grid size-10 place-items-center rounded-full border border-white/15 text-emerald-100 transition hover:border-orange-300 hover:bg-orange-300 hover:text-[#092f27]"><Send className="size-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-orange-200">Qolmasin</h3>
            <div className="mt-5 grid gap-3 text-sm text-emerald-100/65">
              <Link to="/" className="transition hover:text-white">Bosh sahifa</Link>
              <Link to="/batafsil" className="transition hover:text-white">Batafsil</Link>
              <Link to="/offers" className="transition hover:text-white">Takliflar</Link>
              <Link to="/businesses" className="transition hover:text-white">Bizneslar</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-orange-200">Hamkorlik</h3>
            <div className="mt-5 grid gap-3 text-sm text-emerald-100/65">
              <Link to="/register" className="transition hover:text-white">Biznes sifatida qo&apos;shilish</Link>
              <Link to="/batafsil#qanday-ishlaydi" className="transition hover:text-white">Qanday ishlaydi?</Link>
              <Link to="/login" className="transition hover:text-white">Hisobga kirish</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-orange-200">Aloqa</h3>
            <div className="mt-5 grid gap-4 text-sm text-emerald-100/65">
              <a href="mailto:salom@qolmasin.uz" className="flex items-start gap-3 transition hover:text-white"><Mail className="mt-0.5 size-4 shrink-0 text-orange-300" /> salom@qolmasin.uz</a>
              <span className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-orange-300" /> Toshkent, O&apos;zbekiston</span>
              <span className="flex items-start gap-3"><Heart className="mt-0.5 size-4 shrink-0 text-orange-300" /> Isrofga qarshi birga</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-3 pt-6 text-xs text-emerald-100/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Qolmasin. Barcha huquqlar himoyalangan.</span>
          <span>Yaxshilik taomdan boshlanadi.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
