import { Link, Outlet } from 'react-router'

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icon.svg" alt="Life Tracking" className="h-6 w-6" />
            <span className="inline-block font-semibold">Life Tracking</span>
          </Link>
        </div>

        <nav className="flex flex-1 items-center gap-6 text-sm">
          <Link
            to="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* coisinhas ficarão aqui futuramente */}
        </div>
      </div>
    </header>
  )
}

export function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
