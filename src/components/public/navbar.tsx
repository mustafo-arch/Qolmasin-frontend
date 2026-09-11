
import { useState } from "react"
import { Leaf, Menu, Search, X } from "lucide-react"
import { Link } from "react-router-dom"

const navLinks = [
  { label: "Bosh sahifa", href: "/", active: true },
  { label: "Batafsil", href: "/batafsil", active: false },
  { label: "Qanday ishlaydi?", href: "/batafsil#qanday-ishlaydi", active: false },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-t-[3px] border-slate-800/80 bg-transparent px-3 pt-3 sm:px-5">
      <nav
        className="glass-panel mx-auto flex h-16 w-full max-w-[1190px] items-center gap-4 rounded-[2rem] px-4 lg:gap-5 lg:px-7 xl:h-20 xl:max-w-[92%] xl:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Qolmasin bosh sahifasi"
        >
          <span className="grid size-10 place-items-center rounded-full bg-emerald-800 text-white">
            <Leaf className="size-5" strokeWidth={2.5} />
          </span>

          <span className="text-[21px] font-bold tracking-tight text-emerald-800">
            Qol<span className="text-orange-500">masin</span>
          </span>
        </Link>

        {/* Search */}
        <form
          className="hidden min-w-0 flex-1 md:block"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="relative block w-full max-w-[420px] lg:ml-2 xl:max-w-[500px]">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Mahsulot yoki do'kon qidiring"
              aria-label="Qidiruv"
              className="glass-control h-11 w-full rounded-full border border-slate-300/90 bg-white/75 pl-11 pr-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-emerald-600 focus:bg-white/90 focus:ring-4 focus:ring-emerald-600/10 xl:h-12"
            />
          </label>
        </form>

        {/* Desktop navigation */}
        <div className="hidden shrink-0 items-center md:flex">
          {/* Nav links */}
          <div className="flex items-center gap-3 lg:gap-4 xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`whitespace-nowrap px-1 text-sm font-medium transition-colors hover:text-emerald-700 ${
                  link.active
                    ? "font-semibold text-emerald-800"
                    : "text-slate-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="ml-4 flex shrink-0 items-center gap-2.5 border-l border-slate-300/80 pl-4 lg:ml-5 lg:pl-5 xl:ml-6 xl:pl-6">
            <Link
              to="/login"
              className="glass-control whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="whitespace-nowrap rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_5px_rgb(6_78_59_/_25%)] transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_3px_7px_rgb(6_78_59_/_28%)] active:translate-y-0 active:shadow-[0_1px_3px_rgb(6_78_59_/_20%)]"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {isMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="glass-panel mx-3 mt-2 rounded-[2rem] px-6 pb-5 md:hidden">
          <form
            className="pt-4"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />

              <input
                type="search"
                placeholder="Mahsulot yoki do'kon qidiring"
                aria-label="Qidiruv"
                className="glass-control h-11 w-full rounded-full border border-slate-300/90 bg-white/75 pl-11 pr-4 text-sm outline-none focus:border-emerald-600 focus:bg-white/90 focus:ring-4 focus:ring-emerald-600/10"
              />
            </label>
          </form>

          <div className="mt-4 grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link
                to="/login"
                className="whitespace-nowrap rounded-full border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="whitespace-nowrap rounded-full bg-emerald-800 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_2px_5px_rgb(6_78_59_/_25%)] transition active:translate-y-0.5 active:shadow-[0_1px_3px_rgb(6_78_59_/_20%)]"
              >
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