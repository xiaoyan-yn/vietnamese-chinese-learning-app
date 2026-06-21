"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Languages, MessageCircle, Star } from "lucide-react";

const navItems = [
  { href: "/", label: "Trang chu", icon: Home },
  { href: "/translate", label: "Dich", icon: Languages },
  { href: "/lessons", label: "Bai hoc", icon: BookOpen },
  { href: "/scenarios", label: "Tinh huong", icon: MessageCircle },
  { href: "/vocab", label: "Tu da luu", icon: Star },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-[480px] grid-cols-5 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-1 text-[11px] font-medium transition ${
                active
                  ? "bg-mint text-leaf"
                  : "text-slate-500 hover:bg-slate-50 hover:text-ink"
              }`}
            >
              <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
              <span className="leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
