import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, FileText, ArrowRight, Github } from 'lucide-react';
import Scene from './components/Scene';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            PROJECT R.I.S.E
          </h1>
          <p className="text-2xl text-slate-300 mb-8">
            Renovating Indoor Sports for Excellence
          </p>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-2xl border border-slate-700"
        >
          <Scene />
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
          >
            <Building2 className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">3D Renovation Model</h3>
            <p className="text-slate-400">
              Complete AutoCAD redesign of the indoor sports facility with modern amenities and improved space utilization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
          >
            <Users className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enhanced Experience</h3>
            <p className="text-slate-400">
              Improved facilities designed to enhance the athletic experience for students and faculty.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
          >
            <FileText className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Research Documentation</h3>
            <p className="text-slate-400">
              Comprehensive research and planning documentation supporting the renovation proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Document Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/50 p-8 rounded-xl border border-slate-700"
        >
          <h2 className="text-3xl font-bold mb-6">Research Document</h2>
          <p className="text-slate-300 mb-6">
            Our comprehensive research document details the proposed renovations, impact analysis, and implementation strategy for the indoor sports facility upgrade.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            View Full Document <ArrowRight className="ml-2" />
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-700">
        <div className="flex justify-between items-center">
          <p className="text-slate-400">© 2025 Project R.I.S.E</p>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;