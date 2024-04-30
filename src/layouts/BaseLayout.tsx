import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const BaseLayout = (props: { children: ReactNode }) => (
  <div>
    <header className="duration-700 ease-out animate-in fade-in-0 slide-in-from-top-3">
      <Header />
    </header>
    <main className="mx-auto max-w-screen-2xl pt-5 duration-700 ease-out animate-in fade-in-0 slide-in-from-top-1 fill-mode-backwards padded-x">
      {props.children}
    </main>
    <footer className="border-t-2 py-5 duration-700 animate-in fade-in-0 fill-mode-backwards margined-x md:py-10">
      <Footer />
    </footer>
  </div>
)
