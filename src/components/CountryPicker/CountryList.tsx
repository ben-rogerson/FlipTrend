import { useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { type CountryItem, countryPickerData } from '@/data/countries'
import { cn } from '@/utils/styles'
import { IconCheck } from '@/components/SvgIcons'

export const CountryList = (props: {
  country: CountryItem
  setOpen: (open: boolean) => void
  setCountry: (country: CountryItem['value']) => void
}) => {
  const [filteredOptions, setFilteredOptions] =
    useState<CountryItem[]>(countryPickerData)
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 7,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const handleSearch = (search: string) => {
    setFilteredOptions(
      filteredOptions.filter(option =>
        option.label.toLowerCase().includes(search.trim().toLowerCase())
      )
    )
  }

  return (
    <Command shouldFilter={false}>
      <CommandInput
        onValueChange={handleSearch}
        placeholder="Market search&hellip;"
        className="py-3 text-2xl"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- Okay in this case as it's only focussed when the dropdown is open
        autoFocus
      />
      <CommandEmpty className="px-8 py-4 text-2xl">
        No country found.
      </CommandEmpty>
      <CommandGroup
        ref={parentRef}
        className={cn(
          'h-full max-h-[350px] w-full',
          virtualOptions.length > 0 ? 'overflow-auto' : 'overflow-hidden'
        )}
      >
        <div
          className="relative w-full"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          <CommandList>
            {virtualOptions.map(virtualOption => {
              const virtualItem = filteredOptions[virtualOption.index]
              if (!virtualItem) return null
              return (
                <CommandItem
                  className="absolute left-0 top-0 w-full text-2xl"
                  style={{
                    height: `${virtualOption.size}px`,
                    transform: `translateY(${virtualOption.start}px)`,
                  }}
                  key={virtualItem.value}
                  value={virtualItem.value}
                  onSelect={(value: CountryItem['value']) => {
                    props.setCountry(value)
                    props.setOpen(false)
                  }}
                >
                  <IconCheck
                    className={cn(
                      'mr-2 shrink-0 text-3xl text-primary transition-opacity duration-700',
                      props.country.value === virtualItem.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  <div className="truncate">{virtualItem.label}</div>
                </CommandItem>
              )
            })}
          </CommandList>
        </div>
      </CommandGroup>
    </Command>
  )
}
