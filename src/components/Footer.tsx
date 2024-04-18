import { IconGithub } from '@/components/SvgIcons'
import { PROJECT_LINK, PROJECT_NAME } from '@/constants'

export const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <div className="select-none">
      <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-y-10">
        <div className="col-span-2 w-full text-center md:absolute">
          Market data provided by{' '}
          <a
            href="https://simplywall.st"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-link hover:underline"
          >
            Simply Wall St.
          </a>
        </div>
        <div aria-hidden>
          {PROJECT_NAME} © {year}
        </div>
        <a
          href={PROJECT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="relative -mt-1 justify-self-end"
          aria-label={`GitHub repository for ${PROJECT_NAME}`}
        >
          <IconGithub className="text-[150%]" />
        </a>
      </div>
    </div>
  )
}
