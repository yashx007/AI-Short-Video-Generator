"use client"
import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react';
import Link from 'next/link'; // Make sure to import Link
import { usePathname } from 'next/navigation';

function SideNav() {
    const MenuOption = [
        {
            id: 1,
            name: 'Dashboard',
            path: '/dashboard',
            icon: PanelsTopLeft,
        },
        {
            id: 2,
            name: 'Create New',
            path: '/dashboard/create-new',
            icon: FileVideo,
        },
        {
            id: 3,
            name: 'Upgrade',
            path: '/upgrade',
            icon: ShieldPlus,
        },
        {
            id: 4,
            name: 'Account',
            path: '/account',
            icon: CircleUser,
        },
    ];

    const path = usePathname();


    return (
        <div className="w-64 h-screen shadow-md p-5 bg-white">
            <div className='grid gap-3'>
                <ul>
                    {MenuOption.map((item) => (
                        <Link href={item.path} key={item.id}>
                            <li className={`flex items-center space-x-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer
                                    ${path==item.path&&'bg-gray-200'}
                                `}>
                                <item.icon className="text-gray-500" />
                                <span className="text-gray-800">{item.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SideNav;
