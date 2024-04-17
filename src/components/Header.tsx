import { IconGithub, Logo } from '@/components/SvgIcons'
import { Link } from 'wouter'

export const Header = () => (
  <div className="flex items-center justify-between">
    <Link
      to="/"
      className="padded-x padded-y flex items-center gap-4 text-4xl font-bold tracking-tight"
      aria-label="FlipTrend home"
    >
      <Logo className="-mt-1.5 text-[150%]" /> FlipTrend
    </Link>
    <Link
      to="https://github.com/ben-rogerson/fliptrend"
      target="_blank"
      rel="noopener noreferrer"
      className="padded-x padded-y block"
      aria-label="GitHub repository for FlipTrend"
    >
      <IconGithub className="text-[175%]" />
    </Link>
  </div>
)
