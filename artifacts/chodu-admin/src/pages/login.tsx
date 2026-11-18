import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdminLogin, useAdminMe, getAdminMeQueryKey } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LockKeyhole, ArrowRight, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import BrandLogo from "@/components/BrandLogo";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [_, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const { data: admin, isLoading: isChecking, isError: isMeError } = useAdminMe({
    query: {
      retry: false,
      queryKey: getAdminMeQueryKey(),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  });

  const login = useAdminLogin();

  useEffect(() => {
    if (admin && !isMeError) {
      setLocation("/");
    }
  }, [admin, isMeError, setLocation]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login.mutate({ data: values }, {
      onSuccess: (data) => {
        // Store token for cross-site Bearer auth
        const token = (data as any).token;
        if (token) localStorage.setItem('admin_token', token);
        queryClient.setQueryData(getAdminMeQueryKey(), data);
        setLocation("/");
      },
      onError: (error) => {
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (isChecking) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-[#0b0d11]">
        <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.25em] animate-pulse">
          INITIALIZING SECURE SESSION...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#090b0e] relative overflow-hidden p-4 selection:bg-[#D4AF37] selection:text-black">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-5%] w-[45%] h-[45%] bg-[#D4AF37]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-5%] w-[45%] h-[45%] bg-[#D4AF37]/5 blur-[140px] rounded-full" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]" aria-hidden="true">
          <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="#D4AF37" strokeWidth="1" />
          <line x1="100%" y1="0%" x2="0%" y2="100%" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#12151c]/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Header section */}
          <div className="p-8 border-b border-white/10 flex flex-col items-center justify-center bg-black/30 relative overflow-hidden">
            {/* Abstract scanner bar */}
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-[scan_3s_ease-in-out_infinite]" />

            <div className="mb-5 transform hover:scale-105 transition-transform">
              <BrandLogo size={52} showText={false} />
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white text-center">
              GOLD STAR <span className="text-[#D4AF37]">DISPATCH</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5 font-mono uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Authorized Personnel Portal
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="brandontaylor@goldstartranposrtationinc.com"
                          {...field}
                          className="bg-black/40 border-white/10 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl text-white placeholder:text-neutral-600 font-medium"
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-black/40 border-white/10 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl text-white font-mono pr-10"
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#F5D061] hover:from-[#e5bd3d] hover:to-[#ffd86b] text-[#090b0e] font-extrabold tracking-wider uppercase mt-3 rounded-xl transition-all shadow-lg shadow-[#D4AF37]/15 cursor-pointer"
                  disabled={login.isPending}
                >
                  {login.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      AUTHENTICATE SESSION <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* Security Notice Footer */}
          <div className="p-4 bg-black/50 border-t border-white/10 text-center text-[10px] text-neutral-500 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            256-Bit SSL Encrypted • Session Monitored
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(220px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
