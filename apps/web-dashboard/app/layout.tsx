import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>SHEDOW AI - Control Panel</title>
        <meta name="description" content="SHEDOW AI Dashboard & Control Panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-shedow-dark text-white">
        {children}
      </body>
    </html>
  )
}
