import { IconGithub, Logo } from '@/components/SvgIcons'
import { PROJECT_LINK, PROJECT_NAME } from '@/constants'
import { Link } from 'wouter'

export const Header = () => (
  <div className="flex items-center justify-between">
    <Link
      to="/"
      className="padded-x padded-y flex items-center gap-4 text-4xl font-bold tracking-tight"
      aria-label={`${PROJECT_NAME} home`}
    >
      <Logo className="-mt-1.5 text-[150%]" /> {PROJECT_NAME}
    </Link>
    <a
      href={PROJECT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="padded-x padded-y block"
      aria-label={`GitHub repository for ${PROJECT_NAME}`}
    >
      <IconGithub className="text-[175%]" />
    </a>
  </div>
)
