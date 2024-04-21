import type { SVGProps } from 'react'

/**
 * Common svg icon wrapper.
 */
export const Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
    width="1em"
    height="1em"
    {...props}
  >
    {props.children}
  </svg>
)

interface SVGIconProps {
  className?: string
}

export const IconLoader = (props: SVGIconProps) => (
  <Icon {...props} fill="none" viewBox="0 0 40 41" strokeWidth={0}>
    <defs>
      <linearGradient
        id="a"
        x1="19.866"
        x2="19.866"
        y1=".69"
        y2="40.06"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D1E751" />
        <stop offset="1" stopColor="#00B4FF" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M22.547 3.37a2.68 2.68 0 1 0-5.36 0v6.802a2.68 2.68 0 0 0 5.36 0zm0 27.208a2.68 2.68 0 1 0-5.36 0v6.801a2.68 2.68 0 1 0 5.36 0zM5.949 6.458a2.68 2.68 0 0 1 3.79 0l4.813 4.812a2.68 2.68 0 0 1-3.79 3.79l-4.813-4.812a2.68 2.68 0 0 1 0-3.79M28.972 25.69a2.68 2.68 0 1 0-3.79 3.79l4.812 4.813a2.68 2.68 0 0 0 3.79-3.79zM.181 20.375c0-1.48 1.2-2.68 2.68-2.68h6.802a2.68 2.68 0 0 1 0 5.36H2.862a2.68 2.68 0 0 1-2.68-2.68m29.887-2.68a2.68 2.68 0 0 0 0 5.36h6.802a2.68 2.68 0 1 0 0-5.36zM14.552 25.69a2.68 2.68 0 0 1 0 3.79l-4.813 4.813a2.68 2.68 0 0 1-3.79-3.79l4.812-4.813a2.68 2.68 0 0 1 3.79 0m19.232-15.442a2.68 2.68 0 0 0-3.79-3.79L25.18 11.27a2.68 2.68 0 1 0 3.79 3.79z"
      clipRule="evenodd"
      vectorEffect="non-scaling-stroke"
    />
  </Icon>
)

export const IconGithub = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 16 16" fill="currentColor" strokeWidth={0}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
  </Icon>
)

export const IconDropDown = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 57 35">
    <path
      stroke="#00B4FF"
      strokeLinecap="round"
      strokeWidth="8.518"
      d="M50.74 6.236 28.734 28.243 6.727 6.236"
    />
  </Icon>
)

export const IconGem = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 20 19">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.142 1.587h10.283l3.428 5.142-8.57 11.14-8.57-11.14z"
      vectorEffect="non-scaling-stroke"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.426 1.587 6.856 6.73l3.427 11.14 3.428-11.14-2.57-5.142M1.714 6.73h17.139"
      vectorEffect="non-scaling-stroke"
    />
  </Icon>
)

export const IconCheck = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" vectorEffect="non-scaling-stroke" />
  </Icon>
)

export const IconSearch = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" vectorEffect="non-scaling-stroke" />
    <path d="m21 21-4.3-4.3" vectorEffect="non-scaling-stroke" />
  </Icon>
)

export const IconClose = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" vectorEffect="non-scaling-stroke" />
  </Icon>
)

export const IconArrowDown = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path d="M12 5v14m7-7-7 7-7-7" vectorEffect="non-scaling-stroke" />
  </Icon>
)

export const IconArrowUp = (props: SVGIconProps) => (
  <Icon {...props} viewBox="0 0 24 24">
    <path d="m5 12 7-7 7 7m-7 7V5" vectorEffect="non-scaling-stroke" />
  </Icon>
)
