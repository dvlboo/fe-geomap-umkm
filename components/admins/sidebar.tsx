import Link from "next/link";
import { useRouter } from "next/router";
import { FiShoppingBag } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";

const NavItem = ({ href, label, icon }: { href: string; label: string; icon: any }) => {
const { pathname } = useRouter();
const active = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl transition 
      ${active ?"bg-black text-white":"text-gray-600 hover:bg-gray-200"}`}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
    );
};

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-52 bg-gray-100 sticky top-20 h-[calc(100vh-5rem)] overflow-auto">
      <nav className="px-3 space-y-2 mt-4">
        <NavItem href="/admin/dashboard" label="Dashboard" icon={<MdOutlineDashboard />}/>
        <NavItem href="/admin/umkm" label="Data UMKM" icon={<FiShoppingBag />}/>
        <NavItem href="/admin/profile" label="Profile" icon={<GoPerson />}/>
      </nav>

      <div className="absolute left-0 bottom-0 w-full p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl hover:cursor-pointer hover:bg-gray-950">
          Log out <span><MdLogout /></span>
        </button>
      </div>
    </aside>
  );
}