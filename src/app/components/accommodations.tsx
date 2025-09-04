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
import CircularProgress from '@mui/joy/CircularProgress';
import {useEffect, useState} from "react";

type Accommodation = {
    name: string;
    travel_time_in_minutes: number;
    url: string;
    image_url: string;
    number_of_person: number;
    price_per_night: number;
}

export default function Accommodations() {
  const [accomodations, setAccomodations] = useState<Accommodation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  async function fetchAccommodations() {
    const res = await fetch('/api/accommodations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = res.ok ? await res.json() : [];
    setAccomodations(data);
    // Marquer comme chargé après un petit délai
    setTimeout(() => setIsLoaded(true), 200);
  }

  // Ne rendre le Swiper que quand les données sont chargées
  if (!isLoaded || accomodations.length === 0) {
    return (
      <div className={styles.accomodationsSection}>
        <Typography level="h2" sx={{ mb: 3, textAlign: 'center' }}>
          Suggestions de logements
        </Typography>
        <div style={{
          padding: '60px 80px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <CircularProgress
            color="primary"
            size="lg"
            sx={{
              '--CircularProgress-size': '40px',
              '--CircularProgress-trackThickness': '3px',
              '--CircularProgress-progressThickness': '3px'
            }}
          />
          <Typography sx={{ color: '#F6005E', fontStyle: 'italic' }}>
            Chargement des logements...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.accomodationsSection} >
      <Typography level="h2" sx={{ mb: 3, textAlign: 'center' }}>
        Suggestions de logements
      </Typography>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 }
        }}
        spaceBetween={32}
        loop={true} // Remettre le loop maintenant que les données sont chargées
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.mySwiper}
        observer={true} // Active l'observer pour détecter les changements
        observeParents={true} // Observer les parents aussi
      >
        {accomodations.map((acc) => (
          <SwiperSlide key={acc.name}>
            <Card sx={{ minWidth: 0, maxWidth: '100%', width: '100%', height: 320, boxShadow: 'none', position: 'relative', overflow: 'hidden', borderRadius: 24, mx: 0, my: 0, p: 0, background: 'none' }}>
              <CardCover>
                <Image src={acc.image_url} alt={acc.name} fill style={{ objectFit: 'cover', filter: 'drop-shadow(0 4px 24px var(--color-shadow-strong))' }} />
              </CardCover>
              <CardCover
                sx={{
                  background: 'linear-gradient(to top, var(--color-overlay-medium), rgba(0,0,0,0) 200px), linear-gradient(to top, var(--color-overlay-gradient-bottom), rgba(0,0,0,0) 300px)',
                }}
              />
              <CardContent sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', color: 'var(--color-text-on-dark)', background: 'none' }}>
                <Typography level="h3" sx={{ fontSize: '1.4rem', mb: 1, color: 'var(--color-text-on-dark)' }}>{acc.name}</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 1, color: 'var(--color-text-on-dark)' }}>À {acc.travel_time_in_minutes} minutes</Typography>
                <Typography level="body-md" sx={{ fontSize: '1.1rem', fontWeight: 500, mb: 1, color: 'var(--color-text-on-dark)' }}>{acc.price_per_night} / nuit</Typography>
                <Typography level="body-sm" sx={{ fontSize: '1rem', opacity: 0.85, mb: 2, color: 'var(--color-text-on-dark)' }}>Pour {acc.number_of_person} personne{acc.number_of_person > 1 ? 's' : ''}</Typography>
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
