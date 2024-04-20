import { IconDropDown } from '@/components/SvgIcons'
import { CountryFlag } from '@/components/CountryPicker/CountryFlag'
import { cn } from '@/utils/styles'

export const CountryDropdownTrigger = (props: { pageTitle: string }) => (
  <div className="@container/trigger">
    <div
      className={cn(
        'relative inline-flex h-full max-w-full items-center gap-4 pl-3 text-left font-bold tracking-tight',
        'text-3xl @sm/trigger:text-4xl @2xl/trigger:text-5xl @5xl/trigger:-ml-2 @5xl/trigger:text-7xl',
        'duration-500 ease-out animate-in fade-in-0 slide-in-from-left-2'
      )}
    >
      <div className="absolute -inset-x-4 inset-y-0 -z-1 hidden rounded-full group-hover/button:bg-button-hover md:block" />
      <div
        className="bg-selected relative -ml-3 h-[1em] w-[1em] shrink-0 overflow-hidden rounded-50 border-2 text-5xl shadow-inner @lg/trigger:border-4 @lg/trigger:text-6xl @5xl/trigger:text-[5rem]"
        aria-hidden
      >
        <CountryFlag className="h-full object-cover" />
      </div>
      <div className="text-balance @lg/trigger:leading-normal @3xl/trigger:truncate">
        {props.pageTitle}
        <IconDropDown className="mx-2.5 inline-block text-[.7em]" aria-hidden />
      </div>
    </div>
  </div>
)
