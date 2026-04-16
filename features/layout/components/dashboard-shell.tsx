import Link from "next/link";
import type { ReactElement, ReactNode } from "react";
type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: string;
  count?: string;
  isActive?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};
const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      {
        href: "/",
        label: "Dashboard",
        isActive: true,
        icon: (
          <svg
            className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        ),
      },
      {
        href: "/live-monitoring",
        label: "Live Monitoring",
        badge: "3",
        icon: (
          <svg
            className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Care",
    items: [
      {
        href: "/patients",
        label: "Patients",
        count: "142",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        href: "/scheduling",
        label: "Scheduling",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        ),
      },
      {
        href: "#",
        label: "Care Plans",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        ),
      },
      {
        href: "/medications",
        label: "Medications",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        href: "/staff",
        label: "Staff",
        count: "31",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
      },
      {
        href: "/incidents",
        label: "Incidents",
        badge: "2",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
      },
      {
        href: "/compliance",
        label: "Compliance",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        ),
      },
      {
        href: "/finance",
        label: "Finance",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
      },
      {
        href: "/reports",
        label: "Reports",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        href: "#",
        label: "Messages",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
      {
        href: "#",
        label: "Notifications",
        icon: (
          <svg className="h-[18px] w-[18px] shrink-0 opacity-50 group-hover/item:opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        ),
      },
    ],
  },
];
export function DashboardShell({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F9]">
      <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-[#0C1222] text-[rgba(255,255,255,0.55)] md:flex">
        <SidebarLogo />
        <nav className="flex-1 overflow-y-auto px-0 pb-2 pt-1.5">
          {navGroups.map((group) => (
            <SidebarGroup key={group.label} group={group} />
          ))}
        </nav>
        <SidebarUser />
      </aside>
      <div className="min-w-0 flex-1 overflow-y-auto">
        <main className="min-h-full p-6">{children}</main>
      </div>
    </div>
  );
}
function SidebarGroup({ group }: { group: NavGroup }): ReactElement {
  return (
    <div>
      <div className="px-5 pb-1.5 pt-5 text-[10px] font-bold uppercase tracking-[0.1em] text-[rgba(255,255,255,0.25)]">
        {group.label}
      </div>
      {group.items.map((item) => (
        <SidebarNavItem key={item.label} item={item} />
      ))}
    </div>
  );
}
function SidebarNavItem({ item }: { item: NavItem }): ReactElement {
  return (
    <Link
      href={item.href}
      className={[
        "group/item mx-2.5 my-px flex items-center gap-[11px] rounded-lg px-4 py-[9px] text-[13.5px] font-medium transition-all duration-100",
        item.isActive
          ? "bg-[rgba(99,182,140,0.12)] font-semibold text-[#63B68C]"
          : "text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.85)]",
      ].join(" ")}
    >
      {item.icon}
      <span>{item.label}</span>
      {item.badge ? (
        <span className="ml-auto min-w-[18px] rounded-md bg-[#D44040] px-1.5 text-center text-[10px] font-bold leading-4 text-white">
          {item.badge}
        </span>
      ) : null}
      {item.count ? (
        <span className="ml-auto text-[11px] text-[rgba(255,255,255,0.55)] opacity-50">
          {item.count}
        </span>
      ) : null}
    </Link>
  );
}
function SidebarLogo(): ReactElement {
  return (
    <div className="flex items-center gap-[11px] border-b border-[rgba(255,255,255,0.06)] px-5 pb-[18px] pt-[22px]">
      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-gradient-to-br from-[#63B68C] to-[#1A7F56] shadow-[0_2px_8px_rgba(99,182,140,0.3)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <div>
        <div className="font-heading text-[17px] font-extrabold tracking-[-0.02em] text-white">
          CareFlow
        </div>
        <div className="text-[10.5px] font-medium tracking-[0.02em] text-[rgba(255,255,255,0.3)]">
          HOME CARE PLATFORM
        </div>
      </div>
    </div>
  );
}
function SidebarUser(): ReactElement {
  return (
    <div className="flex items-center gap-2.5 border-t border-[rgba(255,255,255,0.06)] px-4 py-3.5">
      <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-gradient-to-br from-[#3574D4] to-[#5B8FDF] font-heading text-xs font-bold text-white">
        EC
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-semibold text-[rgba(255,255,255,0.9)]">
          Emma Clarke
        </div>
        <div className="text-[11px] text-[rgba(255,255,255,0.3)]">
          Care Coordinator
        </div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </div>
  );
}
