import { motion } from "framer-motion";
import { Users, MapPin } from "lucide-react";
import { Room, typeLabels, typeColors } from "@/data/rooms";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RoomCardProps {
  room: Room;
  index: number;
  onBook: (room: Room) => void;
}

const RoomCard = ({ room, index, onBook }: RoomCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group overflow-hidden rounded-xl border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className={typeColors[room.type]}>
            {typeLabels[room.type]}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          {room.name}
        </h3>

        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {room.capacity} pers.
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {room.floor}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {a}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-lg font-bold text-foreground">
            {room.pricePerHour}€<span className="text-sm font-normal text-muted-foreground">/h</span>
          </p>
          <Button size="sm" onClick={() => onBook(room)}>
            Réserver
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard;
