'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Info, Users, Lightbulb, Target } from 'lucide-react'

export default function AboutPage() {
  const projectInfo = [
    { icon: Info, title: 'Descripción', content: 'Este proyecto de Inteligencia Artificial fue desarrollado por el Grupo 7 como parte de la cátedra de IA. Nuestro objetivo es explorar y aplicar técnicas avanzadas de aprendizaje automático y procesamiento de imagenes.' },
    { icon: Users, title: 'Equipo', content: 'Nuestro equipo está compuesto por estudiantes apasionados por la IA, cada uno aportando habilidades únicas en programación, análisis de datos y diseño de algoritmos.' },
    { icon: Lightbulb, title: 'Innovación', content: 'Buscamos innovar en el campo de la IA mediante la implementación de algoritmos de vanguardia y la exploración de nuevas aplicaciones en diversos sectores.' },
    { icon: Target, title: 'Objetivos', content: 'Nuestros principales objetivos incluyen desarrollar modelos de IA eficientes, crear interfaces de usuario intuitivas para interactuar con estos modelos, y contribuir al avance del campo de la IA.' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Sobre el Proyecto
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        {projectInfo.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-card p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <item.icon className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-2xl font-semibold">{item.title}</h2>
            </div>
            <p className="text-muted-foreground">{item.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
