import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const BaseLayout = (props: { children: ReactNode }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="padded-x py-20">{props.children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
