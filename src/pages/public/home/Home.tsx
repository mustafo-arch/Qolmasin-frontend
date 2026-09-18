import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../../features/auth/store"

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Yaqiningizni toping",
    text: "Atrofingizdagi restoran, kafe va do‘konlarda mavjud foydali takliflarni bir joyda ko‘ring.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Taklifni tanlang",
    text: "Mahsulot tarkibi, chegirmasi va olib ketish vaqtini ko‘rib, o‘zingizga mosini tanlang.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Kiring va olib keting",
    text: "Taklifni band qilish uchun akkauntga kiring, mahsulotni belgilangan vaqtda olib keting va isrofni kamaytiring.",
  },
]

const benefits = [
  { icon: Store, title: "Mahalliy bizneslar", text: "Qolib ketishi mumkin bo‘lgan mahsulotlardan qo‘shimcha daromad oling." },
  { icon: Users, title: "Yaxshi hamjamiyat", text: "Xaridor va sotuvchilar uchun ishonchli, qulay platformada birlashing." },
  { icon: Clock3, title: "Aniq vaqt", text: "Har bir taklifni belgilangan vaqtda olib, kuningizni oldindan rejalashtiring." },
]

const featuredOffers = [
  { business: "Samarqand nonvoyxonasi", title: "Aralash yangi nonlar", price: "18 000 so‘m", oldPrice: "35 000 so‘m", distance: "0.8 km", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=85" },
  { business: "Green Bowl", title: "Sabzavotli tushlik", price: "24 000 so‘m", oldPrice: "42 000 so‘m", distance: "1.2 km", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" },
  { business: "Coffee Corner", title: "Qahva va kruassan", price: "16 000 so‘m", oldPrice: "29 000 so‘m", distance: "1.6 km", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85" },
]

const testimonials = [
  { name: "Madina R.", role: "Qolmasin foydalanuvchisi", text: "Har kuni ishga ketayotib yangi non va qahvani ancha foydali narxda olaman. Taklifni oldindan band qilish juda qulay.", rating: "4.9" },
  { name: "Javohir S.", role: "Green Bowl hamkori", text: "Sotilmay qoladigan taomlarimiz endi isrof bo‘lmayapti. Yangi mijozlar ham ko‘paydi, jamoamizga juda mos xizmat.", rating: "5.0" },
  { name: "Aziza K.", role: "Qolmasin foydalanuvchisi", text: "Xaritadan yaqin joylarni topish oson. Mahsulot sifati va olib ketish vaqti haqida ma’lumotlar aniq ko‘rsatiladi.", rating: "4.8" },
]

const faqs = [
  { question: "Qolmasin orqali qanday xarid qilaman?", answer: "Takliflar bo‘limidan o‘zingizga mos mahsulotni tanlang, buyurtmani tasdiqlang va ko‘rsatilgan vaqtda hamkor biznesdan olib keting." },
  { question: "Mahsulotlar yangi bo‘ladimi?", answer: "Ha. Platformaga faqat sifatli va iste’molga yaroqli mahsulotlar joylanadi. Har bir taklifda olib ketish vaqti ko‘rsatiladi." },
  { question: "Biznesimni Qolmasinga qanday qo‘shaman?", answer: "Ro‘yxatdan o‘ting, biznes ma’lumotlarini kiriting va sotilmay qolishi mumkin bo‘lgan mahsulotlaringizni foydali narxda taklif qiling." },
]

const categories = [
  { name: "Non va pishiriqlar", count: "45+ taklif", icon: ShoppingBag, color: "bg-amber-100 text-amber-800" },
  { name: "Tayyor taomlar", count: "80+ taklif", icon: Store, color: "bg-emerald-100 text-emerald-800" },
  { name: "Kafe va ichimliklar", count: "35+ taklif", icon: Clock3, color: "bg-orange-100 text-orange-800" },
  { name: "Meva va sabzavotlar", count: "25+ taklif", icon: Leaf, color: "bg-green-100 text-green-800" },
]

const Home = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-slate-900">
      <div className="mx-auto max-w-[1280px] px-3 pb-10 pt-0 sm:px-5 lg:px-8 xl:max-w-[1340px]">


        <main
          id="home"
          className="glass-panel relative mt-5 overflow-hidden rounded-[2rem] px-5 py-6 sm:px-8 lg:mt-5 lg:px-9 lg:py-8 xl:mt-6 xl:px-10 xl:py-9"
        >
          <div className="hero-dot-grid absolute inset-0 opacity-80" aria-hidden="true" />

          <div className="relative grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:gap-8 xl:grid-cols-[1fr_1fr] xl:gap-10">
            <section className="min-w-0 py-2 lg:py-4 xl:py-6">
              <div className="glass-control mb-7 inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-sm">
                <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <Leaf className="size-3.5" strokeWidth={2.2} />
                </span>
                <span className="text-[15px] font-medium text-emerald-800">
                  Bugun 240+ yangi taklif
                </span>
              </div>

              <h1 className="max-w-[620px] text-[clamp(3.1rem,4.8vw,5.8rem)] font-black leading-[0.94] tracking-[-0.07em] text-slate-900">
                Yaxshi mahsulot
                <span className="block text-emerald-800">isrof bo‘lmasin.</span>
              </h1>

              <p className="mt-6 max-w-[560px] text-[clamp(1.08rem,1.3vw,1.25rem)] leading-[1.45] text-slate-600 lg:mt-6">
                Yaqiningizdagi nonvoyxona, do‘kon va kafelardagi sifatli mahsulotlarni 70% gacha arzonroq toping.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/offers"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-[0_12px_24px_rgba(249,115,22,0.35)] transition hover:bg-orange-400 sm:w-auto"
                >
                  Bugungi takliflarni ko&apos;rish
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </Link>

                <a
                  href="#qanday-ishlaydi"
                  className="glass-control inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-white/70 sm:w-auto"
                >
                  Qanday ishlaydi?
                </a>
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
                  Aniq olib ketish vaqti
                </div>
              </div>
            </section>

            <section className="grid min-w-0 gap-5 lg:justify-end">
              <div className="glass-panel overflow-hidden rounded-[2rem] bg-[#dfe2d4]/70">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
                  alt="Bread and pastry product"
                  className="h-[280px] w-full object-cover object-center sm:h-[330px] lg:h-[350px] xl:h-[390px]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="glass-panel overflow-hidden rounded-[2rem] bg-[#f8f5ee]/70">
                  <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80"
                    alt="Fresh pastry meal"
                    className="h-[210px] w-full object-cover object-center sm:h-[230px] lg:h-[210px] xl:h-[230px]"
                  />
                </div>

                <div className="flex min-h-[210px] flex-col justify-between rounded-[2rem] bg-[#0c6f56] p-5 text-white shadow-[0_20px_28px_rgba(12,111,86,0.35)] sm:p-6 lg:min-h-[210px] xl:min-h-[230px]">
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                      <ShoppingBag className="size-7" strokeWidth={2.4} />
                    </span>
                    <Sparkles className="size-6 text-white/80" />
                  </div>

                  <div>
                    <div className="text-[clamp(3.2rem,4vw,4.5rem)] font-black tracking-[-0.07em] leading-none">-70%</div>
                    <p className="mt-2 text-base text-emerald-50/90">gacha foydali narxlar</p>
                  </div>

                  <a
                    href="#qanday-ishlaydi"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/15"
                  >
                    Qanday ishlaydi?
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        <section className="mt-5 rounded-[2rem] bg-white/75 px-6 pt-[50px] pb-[50px] shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:px-[50px] lg:flex lg:items-center lg:justify-between lg:gap-10" aria-labelledby="guest-start-title">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Mehmon sifatida boshlang</p>
            <h2 id="guest-start-title" className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">Avval takliflarni ko‘ring, keyin tanlang.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Ro‘yxatdan o‘tmasdan ham mahsulotlar, narxlar va yaqin bizneslarni ko‘rishingiz mumkin. Band qilish vaqtida akkaunt kerak bo‘ladi.</p>
          </div>
          <div className="mt-6 flex shrink-0 flex-col gap-4 sm:flex-row sm:gap-5 lg:mt-0">
            <Link to="/offers" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white transition hover:bg-orange-400">Takliflarni ko‘rish <ArrowRight className="size-4" /></Link>
            <Link to="/businesses" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800">Bizneslarni ko‘rish</Link>
          </div>
        </section>

        <section className="py-12 lg:py-16" aria-labelledby="categories-title">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Kategoriyalar</p>
              <h2 id="categories-title" className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                O‘zingizga ma’qul <span className="text-emerald-800">yo‘nalishni tanlang.</span>
              </h2>
            </div>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 font-bold text-emerald-800 transition hover:text-orange-600"
            >
              Barcha kategoriyalar <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Link
                  key={category.name}
                  to="/offers"
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${category.color}`}>
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-800">{category.name}</h3>
                    <span className="text-xs text-slate-500">{category.count}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="pb-16 lg:pb-24" aria-labelledby="offers-title">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Tanlangan takliflar</p>
              <h2 id="offers-title" className="text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                Bugun tejash uchun <span className="text-emerald-800">3 sabab.</span>
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="hidden max-w-sm leading-7 text-slate-600 sm:block">
                Yaqin bizneslardan yangi, mazali va hamyonbop mahsulotlarni bir joyda toping.
              </p>
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-bold text-emerald-800 transition hover:text-orange-600"
              >
                Barchasi <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {featuredOffers.map((offer) => (
              <article
                key={offer.title}
                className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.11)]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white">
                    -40% gacha
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{offer.business}</span>
                    <span className="inline-flex items-center gap-1 text-emerald-700">
                      <MapPin className="size-3.5" />
                      {offer.distance}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{offer.title}</h3>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <strong className="text-lg font-black text-emerald-800">{offer.price}</strong>
                      <span className="ml-2 text-sm text-slate-400 line-through">{offer.oldPrice}</span>
                    </div>
                    <Link
                      to="/offers"
                      aria-label={`${offer.title} taklifini ko‘rish`}
                      className="grid size-10 place-items-center rounded-full bg-emerald-50 text-emerald-800 transition hover:bg-emerald-800 hover:text-white"
                    >
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-6 sm:flex-row sm:px-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Takliflarni band qilish uchun tizimga kiring</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Ro‘yxatdan o‘tmasdan ham barcha takliflarni ko‘rishingiz mumkin. Buyurtma berish uchun akkaunt kerak bo‘ladi.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  to="/login"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-emerald-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  Ro‘yxatdan o‘tish
                </Link>
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:py-24">
          <div className="relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[#dcebe3] shadow-[0_18px_35px_rgba(15,23,42,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1300&q=85"
              alt="Yangi va rang-barang oziq-ovqat mahsulotlari"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#092f27]/80 via-[#092f27]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-lg p-7 text-white sm:p-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur-sm"><Leaf className="size-4 text-orange-200" /> Yaxshi mahsulot, yaxshi tanlov</div>
              <h2 className="text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">Har bir taomning o‘z xaridori bor.</h2>
              <p className="mt-3 leading-7 text-emerald-50/85">Qolmasin sifatli mahsulotlarni isrof bo‘lishidan oldin sizga yetkazadi.</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] bg-white/70 p-7 shadow-[0_18px_35px_rgba(15,23,42,0.06)] sm:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Bizning maqsadimiz</p>
              <h2 className="mt-4 text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl">Isrofni kamaytirib, imkoniyatni ko‘paytirish.</h2>
              <p className="mt-5 leading-7 text-slate-600">Restoran va do‘konlardagi sotilmay qolishi mumkin bo‘lgan mahsulotlar endi yangi xaridorlarni topadi. Siz tejaysiz, biznes yutadi, tabiat esa nafas oladi.</p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
              <div><strong className="block text-2xl font-black text-emerald-800 sm:text-3xl">70%</strong><span className="mt-1 block text-xs leading-5 text-slate-500">gacha chegirma</span></div>
              <div><strong className="block text-2xl font-black text-emerald-800 sm:text-3xl">24/7</strong><span className="mt-1 block text-xs leading-5 text-slate-500">qulay qidiruv</span></div>
              <div><strong className="block text-2xl font-black text-emerald-800 sm:text-3xl">1 ta</strong><span className="mt-1 block text-xs leading-5 text-slate-500">yaxshi tanlov</span></div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" aria-labelledby="reviews-title">
          <div className="mx-auto max-w-2xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Hamjamiyat fikri</p><h2 id="reviews-title" className="text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Yaxshi tanlovni ular ham <span className="text-emerald-800">his qilishdi.</span></h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[1.7rem] bg-white/75 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)]"><div className="flex items-center justify-between"><div className="flex gap-1 text-orange-500">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div><span className="font-bold text-emerald-800">{testimonial.rating}</span></div><p className="mt-6 leading-7 text-slate-600">“{testimonial.text}”</p><div className="mt-7 border-t border-slate-200 pt-4"><p className="font-bold">{testimonial.name}</p><p className="mt-1 text-sm text-slate-500">{testimonial.role}</p></div></article>
            ))}
          </div>
        </section>

        <section className="relative py-16 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Qolmasin bilan</p>
            <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Har bir ortiqcha mahsulotda <span className="text-emerald-800">yangi imkoniyat bor.</span></h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Biz xaridorlarga foydali narxlarni, bizneslarga esa yangi mijozlarni taqdim etamiz. Natijada yaxshi mahsulot o‘z egasini topadi.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <article key={benefit.title} className="rounded-[1.7rem] border border-slate-200 bg-white/70 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.1)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700"><Icon className="size-6" /></span>
                  <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-slate-500">{benefit.text}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="qanday-ishlaydi" className="overflow-hidden rounded-[2rem] bg-[#0f765f] px-6 py-14 text-white shadow-[0_20px_40px_rgba(15,118,95,0.18)] sm:px-10 lg:px-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-200">Juda oson</p>
              <h2 className="text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Qolmasin qanday ishlaydi?</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-emerald-50/75">Bir necha qadamda sevimli joyingizdagi foydali taklifni toping va olib keting.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="border-t border-white/20 pt-5">
                    <div className="flex items-center justify-between"><span className="text-sm font-bold text-orange-200">{step.number}</span><Icon className="size-6 text-emerald-100" /></div>
                    <h3 className="mt-9 text-xl font-bold">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-emerald-50/70">{step.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="rounded-[2rem] bg-[#f0e9dc] p-7 sm:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/70 text-orange-600"><ShoppingBag className="size-6" /></span>
            <h2 className="mt-8 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Xaridorlar uchun</h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">Sifatli taomlarni 70% gacha chegirma bilan toping. Yangi joylarni kashf qiling, pulingizni tejang va isrofni kamaytirishga hissa qo‘shing.</p>
            <Link to="/offers" className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 transition hover:text-orange-600">Takliflarni ko‘rish <ArrowRight className="size-4" /></Link>
          </div>
          <div className="rounded-[2rem] bg-[#dcebe3] p-7 sm:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/70 text-emerald-700"><Store className="size-6" /></span>
            <h2 className="mt-8 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Bizneslar uchun</h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">Sotilmay qolishi mumkin bo‘lgan mahsulotlarni yangi mijozlarga taklif qiling. Daromadni oshiring va brendingizni ko‘proq insonlarga taniting.</p>
            <Link to="/register" className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 transition hover:text-orange-600">Biznes sifatida qo‘shilish <ArrowRight className="size-4" /></Link>
          </div>
        </section>

        <section className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-24" aria-labelledby="faq-title">
          <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Ko‘p so‘raladi</p><h2 id="faq-title" className="text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">Qolmasin haqida <span className="text-emerald-800">savollar.</span></h2><p className="mt-5 max-w-md leading-7 text-slate-600">Xizmatimiz va takliflar haqida eng kerakli javoblarni shu yerdan toping.</p><Link to="/boglanish" className="mt-7 inline-flex items-center gap-2 font-bold text-emerald-800 transition hover:text-orange-600">Yana savolingiz bormi? <ArrowRight className="size-4" /></Link></div>
          <div className="divide-y divide-slate-200 rounded-[1.7rem] bg-white/70 px-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:px-8">
            {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-bold marker:hidden [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown className="size-5 shrink-0 text-emerald-700 transition group-open:rotate-180" /></summary><p className="max-w-2xl pt-3 leading-7 text-slate-600">{faq.answer}</p></details>)}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] bg-[#0c6f56] px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute -right-10 -top-24 size-64 rounded-full border border-orange-300/20" />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">Bugun boshlang</p><h2 className="max-w-2xl text-3xl font-black tracking-[-0.05em] sm:text-5xl">Yaxshi mahsulotlar sizni kutmoqda.</h2><p className="mt-4 max-w-xl leading-7 text-slate-300">Qolmasin hamjamiyatiga qo‘shiling va har bir xaridni foydali tanlovga aylantiring.</p></div>
            <Link to="/offers" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-400 px-6 py-4 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-orange-300">Takliflarni topish <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home