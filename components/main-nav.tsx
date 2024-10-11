'use client'
import { cn } from "@/lib/utils";
import { Billboard } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation"

interface MainNavProps {
    data: Billboard[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {

    const pathname = usePathname();

    const routes = data.map((route: Billboard) => ({
        href: `/billboard/${route.id}`,
        label: route.label,
        active: pathname === `/billboard/${route.id}`,
    }));

  return (
    <>
        <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
            {routes.map((route: any) => (
                <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active? "text-primary" : "text-neutral-500"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    </>
  )
}

export default MainNav