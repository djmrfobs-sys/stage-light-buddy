import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { LogOut, CheckCircle, XCircle, Clock, CalendarDays, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface BookedDate {
  id: string;
  event_date: string;
  status: string;
  client_name: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: typeof Clock }> = {
  pending: { label: "Ожидает", variant: "secondary", icon: Clock },
  confirmed: { label: "Подтверждено", variant: "default", icon: CheckCircle },
  cancelled: { label: "Отменено", variant: "destructive", icon: XCircle },
};

const Admin = () => {
  const [bookings, setBookings] = useState<BookedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
        return;
      }
      fetchBookings();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin-login");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("booked_dates")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("booked_dates")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Статус обновлён" });
      fetchBookings();
    }
    setUpdatingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Управление бронированиями</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchBookings}>
              <RefreshCw className="h-4 w-4 mr-1" /> Обновить
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Выйти
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Всего", value: stats.total, color: "text-foreground" },
            { label: "Ожидает", value: stats.pending, color: "text-yellow-400" },
            { label: "Подтверждено", value: stats.confirmed, color: "text-primary" },
            { label: "Отменено", value: stats.cancelled, color: "text-destructive" },
          ].map((s) => (
            <Card key={s.label} className="border-border">
              <CardContent className="p-4 text-center">
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Все бронирования</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Загрузка...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Нет бронирований</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата события</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Создано</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => {
                    const cfg = statusConfig[booking.status] || statusConfig.pending;
                    const Icon = cfg.icon;
                    const isUpdating = updatingId === booking.id;

                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium text-foreground">
                          {format(new Date(booking.event_date), "dd MMMM yyyy", { locale: ru })}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {booking.client_name || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={cfg.variant} className="gap-1">
                            <Icon className="h-3 w-3" />
                            {cfg.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {format(new Date(booking.created_at), "dd.MM.yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            {booking.status !== "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isUpdating}
                                onClick={() => updateStatus(booking.id, "confirmed")}
                                className="text-primary border-primary/30 hover:bg-primary/10"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Подтвердить
                              </Button>
                            )}
                            {booking.status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isUpdating}
                                onClick={() => updateStatus(booking.id, "cancelled")}
                                className="text-destructive border-destructive/30 hover:bg-destructive/10"
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Отменить
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
