'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Book, Database, Brain, Clock, UploadCloud, ArrowLeft, FileText } from 'lucide-react'
import { ScrollToTopButton } from '@/components/scroll-to-top-button'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useActiveSection } from "@/hooks/useActiveSection"

const sections = [
  { id: 'available-models', title: 'Modelo disponible', icon: Brain },
  { id: 'datasets-used', title: 'Dataset utilizado', icon: Database },
  { id: 'model-details', title: 'Detalles del modelo', icon: Clock },
  { id: 'image-upload', title: 'Subir una imagen', icon: UploadCloud },
  { id: 'dataset-origen', title: 'Dataset de origen', icon: FileText },
]

export default function ModelsAndDatasetsPage() {
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
          Predicción de Imágenes y Dataset
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
          <h2 className="text-3xl font-semibold mb-6">Información sobre el modelo y el dataset</h2>
          <p className="mb-8 text-lg">Este proyecto utiliza un modelo entrenado para predecir la clase de una imagen subida por el usuario. El modelo fue entrenado con datos de Kaggle y está optimizado para alta precisión en clasificación.</p>

          <section ref={(el) => { sectionRefs.current['available-models'] = el; }} id="available-models" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Brain className="mr-2" />
              Modelo disponible
            </h3>
            <p className="mb-4">El modelo implementado utiliza una arquitectura basada en redes convolucionales profundas (CNN) optimizadas para clasificación de imágenes.</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Precisión en conjunto de prueba: 95%</li>
              <li>Arquitectura: CNN personalizada con técnicas de regularización (dropout y batch normalization)</li>
              <li>Optimizado para tareas de clasificación multiclase</li>
            </ul>
          </section>

          <section ref={(el) => { sectionRefs.current['datasets-used'] = el; }} id="datasets-used" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Database className="mr-2" />
              Dataset utilizado
            </h3>
            <p className="mb-4">Este dataset de Kaggle contiene 64 clases de animales para tareas de clasificación multiclase.</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Total de clases:</strong> 64</li>
              <li><strong>Formato de las imágenes:</strong> PNG, 512x512 píxeles</li>
              <li><strong>Estructura:</strong> Cada clase tiene su propia carpeta con imágenes correspondientes</li>
              <li><strong>Ejemplos de clases:</strong> Antelope, Bear, Butterfly, Dolphin, Eagle, Elephant, Wolf, Whale, etc.</li>
              <li><strong>Última actualización:</strong> Hace 5 meses (versión 1)</li>
            </ul>
          </section>

          <section ref={(el) => { sectionRefs.current['model-details'] = el; }} id="model-details" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2" />
              Detalles del modelo
            </h3>
            <p className="mb-4">El modelo fue entrenado con TensorFlow y validado utilizando técnicas avanzadas de evaluación, asegurando un rendimiento robusto.</p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Algoritmo de optimización: Adam</li>
              <li>Función de pérdida: Categorical Crossentropy</li>
              <li>Épocas de entrenamiento: 90</li>
              <li>Visualización y monitoreo con TensorBoard</li>
            </ul>
          </section>

          <section ref={(el) => { sectionRefs.current['image-upload'] = el; }} id="image-upload" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <UploadCloud className="mr-2" />
              Subir una imagen
            </h3>
            <p className="mb-4">Puedes subir una imagen para realizar una predicción. El sistema clasificará la imagen según las categorías aprendidas por el modelo.</p>
          </section>

          <section ref={(el) => { sectionRefs.current['dataset-origen'] = el; }} id="dataset-origen" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" />
              Dataset de origen
            </h3>
            <p className="mb-4">El dataset de origen se encuentra en el siguiente enlace:</p>
            <a
              href="https://www.kaggle.com/code/dogukantabak/image-classification-64-classes-animal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ir al enlace del dataset de origen
            </a>
          </section>

        </motion.div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}
