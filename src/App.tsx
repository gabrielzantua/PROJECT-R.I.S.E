import { motion } from 'framer-motion';
import { Building2, Users, FileText, Github } from 'lucide-react';
import DocumentViewer from './components/DocumentViewer';
import Scene from './components/Scene';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-sm z-50 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <a href="./" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mr-auto ml-0 transform hover:scale-105 transition-transform duration-200">
              PROJECT R.I.S.E
            </a>
            <div className="flex space-x-8">
              <a href="#home" className="text-white hover:text-white hover:scale-105 transition-all duration-200 ease-in-out">Home</a>
              <a href="#model" className="text-white hover:text-white hover:scale-105 transition-all duration-200 ease-in-out">3D Model</a>
              <a href="#gallery" className="text-white hover:text-white hover:scale-105 transition-all duration-200 ease-in-out">Gallery</a>
              <a href="#documentation" className="text-white hover:text-white hover:scale-105 transition-all duration-200 ease-in-out">Documentation</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="container mx-auto px-4 py-16 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            PROJECT R.I.S.E
          </h1>
          <p className="text-2xl text-white mb-8">
            Renovating Indoor Sports for Excellence
          </p>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          id="model"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-2xl border border-slate-700 mx-auto my-12"
          style={{ 
            width: '100%', 
            maxWidth: '1000px', 
            height: '600px',
            position: 'relative'
          }}
        >
          <Scene />
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="gallery" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 mb-12"
        >
          <Gallery />
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"
          >
            <Building2 className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">3D Renovation Model</h3>
            <p className="text-white">
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
            <p className="text-white">
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
            <p className="text-white">
              Comprehensive research and planning documentation supporting the renovation proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Document Section */}
      <section id="documentation" className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/50 p-8 rounded-xl border border-slate-700"
        >
          <h2 className="text-3xl font-bold mb-6">Research Document</h2>
          <p className="text-white mb-6">
            Our comprehensive research document details the proposed renovations, impact analysis, and implementation strategy for the indoor sports facility upgrade.
          </p>
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-slate-600">
            <iframe src="./iii.html" className="w-full h-full" title="Project Documentation" />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-700">
        <div className="flex justify-between items-center">
          <p className="text-white">© 2025 Project R.I.S.E</p>
          <a
            href="#"
            className="text-white hover:text-white transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;