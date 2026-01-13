'use client'

import {Github, Info} from 'lucide-react';
import { useAppStore } from '@/stores/store';
import Link from 'next/link';

interface NavBarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const NavBarButton = ({ children, onClick }: NavBarButtonProps) => {
  return (
    <button
      className="px-2 py-2 rounded-xl border border-gray-300 bg-linear-135 from-gray-300/50
      to-black/50 hover:cursor-pointer hover:outline hover:outline-2 hover:outline-white hover:outline-offset-0
      transition duration-150 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const NavBar = () => {
  const store = useAppStore();

  return (
    <div className="absolute flex w-full py-10 px-10 justify-start md:justify-center items-center">
      {/*Logo*/}
      <Link href={"/"} className="text-2xl font-bold">METASTRATUM</Link>

      {/*Buttons*/}
      <div className="absolute right-10 flex items-center gap-4">
        <NavBarButton onClick={() => store.toggleIsOverlayEnabled()}>
          <Info />
        </NavBarButton>
        <NavBarButton onClick={() => window.open("https://github.com/LefKour/Metastratum")}>
          <Github />
        </NavBarButton>
      </div>
    </div>
  );
};

export default NavBar;