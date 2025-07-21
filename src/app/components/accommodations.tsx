"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import styles from '../styles/accomodations.module.css';
import Image from 'next/image';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

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
      <Swiper
        slidesPerView={1}
        breakpoints={{
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }}
        spaceBetween={32}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.mySwiper}
      >
        {accommodations.map((acc) => (
          <SwiperSlide key={acc.name}>
            <Card sx={{ minWidth: 0, maxWidth: '100%', width: '100%', height: 320, boxShadow: 'none', position: 'relative', overflow: 'hidden', borderRadius: 24, mx: 0, my: 0, p: 0, background: 'none' }}>
              <CardCover>
                <Image src={acc.image} alt={acc.name} fill style={{ objectFit: 'cover', filter: 'drop-shadow(0 4px 24px var(--color-shadow-strong))' }} />
              </CardCover>
              <CardCover
                sx={{
                  background: 'linear-gradient(to top, var(--color-overlay-medium), rgba(0,0,0,0) 200px), linear-gradient(to top, var(--color-overlay-gradient-bottom), rgba(0,0,0,0) 300px)',
                }}
              />
              <CardContent sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', color: 'var(--color-text-on-dark)', background: 'none' }}>
                <Typography level="h3" sx={{ fontSize: '1.4rem', fontWeight: 'bold', mb: 1, color: 'var(--color-text-on-dark)' }}>{acc.name}</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 1, color: 'var(--color-text-on-dark)' }}>{acc.price} / nuit / personne</Typography>
                <Typography level="body-sm" sx={{ fontSize: '1rem', opacity: 0.85, mb: 2, color: 'var(--color-text-on-dark)' }}>Pour {acc.people} personne{acc.people > 1 ? 's' : ''}</Typography>
                <Button component="a" href={acc.url} target="_blank" rel="noopener noreferrer" variant="soft" color="primary" sx={{ textDecoration: 'underline', fontSize: '1rem', mt: 1 }}>
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
