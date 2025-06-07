import ReactQueryProvider from './react-query-provider'

export default function AppProvider({ children }) {
  return (
    <>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </>
  )
}
