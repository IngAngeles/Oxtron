import { SidebarProps } from '@/constants/types';
import { usePathname } from 'next/navigation';

const NavigationLink = ({ children, name, isOpen }: SidebarProps) => {
  const path = usePathname();
  const isActive = (path === `/dashboard` && name === 'dashboard') ||
    (path.startsWith(`/dashboard/${name}`) && name !== 'dashboard') ||
    (path.startsWith(`/${name}`) && name !== 'dashboard');

  return (
    <a 
      href={`${name === 'dashboard' ? '/dashboard' : `/dashboard/${name}`}`}
      className={`flex p-2 rounded cursor-pointer place-items-center gap-3 transition-all duration-300 text-sidebar
      ${isActive ? 'bg-gradient-to-t from-[#35d7ff] via-[#000099] to-[#000]' : 'hover:bg-neutral-700/30'}`}
    >
      <span className={`transition-colors duration-300`}>
        {children}
      </span>
      <p className={`text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide capitalizeopacity-0 lg:opacity-100 capitalize 
        ${isOpen  && 'opacity-100 transition-all duration-1000 ease-in-out'}  `}
      >
        {name}
      </p>
    </a>
  );
}

export default NavigationLink;
