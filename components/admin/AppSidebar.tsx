"use client"

import * as React from "react"
import {
  SettingsIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react"

import { NavMain } from "@/components/admin/NavMain"
import { NavUser } from "@/components/admin/NavUser"
import { TeamSwitcher } from "@/components/admin/TeamSwitcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Shohag",
    email: "admin@smgadgetbd.com",
    avatar: "/noavatar.png",
  },
  navMain: [
    {
      title: "Ecommerce",
      url: "#",
      icon: ShoppingCartIcon,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Add New",
          url: "/admin/products/new",
        },
        {
          title: "Orders",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: User2Icon,
      items: [
        {
          title: "Add New",
          url: "#",
        },
        {
          title: "User List",
          url: "#",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
