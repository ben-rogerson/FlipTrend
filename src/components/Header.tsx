import { Link } from 'wouter'
import { Icon, IconGithub } from '@/components/SvgIcons'
import { PROJECT_LINK, PROJECT_NAME } from '@/constants'

const Logo = () => (
  <Icon
    fill="none"
    viewBox="0 0 58 44"
    strokeWidth={0}
    className="-mt-1.5 text-[150%]"
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M56.778 2.689a3.6 3.6 0 0 0-1.048-1.352 3.58 3.58 0 0 0-2.29-.779H31.952a3.59 3.59 0 1 0 0 7.182h14.106L30.689 27.087l-4.342-14.219a3.591 3.591 0 0 0-6.355-1.04L1.322 37.941a3.59 3.59 0 1 0 5.843 4.177l14.438-20.195 4.214 13.796a3.59 3.59 0 0 0 6.246 1.185l17.843-22.462v11.252a3.59 3.59 0 0 0 7.182 0V4.184a3.6 3.6 0 0 0-.31-1.495"
      clipRule="evenodd"
      vectorEffect="non-scaling-stroke"
    />
    <defs>
      <linearGradient
        id="a"
        x1="57.369"
        x2="13.581"
        y1="8.23"
        y2="49.256"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D1E751" />
        <stop offset="1" stopColor="#00B4FF" />
      </linearGradient>
    </defs>
  </Icon>
)

export const Header = () => (
  <div className="flex select-none items-center justify-between">
    <Link
      to="/"
      className="flex items-center gap-4 text-3xl font-bold tracking-tight padded-x padded-y md:text-4xl"
      aria-label={`${PROJECT_NAME} home`}
    >
      <Logo /> {PROJECT_NAME}
    </Link>
    <a
      href={PROJECT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="block padded-x padded-y"
      aria-label={`GitHub repository for ${PROJECT_NAME}`}
    >
      <IconGithub className="text-[175%]" />
    </a>
  </div>
)
