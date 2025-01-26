"use client";

import dynamic from 'next/dynamic';
import { motion } from "framer-motion";
import { SupportedAnimalsModal } from '@/components/SupportedAnimalsModal';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

// Cargar el componente ImageUpload de forma dinámica
const ImageUpload = dynamic(
  () => import('@/components/image-upload').then((mod) => mod.ImageUpload),
  {
    loading: () => (
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-full h-64 bg-gray-200 rounded-xl"></div>
        <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
      </div>
    ),
    ssr: false
  }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Animalia AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experimenta el poder de la inteligencia artificial en la identificación de animales. Sube tu propia imagen o prueba nuestras muestras
            para un reconocimiento instantáneo, impulsado por aprendizaje automático avanzado.
          </p>
          <div className="flex justify-center pt-4">
            <SupportedAnimalsModal />
          </div>
        </motion.div>
        <ImageUpload />
      </div>
      <ScrollToTopButton />
    </main>
  );
}
