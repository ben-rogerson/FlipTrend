export const ErrorDisplay = (props: { error: unknown }) => {
  const msg =
    props.error instanceof Error ? props.error.message : String(props.error)
  return (
    <div role="alert">
      <p>⚠️ Something went wrong</p>
      <pre style={{ color: 'red' }}>{msg}</pre>
    </div>
  )
}
