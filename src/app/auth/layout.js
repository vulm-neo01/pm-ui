import '../../styles/auth.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Authentication',
    description: 'Authentication',
}

export default function RootLayout({ children }) {
    return (
        <section className={inter.className}>
        {children}
        </section>
    )
}
