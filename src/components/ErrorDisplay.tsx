import { cn } from '@/utils/styles'

export const ErrorDisplay = (props: { error: unknown }) => {
  if (!props.error) return
  const msg =
    props.error instanceof Error ? props.error.message : String(props.error)
  return (
    <div className="py-20 @container/loader sm:px-8" role="alert">
      <div
        className={cn(
          'relative mx-auto grid w-fit items-center gap-3 text-center opacity-100 duration-1000 animate-in fade-in-0 @sm/loader:text-2xl @lg/loader:flex @lg/loader:text-left'
        )}
      >
        <div className="grid gap-4 text-center">
          <h1 className="font-heading text-2xl font-bold text-red-500 @lg/loader:text-4xl @lg/loader:tracking-tight">
            Oops, something went wrong
          </h1>
          <pre>{msg}</pre>
        </div>
      </div>
    </div>
  )
}
