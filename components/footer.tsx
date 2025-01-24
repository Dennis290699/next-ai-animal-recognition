'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Github, Mail, Users, ChevronUp, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  const projectInfo = [
    { icon: PawPrint, text: 'Animalia AI - Grupo 7' },
    { icon: Users, text: 'Desarrollado por Grupo 7' },
    { icon: Github, text: 'github.com/Animalia-ia', href: 'https://github.com/Dennis290699/next-ai-animal-recognition' },
    { icon: Mail, text: 'grupo7.ia@universidad.edu' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full border-t bg-background text-foreground"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Animalia AI - Grupo 7
          </motion.h2>

          <div className="flex gap-4">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 rounded-full bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{isExpanded ? 'Menos info' : 'Más info'}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronUp className="h-4 w-4" />
              </motion.div>
            </motion.button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {projectInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-8 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p>
            © {currentYear} Proyecto de Inteligencia Artificial - Grupo 7. Todos los derechos reservados.
          </p>
          <p className="mt-2">
            Desarrollado con{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Next.js
            </a>{' '}
            y{' '}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              shadcn/ui
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
