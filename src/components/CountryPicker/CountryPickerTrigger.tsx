import { IconDropDown } from '@/components/SvgIcons'
import { CountryFlag } from '@/components/CountryPicker/CountryFlag'

export const CountryDropdownTrigger = (props: { pageTitle: string }) => (
  <div className="relative -ml-2 inline-flex h-full max-w-full gap-2.5 pl-3 pr-4 text-left text-3xl font-bold tracking-tight md:text-5xl lg:text-7xl">
    <div className="absolute -inset-1 -left-3 -top-2 -z-1 hidden rounded-full group-hover/button:bg-button-hover sm:block" />
    <div
      className="bg-selected relative -ml-3 h-[1em] w-[1em] shrink-0 overflow-hidden rounded-50 border-2 shadow-inner lg:border-4"
      aria-hidden
    >
      <CountryFlag
        key={props.pageTitle} // Instant changes on page change
        className="h-full object-cover"
      />
    </div>
    <div className="md:truncate">{props.pageTitle}</div>
    <IconDropDown className="mt-3 text-lg lg:mt-5 lg:text-5xl" aria-hidden />
  </div>
)
