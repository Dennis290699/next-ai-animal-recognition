'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Book, FileText, Download, ArrowLeft } from 'lucide-react'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useActiveSection } from "@/hooks/useActiveSection"

const sections = [
  { id: 'notebook-kaggle', title: 'Notebook de Kaggle', icon: FileText },
  { id: 'notebook-colab', title: 'Notebook de Colab', icon: FileText },
  { id: 'model-keras', title: 'Modelo en formato .keras', icon: Download },
  { id: 'model-h5', title: 'Modelo en formato .h5', icon: Download },
]

export default function ResourcesPage() {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const { activeSection, scrollToSection } = useActiveSection(sections.map((section) => section.id))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/docs" className="flex items-center text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Documentación
          </Link>
        </Button>
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Recursos para el Proyecto de IA
        </motion.h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.nav
          className="lg:w-1/4 border-r border-gray-300 pr-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="sticky top-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Book className="mr-2" />
              Índice
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary hover:text-primary-foreground"
                      }`}
                    aria-current={activeSection === section.id ? "true" : "false"}
                  >
                    <section.icon className="mr-2 h-5 w-5" />
                    <span>{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
        <motion.div
          className="lg:w-3/4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Descarga y consulta de recursos</h2>
          <p className="mb-8 text-lg">
            Aquí encontrarás los recursos relacionados con el entrenamiento y uso de nuestros modelos de IA.
          </p>

          <section ref={(el) => { sectionRefs.current['notebook-kaggle'] = el; }} id="notebook-kaggle" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" />
              Notebook de Kaggle
            </h3>
            <p className="mb-4">Consulta el notebook de Kaggle utilizado para el entrenamiento del modelo y manejo del dataset:</p>
            <a
              href="https://www.kaggle.com/code/asmodeus6646/trabajo-final-grupo7-ia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ir al notebook de Kaggle
            </a>
          </section>

          <section ref={(el) => { sectionRefs.current['notebook-colab'] = el; }} id="notebook-colab" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" />
              Notebook de Colab
            </h3>
            <p className="mb-4">Accede al notebook de Google Colab para transformar los modelos a formato JSON:</p>
            <a
              href="https://colab.research.google.com/drive/1OzjG0FbZzqowRzzH7k4RtTFa_41A2xyL#scrollTo=ZWTQS3OuNTAu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ir al notebook de Colab
            </a>
          </section>

          <section ref={(el) => { sectionRefs.current['model-keras'] = el; }} id="model-keras" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Download className="mr-2" />
              Modelo en formato .keras
            </h3>
            <p className="mb-4">Descarga el modelo entrenado en formato .keras:</p>
            <a
              href="https://www.mediafire.com/file/f39zbonlh36s1ur/final_model.keras/file"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Descargar modelo .keras
            </a>
          </section>

          <section ref={(el) => { sectionRefs.current['model-h5'] = el; }} id="model-h5" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Download className="mr-2" />
              Modelo en formato .h5
            </h3>
            <p className="mb-4">Descarga el modelo entrenado en formato .h5:</p>
            <a
              href="/ruta/a/tu-modelo.h5"
              download
              className="text-blue-600 hover:underline"
            >
              Descargar modelo .h5
            </a>
          </section>

          <Link href="/docs" className="flex items-center text-primary mb-4 ">
            <ArrowLeft className="mr-2" />
            Volver a Documentación
          </Link>

        </motion.div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}
