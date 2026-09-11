import { useState } from "react"
import { Leaf, Menu, Search, X } from "lucide-react"
import { Link } from "react-router-dom"

const navLinks = [
  { label: "Bosh sahifa", href: "#home", active: true },
  { label: "Biz haqimizda", href: "#about", active: false },
  { label: "Aloqa", href: "#contact", active: false },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-transparent px-3 pt-3 sm:px-5">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center gap-5 rounded-[2rem] border border-slate-200 bg-white/95 px-5 shadow-[0_8px_24px_rgb(15_23_42_/_8%)] backdrop-blur-xl lg:gap-8 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Qolmasin bosh sahifasi">
          <span className="grid size-10 place-items-center rounded-full bg-emerald-800 text-white">
            <Leaf className="size-5" strokeWidth={2.5} />
          </span>
          <span className="text-[21px] font-bold tracking-tight text-emerald-800">
            Qol<span className="text-orange-500">masin</span>
          </span>
        </Link>

        <form className="hidden min-w-0 flex-1 md:block" role="search" onSubmit={(event) => event.preventDefault()}>
          <label className="relative block max-w-[500px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-slate-500" aria-hidden="true" />
            <input
              type="search"
              placeholder="Mahsulot yoki do'kon qidiring"
              aria-label="Qidiruv"
              className="h-11 w-full rounded-full border border-slate-200 bg-[#f4f8f5] pl-11 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10"
            />
          </label>
        </form>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-emerald-700 ${link.active ? "text-emerald-800" : "text-slate-500"}`}>
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2.5 border-l border-slate-200 pl-6">
            <Link
              to="/login"
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_2px_5px_rgb(6_78_59_/_25%)] transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_3px_7px_rgb(6_78_59_/_28%)] active:translate-y-0 active:shadow-[0_1px_3px_rgb(6_78_59_/_20%)]"
            >
              Sign Up
            </Link>

          </div>
        </div>

        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mx-3 rounded-[2rem] border border-slate-200 bg-white px-6 pb-5 shadow-[0_8px_24px_rgb(15_23_42_/_8%)] md:hidden">
          <form className="pt-4" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                type="search"
                placeholder="Mahsulot yoki do'kon qidiring"
                aria-label="Qidiruv"
                className="h-11 w-full rounded-full border border-slate-200 bg-[#f4f8f5] pl-11 pr-4 text-sm outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              />
            </label>
          </form>
          <div className="mt-4 grid gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link to="/login" className="rounded-full border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800">
                Log In
              </Link>
              <Link to='/register' className="rounded-full bg-emerald-800 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_5px_rgb(6_78_59_/_25%)] transition active:translate-y-0.5 active:shadow-[0_1px_3px_rgb(6_78_59_/_20%)]">
                Sign Up
              </Link>

            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
