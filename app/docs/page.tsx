'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Book, Code, Database, Folder  } from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  const docSections = [
    { icon: Book, title: 'Guía de Inicio', href: '/docs/getting-started', description: 'Aprende cómo comenzar con nuestros modelos de IA.' },
    { icon: Code, title: 'Code Reference', href: '/docs/code-reference', description: 'Documentación detallada de nuestro código de entrenamiento IA.' },
    { icon: Database, title: 'Modelos y Datasets', href: '/docs/models-and-datasets', description: 'Información sobre nuestros modelos de IA y conjuntos de datos.' },
    { icon: Folder, title: 'Recursos', href: '/docs/resources', description: 'Recursos adicionales y herramientas para trabajar con nuestros modelos de IA.' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Documentación
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        {docSections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-card p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={section.href} className="block">
              <div className="flex items-center mb-4">
                <section.icon className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </div>
              <p className="text-muted-foreground">{section.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

