"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bird, Fish, Bug, Cat, PawPrintIcon as Paw } from "lucide-react"

const animalIcons = [Bird, Fish, Bug, Cat, Paw]

export const AnimaliaPreloader = () => {
  const [loading, setLoading] = useState(true)
  const [currentAnimal, setCurrentAnimal] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // 3 segundos de carga

    const animalInterval = setInterval(() => {
      setCurrentAnimal((prev) => (prev + 1) % animalIcons.length)
    }, 500) // Cambia el icono cada 500ms

    return () => {
      clearTimeout(timer)
      clearInterval(animalInterval)
    }
  }, [])

  const CurrentAnimalIcon = animalIcons[currentAnimal]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background ${
        loading ? "" : "pointer-events-none"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: loading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-32 h-32 mb-8 relative"
        >
          <motion.div
            className="w-full h-full rounded-full border-4 border-primary border-t-transparent absolute top-0 left-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="w-full h-full absolute top-0 left-0 flex items-center justify-center"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <CurrentAnimalIcon className="w-16 h-16 text-primary" />
          </motion.div>
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold text-primary mb-4"
        >
          Animalia AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground"
        >
          Cargando el reconocimiento de imágenes...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

