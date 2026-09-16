import { ArrowRight, Clock3, Leaf, MapPin, Search, ShoppingBag, Star } from "lucide-react"
import { Link } from "react-router-dom"
import Navbar from "../../../components/public/navbar"
import Footer from "../../../components/public/Footer"

const offers = [
  { title: "Aralash yangi nonlar", business: "Samarqand nonvoyxonasi", category: "Non va pishiriqlar", price: "18 000 so‘m", oldPrice: "35 000 so‘m", time: "18:00 gacha", distance: "0.8 km", rating: "4.9", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=85" },
  { title: "Sabzavotli tushlik", business: "Green Bowl", category: "Tayyor taomlar", price: "24 000 so‘m", oldPrice: "42 000 so‘m", time: "20:30 gacha", distance: "1.2 km", rating: "4.8", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85" },
  { title: "Qahva va kruassan", business: "Coffee Corner", category: "Ichimliklar", price: "16 000 so‘m", oldPrice: "29 000 so‘m", time: "19:00 gacha", distance: "1.6 km", rating: "4.7", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85" },
  { title: "Mevali vitamin qutisi", business: "Fresh Market", category: "Meva va sabzavotlar", price: "21 000 so‘m", oldPrice: "39 000 so‘m", time: "21:00 gacha", distance: "2.1 km", rating: "4.9", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=85" },
  { title: "Uy shirinliklari", business: "Mehr Bakery", category: "Non va pishiriqlar", price: "27 000 so‘m", oldPrice: "48 000 so‘m", time: "17:30 gacha", distance: "2.4 km", rating: "5.0", image: "https://images.unsplash.com/photo-1551024506-0BCCd828d307?auto=format&fit=crop&w=1000&q=85" },
  { title: "Oilaviy kechki ovqat", business: "Mazali Dasturxon", category: "Tayyor taomlar", price: "39 000 so‘m", oldPrice: "68 000 so‘m", time: "22:00 gacha", distance: "3.0 km", rating: "4.8", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85" },
]

const categories = ["Barchasi", "Non va pishiriqlar", "Tayyor taomlar", "Meva va sabzavotlar", "Ichimliklar"]

const Offers = () => (
  <div className="min-h-screen bg-[#f7f5f0] text-slate-900">
    <Navbar />
    <main className="mx-auto max-w-[1280px] px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pt-20">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#0c6f56] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="absolute -right-20 -top-24 size-80 rounded-full border border-white/10" />
        <div className="relative max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold"><Leaf className="size-4 text-orange-200" /> Bugungi yangi takliflar</div><h1 className="text-5xl font-black leading-[0.95] tracking-[-0.065em] sm:text-7xl">Yaxshi mahsulotni <span className="text-orange-300">yaqiningizdan</span> toping.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-emerald-50/80">Mahalliy restoran, kafe va do‘konlardagi sifatli mahsulotlarni 70% gacha foydali narxda tanlang.</p></div>
      </section>

      <section className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md"><Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input aria-label="Taklif qidirish" placeholder="Mahsulot yoki biznes qidiring" className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-5 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10" /></div>
        <div className="flex gap-2 overflow-x-auto pb-1">{categories.map((category, index) => <button key={category} type="button" className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${index === 0 ? "bg-emerald-800 text-white" : "bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"}`}>{category}</button>)}</div>
      </section>

      <section className="mt-10" aria-labelledby="offers-heading"><div className="flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Yaqin atrofda</p><h2 id="offers-heading" className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Bugungi takliflar</h2></div><span className="text-sm text-slate-500">{offers.length} ta natija</span></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{offers.map((offer) => <article key={offer.title} className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.11)]"><div className="relative h-56 overflow-hidden"><img src={offer.image} alt={offer.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white">-40% gacha</span><span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-bold text-slate-700"><Star className="size-3.5 fill-orange-400 text-orange-400" /> {offer.rating}</span></div><div className="p-5"><div className="flex items-center justify-between gap-3 text-xs text-slate-500"><span>{offer.business}</span><span className="inline-flex items-center gap-1 text-emerald-700"><MapPin className="size-3.5" />{offer.distance}</span></div><h3 className="mt-3 text-xl font-bold">{offer.title}</h3><div className="mt-3 flex items-center gap-2 text-sm text-slate-500"><Clock3 className="size-4 text-orange-500" /> Olib ketish: {offer.time}</div><div className="mt-5 flex items-end justify-between gap-3"><div><strong className="block text-lg font-black text-emerald-800">{offer.price}</strong><span className="text-sm text-slate-400 line-through">{offer.oldPrice}</span></div><Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"><ShoppingBag className="size-4" /> Tanlash</Link></div></div></article>)}</div></section>
      <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-[#f0e9dc] p-7 sm:p-10 lg:flex-row lg:items-center"><div><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Biznes egasimisiz?</p><h2 className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">Sizdagi yaxshi mahsulot ham xaridorini topsin.</h2><p className="mt-3 max-w-xl leading-7 text-slate-600">Qolmasin orqali yangi mijozlarga chiqing va mahsulot isrofini kamaytiring.</p></div><Link to="/register" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-800">Hamkor bo‘lish <ArrowRight className="size-4" /></Link></section>
    </main>
    <Footer />
  </div>
)

export default Offers
