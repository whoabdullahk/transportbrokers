import { Link, useLocation } from "wouter";
import { useAdminMe, useAdminLogout, getAdminMeQueryKey } from "@workspace/api-client-react";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Truck,
  Package,
  Inbox,
  Users,
  LogOut,
  Loader2,
  Menu,
  X,
  FileText,
  CheckSquare,
  ShieldCheck,
  ExternalLink,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import BrandLogo from "@/components/BrandLogo";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { data: admin, isLoading, isError } = useAdminMe({
    query: {
      retry: false,
      queryKey: getAdminMeQueryKey(),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  });
  const logout = useAdminLogout();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('admin_token');
      queryClient.removeQueries({ queryKey: getAdminMeQueryKey() });
      setLocation("/login");
    }
  }, [isError, setLocation, queryClient]);

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem('admin_token');
        queryClient.clear();
        setLocation("/login");
      }
    });
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  if (isLoading || !admin) {
    return (
      <div className="min-h-screen bg-[#0b0d11] flex flex-col items-center justify-center text-white">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-mono uppercase tracking-[0.25em] animate-pulse">
          INITIALIZING SECURE SESSION
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, badge: "Overview" },
    { href: "/loads", label: "Active Loads", icon: Package, badge: null },
    { href: "/rate-confirmations", label: "Rate Confirmations", icon: FileText, badge: "Dispatch" },
    { href: "/leads", label: "Shipper Leads", icon: Inbox, badge: null },
    { href: "/users", label: "Admin Personnel", icon: Users, badge: null },
    { href: "/todos", label: "Task Board", icon: CheckSquare, badge: null },
  ];

  const currentRouteName =
    navItems.find((item) => (item.href === "/" ? location === "/" : location.startsWith(item.href)))?.label ||
    "Admin Operations";

  return (
    <div className="min-h-screen bg-[#0b0d11] text-foreground flex flex-col md:flex-row font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border/80 bg-[#101319]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <BrandLogo size={32} showText={false} />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white leading-tight">
              GOLD STAR <span className="text-[#D4AF37]">TRANSPORTATION</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">PORTAL DISPATCH</span>
          </div>
        </div>
        <button
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Enterprise SaaS Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-[#101319] border-r border-border/80 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-border/80 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center gap-3.5 group">
            <BrandLogo size={42} showText={false} />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white leading-none">
                GOLD STAR <span className="text-[#D4AF37]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ENTERPRISE PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* System Telemetry Strip */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-border/50 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="text-gray-400">STATUS:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> ONLINE (USDOT 253494)
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70 font-semibold">
            Operations Navigation
          </div>

          {navItems.map((item) => {
            const isActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative",
                  isActive
                    ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.08)]"
                    : "text-neutral-400 hover:bg-white/[0.04] hover:text-white border border-transparent"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      "w-4 h-4 transition-transform group-hover:scale-110",
                      isActive ? "text-[#D4AF37]" : "text-neutral-400 group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md",
                      isActive
                        ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                        : "bg-white/5 text-neutral-400 group-hover:bg-white/10"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Public Website Preview Shortcut */}
        <div className="px-4 py-2 border-t border-border/50">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
          >
            <span>Live Carrier Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          </a>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-border/80 bg-black/40">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37]/30 to-[#F4C542]/10 border border-[#D4AF37]/30 flex items-center justify-center font-bold text-xs text-[#D4AF37] shrink-0">
                {(admin.name || "A").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white truncate">{admin.name}</span>
                <span className="text-[10px] text-muted-foreground font-mono truncate">{admin.email}</span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 shrink-0 rounded-xl w-8 h-8 transition-colors cursor-pointer"
              title="Log Out Session"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main App Workspace */}
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden bg-[#0c0e12]">
        {/* Top Context Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-border/60 bg-[#101319]/50 backdrop-blur-md shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Console</span>
            <span className="text-muted-foreground/40 font-mono">/</span>
            <span className="text-xs font-bold text-white tracking-wide">{currentRouteName}</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DISPATCH TELEMETRY ACTIVE</span>
            </div>
            <div className="text-xs font-mono font-bold text-[#D4AF37] px-2.5 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              {currentTime || "12:00:00 PM"}
            </div>
          </div>
        </header>

        {/* Scrollable View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
