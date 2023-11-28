import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideBarItemProps{
    url: string;
    name: string;
}
export  const  SideBarItem =({url, name}: SideBarItemProps)=>{

    const pathname = usePathname();

    const isActiveRoute = (path?: string): boolean =>{
      if(path === pathname) return true;
      return false;
    }
return(
    <li className={`py-2 px-4 text-blue-900 hover:bg-white font-bold`}>
    <Link href={url} className={`w-full h-full active:bg-red-200 ${isActiveRoute(url)? 'bg-reg-200' : ''}`}>{name}</Link>
  </li>
)
}