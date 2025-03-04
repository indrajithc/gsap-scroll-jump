import type React from "react"

import type { Metadata } from "next"
// import "./globals.css"

export const metadata: Metadata = {
  title: "Motion example: Track element within viewport",
  description: "undefined",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main id="sandbox">{children}</main>
      </body>
    </html>
  )
}

