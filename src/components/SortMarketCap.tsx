import { IconArrowDown, IconArrowUp, IconGem } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'
import { useSort } from '@/hooks/useSort'

export const SortMarketCap = () => {
  const [sort, setSort] = useSort()

  return (
    <div className="mb-3 grid md:items-end md:self-end">
      <div className="grid min-h-[64px] w-fit grid-cols-[minmax(0,1fr)_auto] gap-6">
        <div className="order-1 grid gap-1" aria-hidden>
          <div className="flex items-center gap-2 md:justify-end">
            <div className="text-base font-bold uppercase tracking-wide text-muted md:text-lg">
              Market cap
            </div>
            <IconGem className="text-lg text-muted md:text-xl" />
          </div>
          <div
            className="relative font-heading text-xl font-bold md:text-2xl"
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
                'absolute top-0 whitespace-nowrap transition-all duration-200 md:right-0',
                sort === 'asc' && 'ease -translate-y-4 transform opacity-0'
              )}
              key="desc"
            >
              High to Low
            </div>
          </div>
        </div>
        <div className="-mt-1 grid gap-1 md:order-1">
          <fieldset
            className="my-1.5 flex h-14 w-24 overflow-hidden rounded-2xl border-2 text-muted has-[:focus-visible]:border-white"
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
              readOnly
            />
            <input
              className="peer/asc sr-only"
              id="sort-asc"
              type="radio"
              name="sort"
              value="asc"
              checked={sort === 'asc'}
              readOnly
            />
            <label
              className={cn(
                'peer-checked/desc:bg-selected peer-checked/desc:text-active rounded-l-xl',
                'grid w-full place-content-center'
              )}
              htmlFor="sort-desc"
            >
              <IconArrowDown className="text-2xl" />
              <div className="sr-only">Sort high to low</div>
            </label>
            <label
              className={cn(
                'peer-checked/asc:bg-selected peer-checked/asc:text-active rounded-r-xl',
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
