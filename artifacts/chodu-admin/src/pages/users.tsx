import { AdminLayout } from "@/components/admin-layout";
import {
  useAdminListUsers,
  useAdminListRoles,
  useAdminCreateUser,
  useAdminUpdateUser,
  useAdminDeleteUser,
  useAdminMe,
  getAdminListUsersQueryKey,
  getAdminMeQueryKey,
} from "@workspace/api-client-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Loader2, KeyRound, ShieldCheck, UserPlus, Users, Search } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { AdminUserDetail } from "@workspace/api-client-react";
import { format } from "date-fns";

const createSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "At least 8 characters"),
  roleId: z.coerce.number().min(1, "Select a role"),
});

const editSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional().or(z.literal("")),
  roleId: z.coerce.number().min(1, "Select a role"),
  isActive: z.boolean(),
});

type CreateFormValues = z.infer<typeof createSchema>;
type EditFormValues = z.infer<typeof editSchema>;

export default function AdminUsers() {
  const { data: users, isLoading } = useAdminListUsers();
  const { data: roles } = useAdminListRoles();
  const { data: me } = useAdminMe({ query: { queryKey: getAdminMeQueryKey() } });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserDetail | null>(null);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMutation = useAdminCreateUser();
  const updateMutation = useAdminUpdateUser();
  const deleteMutation = useAdminDeleteUser();

  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", email: "", password: "", roleId: undefined as unknown as number },
  });

  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { name: "", email: "", password: "", roleId: 0, isActive: true },
  });

  const filteredUsers = users?.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.roleName.toLowerCase().includes(search.toLowerCase())
  );

  const onCreateSubmit = (values: CreateFormValues) => {
    createMutation.mutate({ data: values }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListUsersQueryKey() });
        setIsCreateOpen(false);
        createForm.reset({ name: "", email: "", password: "", roleId: undefined as unknown as number });
        toast({ title: "Admin created successfully" });
      },
      onError: (error: any) => {
        const message = error?.response?.status === 409 ? "That email is already in use" : "Failed to create admin";
        toast({ title: message, variant: "destructive" });
      }
    });
  };

  const openEdit = (user: AdminUserDetail) => {
    editForm.reset({
      name: user.name,
      email: user.email,
      password: "",
      roleId: user.roleId,
      isActive: user.isActive,
    });
    setEditingUser(user);
  };

  const onEditSubmit = (values: EditFormValues) => {
    if (!editingUser) return;
    const data: Record<string, unknown> = {
      name: values.name,
      email: values.email,
      roleId: values.roleId,
      isActive: values.isActive,
    };
    if (values.password) data.password = values.password;

    updateMutation.mutate({ id: editingUser.id, data }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListUsersQueryKey() });
        setEditingUser(null);
        toast({ title: "Admin updated successfully" });
      },
      onError: (error: any) => {
        const message = error?.response?.status === 409 ? "That email is already in use" : "Failed to update admin";
        toast({ title: message, variant: "destructive" });
      }
    });
  };

  const onDelete = (id: number) => {
    deleteMutation.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminListUsersQueryKey() });
        toast({ title: "Admin deleted successfully" });
      },
      onError: () => toast({ title: "Failed to delete admin", variant: "destructive" })
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Access &amp; Role Governance</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Admin Personnel</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Manage operators, dispatch controllers, and credential authorization levels.
            </p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#D4AF37] hover:bg-[#F4C542] text-[#0B1220] font-bold rounded-xl text-xs shadow-md cursor-pointer">
                <UserPlus className="w-4 h-4 mr-1.5" />
                Add Admin User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#12151c] border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold text-white">Add New Admin User</DialogTitle>
              </DialogHeader>
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4 py-3">
                  <FormField control={createForm.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-mono text-neutral-400">Full Name</FormLabel>
                      <FormControl><Input {...field} placeholder="Brandon Taylor" className="bg-black/40 border-white/10 rounded-xl" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={createForm.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-mono text-neutral-400">Email Address</FormLabel>
                      <FormControl><Input type="email" {...field} placeholder="admin@goldstartranposrtationinc.com" className="bg-black/40 border-white/10 rounded-xl" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={createForm.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-mono text-neutral-400">Initial Password</FormLabel>
                      <FormControl><Input type="text" {...field} placeholder="At least 8 characters" className="bg-black/40 border-white/10 rounded-xl font-mono" /></FormControl>
                      <FormDescription className="text-[11px] text-neutral-500">Provide this temporary credential directly to the operator.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={createForm.control} name="roleId" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase font-mono text-neutral-400">Assigned Role</FormLabel>
                      <Select onValueChange={(v) => field.onChange(Number(v))} value={field.value ? String(field.value) : undefined}>
                        <FormControl>
                          <SelectTrigger className="bg-black/40 border-white/10 rounded-xl">
                            <SelectValue placeholder="Select authorization role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#12151c] border-white/10 text-white">
                          {roles?.map((role) => (
                            <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <DialogFooter className="pt-2">
                    <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-black font-bold w-full sm:w-auto rounded-xl" disabled={createMutation.isPending}>
                      {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Create Account
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 bg-[#12151c] border border-white/10 rounded-2xl px-3 py-1.5 w-full max-w-md shadow-sm">
            <Search className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
            <Input
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9 text-xs text-white placeholder:text-neutral-500 font-medium"
            />
          </div>

          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span>OPERATORS:</span>
            <span className="font-bold text-white px-2 py-1 rounded-md bg-white/5 border border-white/10">
              {filteredUsers?.length || 0} Total
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 bg-[#12151c] overflow-hidden shadow-xl">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Personnel</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Email Address</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Authorization Role</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Status</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400">Last Session</TableHead>
                <TableHead className="font-mono text-xs uppercase text-neutral-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#D4AF37]" />
                  </TableCell>
                </TableRow>
              ) : filteredUsers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-neutral-400 text-xs font-mono uppercase tracking-wider">
                    No admin personnel found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user) => (
                  <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.03] transition-colors group">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                          {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{user.name}</span>
                          {me?.id === user.id && (
                            <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-mono border border-[#D4AF37]/30 bg-[#D4AF37]/10 rounded px-1.5 py-0.5">
                              Current User
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-neutral-300">{user.email}</TableCell>
                    <TableCell>
                      <span className="text-xs uppercase tracking-wider font-mono bg-black/40 px-2.5 py-1 rounded-md border border-white/10 inline-flex items-center gap-1.5 text-neutral-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {user.roleName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-md border font-semibold ${
                        user.isActive
                          ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                          : "text-neutral-400 bg-white/5 border-white/10"
                      }`}>
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-neutral-400">
                      {user.lastLoginAt ? format(new Date(user.lastLoginAt), "MMM d, yyyy h:mm a") : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-neutral-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                          onClick={() => openEdit(user)}
                          title="Edit User"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                              disabled={me?.id === user.id}
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-[#12151c] border-white/10 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-lg font-bold text-white">Revoke Admin Access</AlertDialogTitle>
                              <AlertDialogDescription className="text-xs text-neutral-400 leading-relaxed">
                                Are you sure you want to permanently revoke access for <strong className="text-white">{user.name}</strong>? This user will no longer be able to log in to the portal.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="pt-2">
                              <AlertDialogCancel className="bg-transparent border-white/10 text-neutral-300 hover:bg-white/5">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(user.id)}
                                className="bg-rose-600 hover:bg-rose-500 text-white font-bold"
                              >
                                Revoke Access
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="sm:max-w-[500px] bg-[#12151c] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">Edit Admin Account: {editingUser?.name}</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 py-3">
              <FormField control={editForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-mono text-neutral-400">Full Name</FormLabel>
                  <FormControl><Input {...field} className="bg-black/40 border-white/10 rounded-xl" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-mono text-neutral-400">Email Address</FormLabel>
                  <FormControl><Input type="email" {...field} className="bg-black/40 border-white/10 rounded-xl" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-xs uppercase font-mono text-neutral-400">
                    <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" /> Reset Password
                  </FormLabel>
                  <FormControl><Input type="text" placeholder="Leave blank to preserve existing password" {...field} className="bg-black/40 border-white/10 rounded-xl font-mono text-xs" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="roleId" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-mono text-neutral-400">Authorization Role</FormLabel>
                  <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger className="bg-black/40 border-white/10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#12151c] border-white/10 text-white">
                      {roles?.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="isActive" render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-xl border border-white/10 p-3 bg-black/30">
                  <div className="space-y-0.5">
                    <FormLabel className="text-xs font-bold text-white">Account Active</FormLabel>
                    <FormDescription className="text-[11px] text-neutral-400">Disabled users are blocked from console sessions.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={me?.id === editingUser?.id}
                    />
                  </FormControl>
                </FormItem>
              )} />
              <DialogFooter className="pt-2 gap-2">
                <Button type="button" variant="outline" onClick={() => setEditingUser(null)} className="border-white/10 text-neutral-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#F4C542] text-black font-bold rounded-xl" disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
