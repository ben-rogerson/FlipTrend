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
import { cn } from '@/utils/styles'
import { IconCheck } from '@/components/SvgIcons'

type CountryItem = (typeof countryComboboxData)[number]

const countryComboboxData = Object.entries({
  ...{ ALL: 'All countries' },
  ...COUNTRY_CODES_ISOALPHA2,
}).map(([value, label]) => ({ value: value, label }))

export const MainHeadingComboBox = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 1000px)')
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
        <PopoverContent className="w-[350px] p-0" align="start">
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
        <div className="mt-4 h-full border-t">
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
    estimateSize: () => 50,
    overscan: 7,
  })

  const virtualOptions = virtualizer.getVirtualItems()

  const handleSearch = (search: string) => {
    setFilteredOptions(
      countryComboboxData.filter(option =>
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
                  onSelect={(value: string) => {
                    props.setSelectedCountry(
                      countryComboboxData.find(
                        company => company.value === value
                      ) as CountryItem
                    )
                    props.setOpen(false)
                  }}
                >
                  <IconCheck
                    className={cn(
                      'mr-2 shrink-0 text-3xl text-primary transition-opacity duration-700',
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
