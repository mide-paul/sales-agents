'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import sort from './../public/icons/sort.png';
import logo from './../public/images/logo.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const tabs = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { name: 'Leads & Opportunities', href: '/leads-and-opportunities', icon: 'person' },
    { name: 'Clients & Accounts', href: '/clients-and-accounts', icon: 'person' },
    { name: 'Ad Sales & Campaign Management', href: '/Adsales-and-campaign', icon: 'campaign' },
    { name: 'Pipelines & Campaign Management', href: '/pipelines-campaign', icon: 'campaign' },
    { name: 'Reports & Analytics', href: '/reports-analytics', icon: 'bar_chart' },
    { name: 'Products', href: '/products', icon: 'book' },
    { name: 'Settings', href: '/settings', icon: 'settings' },
  ];

  return (
    <>
      <button
        className="p-3 text-white fixed top-4 left-60 pl-3 z-30 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Image src={sort} alt="hamburger" className="w-6 h-6 object-cover" />
      </button>
      <div
        className={`h-full w-64 bg-white text-black flex flex-col fixed left-0 top-0 border border-black transform z-30 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        } transition-transform duration-200 md:translate-x-0`}
      >
        <div className="flex ml-4 items-center justify-left h-16 lg:ml-4 lg:mt-1">
          <Image src={logo} alt="Profile Picture" className="w-36 h-24" />
        </div>
        <nav className="flex-1 p-4 -mt-3">
          {tabs.map((tab) => (
            <Link key={tab.name} href={tab.href} legacyBehavior>
              <a
                className={`block py-1.5 px-4 rounded-lg mb-2 text-xs font-normal hover:bg-gray-200 transition-colors duration-200 ${
                  pathname === tab.href ? 'bg-gray-200 text-blue-950 font-semibold' : ''
                }`}
              >
                <div className="flex items-center">
                  <span className="material-icons-outlined mr-3 text-xs">{tab.icon}</span>
                  {tab.name}
                </div>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;