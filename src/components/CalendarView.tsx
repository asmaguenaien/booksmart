import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/rooms";

const timeSlots = Array.from({ length: 10 }, (_, i) => `${8 + i}:00`);

// Fake bookings
const bookedSlots = new Set([
  '1-0-9:00', '1-0-10:00', '1-0-11:00',
  '3-1-14:00', '3-1-15:00',
  '2-2-10:00', '2-2-11:00', '2-2-12:00',
  '5-3-9:00', '5-3-10:00',
]);

const CalendarView = () => {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
  const days = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-bold text-foreground">Calendrier des disponibilités</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setWeekStart(addDays(weekStart, -7))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="min-w-[200px] text-center text-sm font-medium text-foreground">
            Semaine du {format(weekStart, "d MMMM yyyy", { locale: fr })}
          </span>
          <Button variant="outline" size="icon" onClick={() => setWeekStart(addDays(weekStart, 7))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {rooms.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRoom(r.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedRoom === r.id
                ? 'gradient-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-secondary'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card shadow-card">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="border-b bg-muted/50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Heure
              </th>
              {days.map((day) => (
                <th
                  key={day.toISOString()}
                  className={`border-b px-4 py-3 text-center text-sm font-semibold ${
                    isSameDay(day, new Date()) ? 'bg-accent text-accent-foreground' : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <div>{format(day, 'EEE', { locale: fr })}</div>
                  <div className="text-lg">{format(day, 'd')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot} className="border-b last:border-b-0">
                <td className="px-4 py-3 text-sm font-medium text-muted-foreground">{slot}</td>
                {days.map((day, dayIdx) => {
                  const key = `${selectedRoom}-${dayIdx}-${slot}`;
                  const isBooked = bookedSlots.has(key);
                  return (
                    <td key={day.toISOString()} className="px-2 py-2 text-center">
                      <button
                        className={`h-8 w-full rounded-md text-xs font-medium transition-colors ${
                          isBooked
                            ? 'bg-destructive/10 text-destructive cursor-not-allowed'
                            : 'bg-accent/50 text-accent-foreground hover:gradient-primary hover:text-primary-foreground'
                        }`}
                        disabled={isBooked}
                      >
                        {isBooked ? 'Réservé' : 'Libre'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default CalendarView;
