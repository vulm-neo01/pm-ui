import NavBar from '@/components/Navbar'
import '../../styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Home Page',
    description: 'Project and task management for students',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <NavBar/>
            {children}
        </body>
        </html>
    )
}
