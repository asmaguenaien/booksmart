export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'meeting' | 'coworking' | 'event';
  amenities: string[];
  image: string;
  pricePerHour: number;
  floor: string;
}

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Salle Horizon',
    capacity: 8,
    type: 'meeting',
    amenities: ['Écran 4K', 'Vidéoconférence', 'Tableau blanc'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    pricePerHour: 35,
    floor: 'Étage 2',
  },
  {
    id: '2',
    name: 'Espace Nova',
    capacity: 20,
    type: 'coworking',
    amenities: ['Wi-Fi haut débit', 'Prises USB', 'Machine à café'],
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=600&h=400&fit=crop',
    pricePerHour: 15,
    floor: 'Rez-de-chaussée',
  },
  {
    id: '3',
    name: 'Auditorium Lumière',
    capacity: 100,
    type: 'event',
    amenities: ['Scène', 'Système audio', 'Projecteur HD', 'Micro sans fil'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
    pricePerHour: 120,
    floor: 'Étage 1',
  },
  {
    id: '4',
    name: 'Salle Zénith',
    capacity: 4,
    type: 'meeting',
    amenities: ['Écran tactile', 'Vidéoconférence', 'Insonorisation'],
    image: 'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=600&h=400&fit=crop',
    pricePerHour: 25,
    floor: 'Étage 3',
  },
  {
    id: '5',
    name: 'Hub Créatif',
    capacity: 12,
    type: 'coworking',
    amenities: ['Bureaux ajustables', 'Imprimante 3D', 'Cuisine équipée'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    pricePerHour: 20,
    floor: 'Étage 1',
  },
  {
    id: '6',
    name: 'Terrasse Panorama',
    capacity: 50,
    type: 'event',
    amenities: ['Vue panoramique', 'Espace extérieur', 'Bar', 'Éclairage ambiant'],
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
    pricePerHour: 90,
    floor: 'Rooftop',
  },
];

export const typeLabels: Record<Room['type'], string> = {
  meeting: 'Salle de réunion',
  coworking: 'Coworking',
  event: 'Événement',
};

export const typeColors: Record<Room['type'], string> = {
  meeting: 'bg-primary/10 text-primary',
  coworking: 'bg-accent text-accent-foreground',
  event: 'bg-secondary text-secondary-foreground',
};
