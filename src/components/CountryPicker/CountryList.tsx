import { useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { IconCheck } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'
import { useCountryVirtualizedList } from '@/hooks/useCountryVirtualizedList'
import { type CountryItem, countryPickerData } from '@/data/countries'

export const CountryList = (props: {
  country: CountryItem
  setOpen: (open: boolean) => void
  setCountry: (country: CountryItem['value']) => void
}) => {
  const [filteredOptions, setFilteredOptions] =
    useState<CountryItem[]>(countryPickerData)
  const listData = useCountryVirtualizedList(filteredOptions.length)

  const handleSearch = (rawKeywords: string) => {
    const keywords = rawKeywords.trim().toLowerCase()
    const results = countryPickerData.filter(option =>
      option.label.some(l => l.toLowerCase().includes(keywords))
    )
    if (results.length === 0) return
    setFilteredOptions(results)
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
        ref={listData.parentRef}
        className={cn(
          'h-full max-h-[350px] w-full overscroll-contain',
          listData.virtualOptions.length > 0
            ? 'overflow-auto'
            : 'overflow-hidden'
        )}
      >
        <div className="relative w-full" style={listData.parentHeightStyle}>
          <CommandList>
            {listData.virtualOptions.map(virtualOption => {
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
                  onSelect={value => {
                    props.setOpen(false)
                    // Perf fix:
                    // Delay the state update to allow the dropdown to close
                    setTimeout(() => {
                      props.setCountry(value as CountryItem['value'])
                    })
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
                  <div className="truncate">{virtualItem.label[0]}</div>
                </CommandItem>
              )
            })}
          </CommandList>
        </div>
      </CommandGroup>
    </Command>
  )
}
