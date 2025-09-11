'use client'

import { Book, Menu, Sunset, Trees, Zap, TreePine, Mountain, ChevronDown, Wand2, ImageIcon, ImageDown, Sparkles, Edit3, Palette } from "lucide-react";
import UserDropdown from "@/components/UserDropdown";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: JSX.Element;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "/logo-192.png",
    alt: "DreamfinityX Logo",
    title: "DreamfinityX",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "AI Generator", url: "/generate" },
    { title: "AI Editor", url: "/edit" },
    {
      title: "Style Transfer",
      url: "#",
      items: [
        {
          title: "Ghibli Style",
          description: "Transform into Studio Ghibli art",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/ghibli-style-converter",
        },
        {
          title: "Pixar Style",
          description: "Convert to Pixar animation",
          icon: <Sparkles className="size-5 shrink-0" />,
          url: "/pixar-style-converter",
        },
      ],
    },
    { title: "Pricing", url: "/pricing" },
  ],
  mobileExtraLinks = [
    { name: "FAQ", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Privacy", url: "/privacy" },
    { name: "Terms", url: "/terms" },
  ],
}: Navbar1Props) => {
  // 添加状态来管理悬停菜单
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 处理菜单打开
  const handleOpen = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenPopover(title);
  };
  
  // 处理菜单关闭，添加延迟
  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setOpenPopover(null);
      timeoutRef.current = null;
    }, 150); // 150ms的延迟，可以根据需要调整
  };
  
  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-4 bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} width={40} height={40} className="w-10 h-10 rounded-lg" alt={logo.alt} unoptimized />
              <span className="text-xl font-bold text-gray-900">{logo.title}</span>
            </a>
            <div className="flex items-center">
              <div className="flex gap-2">
                {menu.map((item) => renderMenuItem(
                  item, 
                  openPopover, 
                  handleOpen,
                  handleClose
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <UserDropdown />
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <Image src={logo.src} width={40} height={40} className="w-10 h-10 rounded-lg" alt={logo.alt} unoptimized />
              <span className="text-xl font-bold text-gray-900">{logo.title}</span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <Image src={logo.src} width={40} height={40} className="w-10 h-10 rounded-lg" alt={logo.alt} unoptimized />
                      <span className="text-xl font-bold text-gray-900">
                        {logo.title}
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <UserDropdown />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (
  item: MenuItem, 
  openPopover: string | null,
  handleOpen: (title: string) => void,
  handleClose: () => void
) => {
  if (item.items) {
    return (
      <Popover 
        key={item.title}
        open={openPopover === item.title}
      >
        <div
          className="relative"
          onMouseEnter={() => handleOpen(item.title)}
          onMouseLeave={handleClose}
        >
          <PopoverTrigger asChild>
            <button 
              className="inline-flex items-center h-10 gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100"
            >
              {item.title}
              <ChevronDown className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[400px] p-0 bg-white rounded-md shadow-md"
            align="start"
            sideOffset={2} // 减小间隙
          >
            <ul className="grid gap-3 p-4">
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none items-center gap-3 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                    href={subItem.url}
                  >
                    <div className="bg-gray-100 p-2 rounded-md">
                      {subItem.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="line-clamp-2 mt-1 text-sm text-gray-500">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </div>
      </Popover>
    );
  }

  return (
    <a
      key={item.title}
      className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex flex-col space-y-2">
            {item.items.map((subItem) => (
              <a
                key={subItem.title}
                className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted"
                href={subItem.url}
              >
                {subItem.icon}
                <div>
                  <div className="text-sm font-semibold">{subItem.title}</div>
                  {subItem.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </a>
  );
};

export { Navbar1 }; 