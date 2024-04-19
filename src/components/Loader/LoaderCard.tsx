import { IconLoader } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'

export const LoaderCard = (props: { isLoading?: boolean; message: string }) => {
  if (props.isLoading === false) return
  return (
    <div className="py-20 @container/loader sm:px-8" aria-hidden>
      <div
        className={cn(
          'relative mx-auto grid w-fit items-center gap-3 text-center opacity-100 duration-1000 animate-in fade-in-0 @sm/loader:text-2xl @lg/loader:flex @lg/loader:text-left'
        )}
      >
        <IconLoader className="mx-auto animate-spin text-5xl @lg/loader:-mt-1" />
        <div className="font-heading text-2xl font-bold @lg/loader:text-4xl @lg/loader:tracking-tight">
          {props.message}&hellip;
        </div>
      </div>
    </div>
  )
}
