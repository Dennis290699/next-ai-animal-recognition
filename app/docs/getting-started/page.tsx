"use client"

import React from "react"
import { motion } from "framer-motion"
import { Book, Upload, List, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { Button } from "@/components/ui/button"
import { useActiveSection } from "@/hooks/useActiveSection"

const sections = [
  { id: "upload-image", title: "Subir una imagen", icon: Upload },
  { id: "view-logs", title: "Visualizar logs", icon: List },
  { id: "view-candidates", title: "Ver candidatos posibles", icon: List },
  { id: "source-code", title: "Código fuente", icon: Github },
]

export default function GettingStartedPage() {
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
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Guía de Inicio
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
          <h2 className="text-3xl font-semibold mb-6">Cómo usar la aplicación web</h2>
          <p className="mb-8 text-lg">
            Esta guía te ayudará a entender cómo utilizar nuestra aplicación web para el análisis de imágenes con IA.
          </p>

          <section id="upload-image" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Upload className="mr-2" />
              Subir una imagen
            </h3>
            <p className="mb-4">Para comenzar el análisis, sigue estos pasos:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Haz clic en el botón "Subir imagen" en la página principal.</li>
              <li>Selecciona una imagen de tu dispositivo en formato JPG, PNG o GIF.</li>
              <li>Una vez seleccionada, la imagen se cargará automáticamente.</li>
              <li>Espera a que se complete el proceso de predicción. Esto puede tomar unos segundos.</li>
            </ol>
          </section>

          <section id="view-logs" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <List className="mr-2" />
              Visualizar logs
            </h3>
            <p className="mb-4">Puedes ver los logs de la aplicación para entender el proceso de análisis:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Los logs se muestran en tiempo real en la sección "Logs de la aplicación".</li>
              <li>Verás información sobre el proceso de carga, preprocesamiento y predicción.</li>
              <li>Si ocurre algún error, se mostrará en rojo para una fácil identificación.</li>
            </ul>
          </section>

          <section id="view-candidates" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <List className="mr-2" />
              Ver candidatos posibles
            </h3>
            <p className="mb-4">Después de la predicción, podrás ver los posibles candidatos:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Los candidatos se muestran en orden de probabilidad descendente.</li>
              <li>Cada candidato incluye una etiqueta y un porcentaje de confianza.</li>
              <li>Puedes hacer clic en cada candidato para obtener más información.</li>
            </ul>
          </section>

          <section id="source-code" className="mb-12 scroll-mt-20">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Github className="mr-2" />
              Código fuente
            </h3>
            <p className="mb-4">El código fuente de la aplicación está disponible en GitHub:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Aplicación web:
                <Link
                  href="https://github.com/Dennis290699/next-ai-animal-recognition.git"
                  className="text-blue-600 hover:underline ml-2"
                >
                  github.com/Dennis290699/next-ai-animal-recognition
                </Link>
              </li>
              <li>
                Entrenamiento del modelo:
                <Link href="/docs/resources" className="text-blue-600 hover:underline ml-2">
                  Click aqui para acceder a los recursos adicionales
                </Link>
              </li>
            </ul>
            <p className="mt-4">Siéntete libre de explorar el código, reportar problemas o contribuir al proyecto.</p>
          </section>
        </motion.div>
      </div>
      <ScrollToTopButton />
    </div>
  )
}
