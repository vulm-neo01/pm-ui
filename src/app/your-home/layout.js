import './style.css'
import NavBar from '@/components/Navbar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Home Page',
    description: 'Project and task management for students',
}

export default function ChildLayout({ children }) {
    return (
        <section className={inter.className}>
            <div className='flex'>
                <NavBar className="flex-none"/>
                
                {/* <div className='flex-1 bg-white text-black pl-4 pt-20'> */}
                <div className='grid w-full gap-4 p-4 mt-16 bg-white text-black'>
                    {children}
                </div>
            </div>

        </section>
    )
}
