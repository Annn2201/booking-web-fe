export const metadata = {
  title: 'Hotel',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <header>
      </header>
      {children}</body>
    </html>
  )
}
