import { Link } from 'wouter'
import { IconGithub } from '@/components/SvgIcons'

export const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <div className="padded-x select-none">
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-y-10 border-t py-10">
        <div className="pointer-events-none col-span-2 w-full text-center md:absolute">
          Market data provided by{' '}
          <Link
            to="https://simplywall.st"
            className="text-link pointer-events-auto whitespace-nowrap hover:underline"
          >
            Simply Wall St.
          </Link>
        </div>
        <div aria-hidden>FlipTrend © {year}</div>
        <Link
          to="https://github.com/ben-rogerson/fliptrend"
          target="_blank"
          rel="noopener noreferrer"
          className="-mt-1 justify-self-end"
          aria-label="GitHub repository for FlipTrend"
        >
          <IconGithub className="text-[150%]" />
        </Link>
      </div>
    </div>
  )
}
