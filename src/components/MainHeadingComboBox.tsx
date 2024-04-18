import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { COUNTRY_CODES_ISOALPHA2 } from '@/data/countryListIsoAlpha2'
import { useCountryId } from '@/hooks/useCountryId'
import { MainHeading } from '@/components/MainHeading'
import { Check } from 'lucide-react'
import { cn } from '@/utils/styles'

type CountryItem = (typeof countryComboboxData)[number]

const countryComboboxData = Object.entries({
  ...{ ALL: 'All countries' },
  ...COUNTRY_CODES_ISOALPHA2,
}).map(([value, label]) => ({ value: value, label }))

export const MainHeadingComboBox = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const countryId = useCountryId()
  const defaultCountry = (
    countryId
      ? countryComboboxData.find(country => country.value === countryId)
      : countryComboboxData[0]
  ) as CountryItem
  const [selectedCountry, setSelectedCountry] = React.useState(defaultCountry)
  const [, setLocation] = useLocation()

  // Redirect to the selected country when the country is selected
  useEffect(() => {
    if (selectedCountry.value === 'ALL') {
      setLocation('/')
      return
    }
    setLocation(`/${selectedCountry.value.toLowerCase()}`)
  }, [selectedCountry.value, setLocation])

  const trigger = (
    <div className="group/button cursor-default">
      <MainHeading
        pageTitle={
          selectedCountry.value === 'ALL' ? 'Global' : selectedCountry.label
        }
      />
    </div>
  )

  if (isDesktop)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <CountryList
            selectedCountry={selectedCountry}
            setOpen={setOpen}
            setSelectedCountry={setSelectedCountry}
          />
        </PopoverContent>
      </Popover>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CountryList
            selectedCountry={selectedCountry}
            setOpen={setOpen}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const CountryList = (props: {
  selectedCountry: CountryItem
  setOpen: (open: boolean) => void
  setSelectedCountry: (country: CountryItem) => void
}) => {
  const [filteredOptions, setFilteredOptions] =
    useState<CountryItem[]>(countryComboboxData)
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 7,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const handleSearch = (search: string) => {
    setFilteredOptions(
      countryComboboxData.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
    }
  }

  return (
    <Command shouldFilter={false} onKeyDown={handleKeyDown}>
      <CommandInput
        onValueChange={handleSearch}
        placeholder="Country search&hellip;"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- Okay in this case as it's only focussed when the dropdown is open
        autoFocus
      />
      <CommandEmpty>No country found.</CommandEmpty>
      <CommandGroup
        ref={parentRef}
        className="h-fit max-h-[400px] w-full overflow-auto"
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
                  className="absolute left-0 top-0 w-full"
                  style={{
                    height: `${virtualOption.size}px`,
                    transform: `translateY(${virtualOption.start}px)`,
                  }}
                  key={virtualItem.value}
                  value={virtualItem.value}
                  onSelect={(value: string) => {
                    props.setSelectedCountry(
                      countryComboboxData.find(
                        company => company.value === value
                      ) as CountryItem
                    )
                    props.setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      props.selectedCountry.value === virtualItem.value
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

// const CountryList = (props: {
//   setOpen: (open: boolean) => void
//   setSelectedCountry: (country: CountryItem | null) => void
// }) => {
//   return (
//     <Command
//       filter={(_, search, keywords = []) => {
//         if (!keywords[0]?.toLowerCase().includes(search.trim().toLowerCase()))
//           return 0
//         return 1
//       }}
//     >
//       <CommandInput placeholder="Country search&hellip;" />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup>
//           {countryComboboxData.map(country => (
//             <CommandItem
//               key={country.value}
//               value={country.value}
//               keywords={[country.label]}
//               onSelect={(value: string) => {
//                 props.setSelectedCountry(
//                   countryComboboxData.find(
//                     company => company.value === value
//                   ) ?? null
//                 )
//                 props.setOpen(false)
//               }}
//             >
//               {country.label}
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </Command>
//   )
// }
