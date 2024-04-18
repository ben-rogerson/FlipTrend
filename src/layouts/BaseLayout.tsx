import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const BaseLayout = (props: { children: ReactNode }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="padded-x mx-auto max-w-screen-2xl pb-24 pt-5">
        {props.children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
