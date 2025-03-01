import { useEffect, useRef, useState } from 'react';

interface Section {
  id: string;
  title: string;
  level: number;
}

const DocumentViewer = () => {
  const [content, setContent] = useState<string>('');
  const [sections, setSections] = useState<Section[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/iii.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load document');
        }
        return response.text();
      })
      .then(text => {
        setContent(text);
        const lines = text.split('\n');
        const parsedSections: Section[] = [];
        
        lines.forEach((line, index) => {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('CHAPTER')) {
            parsedSections.push({
              id: `section-${index}`,
              title: trimmedLine,
              level: 1
            });
          } else if (trimmedLine && !trimmedLine.startsWith(' ') && !trimmedLine.startsWith('\t')) {
            const title = trimmedLine;
            if (title !== 'BIBLIOGRAPHY' && !title.includes('http') && 
                !title.endsWith('.') && title.length < 100 && 
                title.split(' ').length <= 7) {
              parsedSections.push({
                id: `section-${index}`,
                title: title,
                level: 2
              });
            }
          }
        });
        
        setSections(parsedSections);
        setError('');
      })
      .catch(err => {
        console.error('Error loading document:', err);
        setError('Failed to load document. Please try again later.');
      });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-slate-900 ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 overflow-y-auto h-screen border-r border-slate-700 fixed top-0 left-0 isolate pointer-events-none">
        <div className="p-4 pointer-events-auto">
          <h1 className="text-xl font-semibold text-white mb-4">Table of Contents</h1>
          <nav className="space-y-1 overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left py-1.5 px-2 rounded transition-colors duration-200 ${section.level === 2 ? 'pl-8 text-sm text-slate-300 hover:bg-slate-700/50' : 'text-base text-white hover:bg-slate-700'}`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto min-h-screen bg-slate-900 ml-64" ref={contentRef}>
        <div className="max-w-6xl mx-auto px-8 py-6 relative">
          <div className="flex justify-end p-4 sticky top-0 z-10">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-xl transition-all duration-200 flex items-center space-x-2 font-medium text-base transform hover:scale-105"
            >
              {isFullScreen ? 'Exit Full View' : 'Full View'}
            </button>
          </div>
          {content.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine === '"PROJECT R.I.S.E: RENOVATING INDOOR SPORTS FOR EXCELLENCE"') {
              return (
                <h1 
                  key={index} 
                  className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center my-12 leading-tight tracking-tight"
                >
                  {line.replace(/"/g, '')}
                </h1>
              );
            } else if (trimmedLine.startsWith('CHAPTER')) {
              return (
                <h1 
                  id={`section-${index}`} 
                  key={index} 
                  className="text-3xl font-bold text-white mt-8 mb-6"
                >
                  {line}
                </h1>
              );
            } else if (trimmedLine && !trimmedLine.startsWith(' ') && !trimmedLine.startsWith('\t')) {
              const title = trimmedLine;
              if (title !== 'BIBLIOGRAPHY' && !title.includes('http') && 
                  !title.endsWith('.') && title.length < 100 && 
                  title.split(' ').length <= 7) {
                return (
                  <h2 
                    id={`section-${index}`} 
                    key={index} 
                    className="text-2xl font-semibold text-slate-200 mt-8 mb-6 pl-8"
                  >
                    {line}
                  </h2>
                );
              }
            }
            return (
              <p key={index} className="text-base text-slate-300 leading-relaxed my-4 font-normal">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;