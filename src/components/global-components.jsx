import { Toaster } from 'react-hot-toast'

export default function GlobalComponents({ children }) {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      {children}
    </div>
  )
}
