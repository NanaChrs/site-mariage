"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { Pagination } from 'swiper/modules';

interface Accommodation {
  name: string;
  image: string;
  price: string;
  people: number;
  url: string;
}

const accommodations: Accommodation[] = [
  {
    name: 'Hôtel du Lac',
    image: '/file.svg',
    price: '80€',
    people: 2,
    url: 'https://hotel-du-lac.example.com',
  },
  {
    name: 'Gîte des Pins',
    image: '/globe.svg',
    price: '60€',
    people: 4,
    url: 'https://gite-des-pins.example.com',
  },
  {
    name: 'Chambre chez l’habitant',
    image: '/window.svg',
    price: '40€',
    people: 1,
    url: 'https://chambre-habitant.example.com',
  },
];

export default function AccommodationsCarousel() {
  return (
    <div>
      <Typography level="h2" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Suggestions de logements
      </Typography>
      <Swiper pagination={{ dynamicBullets: true }} modules={[Pagination]}>
        {accommodations.map((acc) => (
          <SwiperSlide key={acc.name}>
            <Card variant="outlined" sx={{ minWidth: 280, maxWidth: 320, mx: 'auto', my: 2 }}>
              <Image src={acc.image} alt={acc.name} width={300} height={180} style={{ borderRadius: 12, objectFit: 'cover' }} />
              <CardContent>
                <Typography level="h3" sx={{ fontSize: '1.2rem', fontWeight: 'bold', mt: 1 }}>{acc.name}</Typography>
                <Typography level="body-md" sx={{ color: 'neutral.700', mb: 1 }}>{acc.price} / nuit / personne</Typography>
                <Typography level="body-sm" sx={{ color: 'neutral.600', mb: 2 }}>Pour {acc.people} personne{acc.people > 1 ? 's' : ''}</Typography>
                <Button component="a" href={acc.url} target="_blank" rel="noopener noreferrer" variant="soft" color="primary">
                  Voir le logement
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
