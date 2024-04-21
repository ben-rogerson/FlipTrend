import { IconArrowDown, IconArrowUp, IconGem } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'
import { useSort } from '@/hooks/useSort'

export const SortMarketCap = () => {
  const [sort, setSort] = useSort()

  return (
    <div className="mb-3 grid items-end self-end">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="hidden gap-1 md:grid" aria-hidden>
          <div className="flex items-center justify-end gap-2">
            <div className="text-xl font-bold uppercase tracking-wide text-muted">
              Market cap
            </div>
            <IconGem className="text-xl text-muted" />
          </div>
          <div
            className="relative text-right font-heading text-3xl font-bold"
            data-testid="market-cap-status"
          >
            <div
              className={cn(
                'whitespace-nowrap transition-all duration-200',
                sort === 'desc' && 'ease translate-y-4 transform opacity-0'
              )}
              key="asc"
            >
              Low to High
            </div>
            <div
              className={cn(
                'absolute right-0 top-0 whitespace-nowrap transition-all duration-200',
                sort === 'asc' && 'ease -translate-y-4 transform opacity-0'
              )}
              key="desc"
            >
              High to Low
            </div>
          </div>
        </div>
        <div className="-mt-1 grid gap-1">
          <fieldset
            className="my-1.5 grid h-20 w-12 overflow-hidden rounded-2xl border-2 text-muted has-[:focus-visible]:border-white md:flex md:h-14 md:w-24"
            onChange={e => {
              const target = e.target as HTMLInputElement
              if (target.value !== 'desc' && target.value !== 'asc') return
              setSort(target.value)
            }}
          >
            <legend className="sr-only">Sort companies by market cap</legend>
            <input
              className="peer/desc sr-only"
              id="sort-desc"
              type="radio"
              name="sort"
              value="desc"
              checked={sort === 'desc'}
            />
            <input
              className="peer/asc sr-only"
              id="sort-asc"
              type="radio"
              name="sort"
              value="asc"
              checked={sort === 'asc'}
            />
            <label
              className={cn(
                'peer-checked/desc:bg-selected peer-checked/desc:text-active md:rounded-l-xl',
                'grid w-full place-content-center'
              )}
              htmlFor="sort-desc"
            >
              <IconArrowDown className="text-2xl" />
              <div className="sr-only">Sort high to low</div>
            </label>
            <label
              className={cn(
                'peer-checked/asc:bg-selected peer-checked/asc:text-active md:rounded-r-xl',
                'grid w-full place-content-center'
              )}
              htmlFor="sort-asc"
            >
              <IconArrowUp className="text-2xl" />
              <div className="sr-only">Sort low to high</div>
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
