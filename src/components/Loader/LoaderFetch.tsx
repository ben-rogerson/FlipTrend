import { IconLoader } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'

export const LoaderFetch = (props: { isLoading: boolean }) => (
  <div className="@container/loader" aria-hidden>
    <div
      className={cn(
        '@xs/loader:px-46 relative mx-auto grid w-fit items-center gap-3 bg-page px-5 text-center font-heading font-bold @sm/loader:text-2xl @lg/loader:flex @lg/loader:text-left @lg/loader:text-4xl @lg/loader:tracking-tight @xl/loader:px-10',
        props.isLoading
          ? 'opacity-100 duration-200 animate-in fade-in-0'
          : 'opacity-0'
      )}
    >
      <IconLoader className="mx-auto animate-spin text-5xl @lg/loader:-mt-1" />
      <div>Grabbing more&hellip;</div>
    </div>
  </div>
)
