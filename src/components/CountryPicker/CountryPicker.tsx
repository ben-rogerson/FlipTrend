import { Suspense, lazy, useState } from 'react'
import { useCountry } from '@/hooks/useCountry'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { LoaderCard } from '@/components/Loader/LoaderCard'
import { CountryDropdownTrigger } from '@/components/CountryPicker/CountryPickerTrigger'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const LazyCountryList = lazy(() =>
  import('@/components/CountryPicker/CountryList').then(module => ({
    default: module.CountryList,
  }))
)

export const CountryPicker = () => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1000px)')
  const [country, setCountry] = useCountry()

  const trigger = (
    <button type="button" className="group/button cursor-default text-left">
      <CountryDropdownTrigger
        key={country.value} // Trigger animation
        pageTitle={country.label[0] ?? ''}
      />
    </button>
  )

  if (isDesktop)
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{trigger}</PopoverTrigger>
        <PopoverContent className="ml-8 w-[350px] p-0" align="start">
          <Suspense fallback={<LoaderCard message="Loading countries" />}>
            <LazyCountryList
              country={country}
              setCountry={setCountry}
              setOpen={setOpen}
            />
          </Suspense>
        </PopoverContent>
      </Popover>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 h-full border-t">
          <Suspense fallback={<LoaderCard message="Loading countries" />}>
            <LazyCountryList
              country={country}
              setCountry={setCountry}
              setOpen={setOpen}
            />
          </Suspense>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
