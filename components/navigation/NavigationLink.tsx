import { SidebarProps } from "@/constants/types";
import { usePathname } from "next/navigation";

const NavigationLink = ({ children, name, route, isOpen }: SidebarProps) => {
  const path = usePathname();

  const isActive =
    path === `/dashboard` && name === 'dashboard' ||
    path.startsWith(`/dashboard/${name}`) ||
    path.startsWith(`/${name}`);

  return (
    <a
      href={route}
      className={`flex p-2 rounded cursor-pointer place-items-center gap-3 transition-all duration-300 text-sidebar
      ${isActive ? "bg-gradient-to-t from-[#35d7ff] via-[#000099] to-[#000]" : "hover:bg-neutral-700/30"}`}
    >
      <span>{children}</span>
      <p
        className={`text-inherit font-poppins overflow-clip whitespace-nowrap tracking-wide capitalize ${
          isOpen ? "opacity-100" : "opacity-0 lg:opacity-100"
        }`}
      >
        {name}
      </p>
    </a>
  );
};

export default NavigationLink;
