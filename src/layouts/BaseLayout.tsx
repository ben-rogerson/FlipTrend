import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const BaseLayout = (props: { children: ReactNode }) => (
  <>
    <header>
      <Header />
    </header>
    <main className="padded-x mx-auto max-w-screen-2xl pt-5">
      {props.children}
    </main>
    <footer className="margined-x border-t-2 py-5 md:py-10">
      <Footer />
    </footer>
  </>
)
