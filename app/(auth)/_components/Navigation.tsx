"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BookCheck } from "lucide-react";
import { ComponentPropsWithoutRef, ComponentRef } from "react";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tasks</NavigationMenuTrigger>
          <NavigationMenuContent className={"bg-white dark:bg-black"}>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/tasks"
                  >
                    <BookCheck size={60} className={"m-auto"} />
                    <div className="mb-2 mt-4 text-lg font-medium">Tasks</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Display your tasks in a nice looking way.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shopping" title="Shopping List">
                Add, or display items in your shopping list.
              </ListItem>
              <ListItem href="/calendar" title="Calendar">
                Display your tasks in a Calendar, to see Deadline of each task
              </ListItem>
              <ListItem href="/analysis" title="Analysis">
                Analysis of completed tasks
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/settings"
            passHref
            className={navigationMenuTriggerStyle()}
          >
            Settings
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  ComponentRef<"a">,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
