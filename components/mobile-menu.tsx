'use client'

import { cn } from "@/lib/utils";
import { Billboard } from "@/types";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";


const MobileMenu = ({
    data
} : { data: Billboard[]}) => {

    const pathname = usePathname();

    const routes = data.map((route: Billboard) => ({
        href: `/billboard/${route.id}`,
        label: route.label,
        active: pathname === `/billboard/${route.id}`,
    }));

  return (
    <Sheet>
    <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden py-0 px-2">
            <Menu className="size-5"/>
        </Button>
    </SheetTrigger>
    <SheetContent side={'bottom'} className="rounded-t-3xl">
        <SheetHeader>
            <SheetTitle>
            Menu
            </SheetTitle>
        </SheetHeader>
        <div className='flex flex-col gap-5 mt-8'>
            {routes.map((route) => (
                <Fragment key={route.href}>
                    <Link 
                    href={route.href}
                    className={cn('text-sm font-medium transition-colors hover:text-primary', 
                    route.active ? 'text-primary font-bold dark:text-white' : 'text-muted-foreground')}
                    >
                        <SheetClose className='w-full'>
                        {route.label}
                        </SheetClose>
                    </Link>
                <Separator />
                </Fragment>
            ))}
        </div>
    </SheetContent>
    <SheetDescription className='hidden'>Menu</SheetDescription>
</Sheet>
  )
}

export default MobileMenu