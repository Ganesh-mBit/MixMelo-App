import './globals.css';
import { Figtree } from 'next/font/google';
import Sidebar from '@/components/Sidebar';

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify.Web - App',
  description: 'Listen your favorite musics !',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  )
}
