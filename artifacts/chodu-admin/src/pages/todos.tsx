import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin-layout';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ClipboardList, Trash2, Plus, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Todo {
  id: string | number;
  name: string;
  is_completed?: boolean;
}

export default function AdminTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on mount
  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          throw error;
        }

        setTodos(data || []);
      } catch (err: any) {
        console.error('Error fetching todos:', err);
        setError(err.message || 'Failed to fetch todos.');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  // Add a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoName.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      const { data, error } = await supabase
        .from('todos')
        .insert([{ name: newTodoName.trim() }])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setTodos((prev) => [...prev, ...data]);
      }
      setNewTodoName('');
    } catch (err: any) {
      console.error('Error adding todo:', err);
      setError(err.message || 'Failed to add todo.');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id: string | number, currentStatus: boolean) => {
    try {
      setError(null);
      const updatedStatus = !currentStatus;

      const { error } = await supabase
        .from('todos')
        .update({ is_completed: updatedStatus })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed: updatedStatus } : t))
      );
    } catch (err: any) {
      console.error('Error updating todo:', err);
      setError(err.message || 'Failed to update todo.');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string | number) => {
    try {
      setError(null);

      const { error } = await supabase.from('todos').delete().eq('id', id);

      if (error) {
        throw error;
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      console.error('Error deleting todo:', err);
      setError(err.message || 'Failed to delete todo.');
    }
  };

  const completedCount = todos.filter((t) => t.is_completed).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1">
              <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Operations Workflow Tracker</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Task Board</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Live checklist synchronized in real-time with the central Supabase operational database.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <span>COMPLETED:</span>{" "}
            <strong className="text-emerald-400 font-bold">{completedCount}</strong> of{" "}
            <strong className="text-white">{todos.length}</strong> Tasks
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span><strong>System Notice:</strong> {error}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Create Task Form */}
          <Card className="bg-[#12151c] border-white/10 shadow-xl lg:col-span-1">
            <CardHeader className="border-b border-white/5 pb-4">
              <CardTitle className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Create Operational Item
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handleAddTodo} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 font-mono uppercase tracking-wider block">
                    Task Title / Instruction
                  </label>
                  <Input
                    type="text"
                    value={newTodoName}
                    onChange={(e) => setNewTodoName(e.target.value)}
                    placeholder="E.g., Review TWIC clearance queue"
                    className="bg-black/40 border-white/10 rounded-xl text-xs text-white placeholder:text-neutral-500 h-11"
                    disabled={submitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitting || !newTodoName.trim()}
                  className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#F5D061] hover:from-[#e5bd3d] hover:to-[#ffd86b] text-black font-extrabold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2 stroke-[3]" />
                  )}
                  Add to Queue
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Active Tasks List */}
          <Card className="bg-[#12151c] border-white/10 shadow-xl lg:col-span-2 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
              <CardTitle className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                Active Checklist Queue
              </CardTitle>
              <ClipboardList className="w-4 h-4 text-[#D4AF37]" />
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-neutral-400 gap-2">
                  <Loader2 className="w-7 h-7 animate-spin text-[#D4AF37]" />
                  <span className="text-xs font-mono uppercase tracking-widest mt-1">Retrieving database tasks...</span>
                </div>
              ) : todos.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-xs font-mono uppercase tracking-wider">
                  No active tasks. Queue is clear.
                </div>
              ) : (
                <ul className="divide-y divide-white/5 space-y-1">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="py-3 px-3 rounded-xl hover:bg-white/[0.02] flex items-center justify-between gap-4 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleTodo(todo.id, !!todo.is_completed)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            todo.is_completed
                              ? "bg-emerald-500 border-emerald-500 text-black shadow-sm shadow-emerald-500/20"
                              : "border-white/20 hover:border-[#D4AF37] bg-black/40"
                          }`}
                        >
                          {todo.is_completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span
                          className={`text-sm leading-snug truncate ${
                            todo.is_completed
                              ? "line-through text-neutral-500 font-normal"
                              : "text-neutral-200 font-medium"
                          }`}
                        >
                          {todo.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
