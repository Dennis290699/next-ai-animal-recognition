"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, PawPrint, Home, Info, FileText } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

const menuItems = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Sobre el Proyecto', href: '/about', icon: Info },
  { name: 'Documentación', href: '/docs', icon: FileText },
];

export function NavItems() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center space-x-2">
                <PawPrint  className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Animalia AI</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-4">
              <ul className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-1 rounded-md px-3 py-2 transition-colors hover:bg-accent"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <ThemeToggle />
            </div>

            <motion.div
              className="md:hidden flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md p-2 transition-colors hover:bg-accent"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 pb-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 transition-colors hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </nav>
      <div className="h-16" /> {/* Spacer to prevent content from being hidden under the fixed navbar */}
    </>
  )
}

