import { useState, useRef } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoomCard from "@/components/RoomCard";
import CalendarView from "@/components/CalendarView";
import Chatbot from "@/components/Chatbot";
import { rooms, Room } from "@/data/rooms";

const Index = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const roomsRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    setActiveTab("rooms");
    setTimeout(() => roomsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleBook = (room: Room) => {
    toast.success(`Demande de réservation pour ${room.name}`, {
      description: "Consultez le calendrier pour choisir un créneau.",
    });
    setActiveTab("calendar");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "rooms" && (
        <>
          <HeroSection onExplore={handleExplore} />
          <section ref={roomsRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
              Nos espaces
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} onBook={handleBook} />
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "calendar" && <CalendarView />}

      <Chatbot />
    </div>
  );
};

export default Index;
