'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'

export default function QueryProvider({ children }) {
  // useState ensures a single client per component tree
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    const script = document.createElement("script")
    script.src= snapScript;
    script.setAttribute("data-client-key", clientKey)
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
