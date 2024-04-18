import { IconDownArrow } from '@/components/SvgIcons'
import { Flag } from './Flag'

export const HeaderButton = (props: { pageTitle: string }) => {
  return (
    <button
      type="button"
      className="group relative -ml-2.5 inline-flex items-center gap-4 px-4 text-left text-3xl font-bold tracking-tight md:text-5xl lg:text-7xl"
    >
      <div className="absolute -inset-3 -z-1 rounded-full group-hover:bg-button-hover" />
      <div
        className="relative -ml-3 h-[1em] w-[1em] shrink-0 items-center overflow-hidden rounded-50 border-2 shadow-inner lg:border-4"
        aria-hidden
      >
        <Flag className="h-full object-cover" />
      </div>
      <h1 className="md:truncate">{props.pageTitle}</h1>
      <IconDownArrow className="mt-2 text-5xl" aria-hidden />
    </button>
  )
}
