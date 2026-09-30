export interface Hotel {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  amenities: string[];
}

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Pousada do Mar',
    description: 'Quartos simples a poucos passos da praia.',
    fullDescription: 'A Pousada do Mar oferece uma experiência relaxante e acolhedora de frente para o mar. Aproveite nosso café da manhã tropical e a brisa do oceano em acomodações confortáveis.',
    price: 250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    location: 'Praia do Rosa, SC',
    amenities: ['Wi-Fi Grátis', 'Piscina', 'Vista para o Mar', 'Café da Manhã'],
  },
  {
    id: '2',
    name: 'Hotel Centro',
    description: 'No coração da cidade, perto de tudo.',
    fullDescription: 'Ideal para quem busca praticidade e conforto no centro urbano. Próximo aos principais pontos turísticos, restaurantes e centros de negócios.',
    price: 320,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    location: 'Centro, São Paulo - SP',
    amenities: ['Wi-Fi Grátis', 'Academia', 'Estacionamento', 'Restaurante'],
  },
  {
    id: '3',
    name: 'Casa da Serra',
    description: 'Chalés tranquilos cercados de verde.',
    fullDescription: 'Refúgio perfeito para relaxar e se conectar com a natureza. Nossos chalés possuem lareira, vista para as montanhas e ambiente super aconchegante.',
    price: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
    location: 'Gramado, RS',
    amenities: ['Lareira', 'Café da Manhã', 'Estacionamento', 'Pet Friendly'],
  },
];