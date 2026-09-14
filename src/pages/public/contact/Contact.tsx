import { useState, type FormEvent } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../../../components/public/navbar"
import Footer from "../../../components/public/Footer"

const Contact = () => {
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
    setIsSent(true)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5f0] text-slate-900">
      <Navbar />

      <main>
        <section className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-12 sm:px-8 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -right-20 top-10 size-72 rounded-full bg-orange-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-emerald-200/30 blur-3xl" />

          <div className="relative grid items-end gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                <Leaf className="size-4" />
                Biz sizni tinglashga tayyormiz
              </div>
              <h1 className="max-w-3xl text-[clamp(3rem,7vw,6.7rem)] font-black leading-[0.92] tracking-[-0.07em]">
                Keling, birga
                <span className="block text-emerald-800">yaxshilik qilaylik.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                Savolingiz, taklifingiz yoki hamkorlik g‘oyangiz bormi? Biz bilan bog‘laning — har bir fikr Qolmasinni yanada foydali qilishga yordam beradi.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#murojaat" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white shadow-[0_12px_24px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-400">
                  Murojaat qoldirish
                  <ArrowRight className="size-4" />
                </a>
                <Link to="/batafsil" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/60 px-6 py-4 font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800">
                  Biz haqimizda
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#0c6f56] p-7 text-white shadow-[0_24px_50px_rgba(12,111,86,0.22)] sm:p-9">
              <Sparkles className="absolute right-7 top-7 size-7 text-orange-200/80" />
              <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10"><MessageCircle className="size-7 text-orange-200" /></div>
              <p className="mt-12 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">Sizning g‘oyangiz biz uchun muhim.</p>
              <p className="mt-5 leading-7 text-emerald-50/75">Yaxshi xizmat tinglashdan boshlanadi. Biz har bir murojaatni e’tibor bilan ko‘rib chiqamiz.</p>
              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5 text-sm text-emerald-50/75"><span className="grid size-9 place-items-center rounded-full bg-orange-300 text-[#092f27]"><Leaf className="size-4" /></span> IT Center startapchilari tomonidan yaratilgan</div>
            </div>
          </div>
        </section>

        <section id="murojaat" className="border-y border-slate-200/80 bg-white/55 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Aloqa ma’lumotlari</p>
              <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Bizga yozing.</h2>
              <p className="mt-5 leading-7 text-slate-600">Sizga qanday website kerak bo‘lsa, qo‘limizdan kelgancha yordam berishga harakat qilamiz.</p>
              <div className="mt-8 grid gap-4">
                <a href="mailto:salom@qolmasin.uz" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5"><span className="grid size-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Mail className="size-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email</span><span className="font-semibold text-slate-700">salom@qolmasin.uz</span></span></a>
                <a href="https://t.me" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-900/5"><span className="grid size-11 place-items-center rounded-xl bg-sky-100 text-sky-700"><Send className="size-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Telegram</span><span className="font-semibold text-slate-700">Biz bilan tez bog‘laning</span></span></a>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4"><span className="grid size-11 place-items-center rounded-xl bg-orange-100 text-orange-600"><MapPin className="size-5" /></span><span><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Manzil</span><span className="font-semibold text-slate-700">Toshkent, O‘zbekiston</span></span></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[2rem] bg-[#0c6f56] p-6 text-white shadow-[0_20px_45px_rgba(12,111,86,0.2)] sm:p-9">
              <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-bold">Murojaat qoldiring</h3><p className="mt-2 text-sm leading-6 text-emerald-50/75">Jamoamiz siz bilan imkon qadar tez bog‘lanadi.</p></div><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-orange-200"><Send className="size-5" /></span></div>
              {isSent ? (
                <div className="mt-8 rounded-2xl border border-emerald-200/20 bg-white/10 p-5"><CheckCircle2 className="size-7 text-orange-200" /><p className="mt-3 font-semibold">Murojaatingiz qabul qilindi.</p><p className="mt-1 text-sm leading-6 text-emerald-50/75">E’tiboringiz uchun rahmat. Tez orada siz bilan bog‘lanamiz.</p></div>
              ) : (
                <div className="mt-7 grid gap-4"><label className="grid gap-2 text-sm font-medium text-emerald-50"><span>Ismingiz</span><input required name="name" placeholder="Ismingizni kiriting" className="h-12 rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none placeholder:text-emerald-100/45 focus:border-orange-200 focus:ring-2 focus:ring-orange-200/20" /></label><label className="grid gap-2 text-sm font-medium text-emerald-50"><span>Email yoki telefon</span><input required name="contact" placeholder="Siz bilan qanday bog‘lanamiz?" className="h-12 rounded-xl border border-white/15 bg-white/10 px-4 text-white outline-none placeholder:text-emerald-100/45 focus:border-orange-200 focus:ring-2 focus:ring-orange-200/20" /></label><label className="grid gap-2 text-sm font-medium text-emerald-50"><span>Xabaringiz</span><textarea required name="message" rows={5} placeholder="Savol yoki taklifingizni yozing..." className="resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-emerald-100/45 focus:border-orange-200 focus:ring-2 focus:ring-orange-200/20" /></label><button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-400 px-5 py-3.5 font-bold text-[#092f27] transition hover:-translate-y-0.5 hover:bg-orange-300">Xabar yuborish <Send className="size-4" /></button></div>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
