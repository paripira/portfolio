'use client';

import { useEffect, useState } from 'react';
import { Folder, ExternalLink, Github, Loader2, AlertTriangle, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Tipe data update (tambah gallery & content)
interface Project {
  id: string;
  title: string;
  category: string;
  description: string; // Deskripsi singkat
  content: string;     // Penjelasan detail/panjang
  tech_stack: string[];
  repo_link: string;
  demo_link: string;
  gallery: string[];   // Array URL Foto
  created_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // State untuk simpan project yg diklik
  const [loading, setLoading] = useState(true);

  // Ambil data saat pertama buka
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setProjects(data || []);
      
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-blue-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <span className="text-xs font-mono">LOADING DATABASE...</span>
      </div>
    );
  }

  // === TAMPILAN 1: DETAIL VIEW (Muncul jika ada project yg dipilih) ===
  if (selectedProject) {
    return (
      <div className="h-full w-full bg-slate-950 flex flex-col">
        
        {/* Header Detail: Tombol Back & Judul */}
        <div className="flex items-center gap-4 p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
          <button 
            onClick={() => setSelectedProject(null)} // Tombol Back -> Reset state jadi null
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{selectedProject.title}</h2>
            <span className="text-xs text-blue-400 font-mono">{selectedProject.category}</span>
          </div>
        </div>

        {/* Isi Konten Detail (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
          
          {/* 1. Galeri Foto Utama */}
          {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
             <div className="grid grid-cols-1 gap-4">
                {/* Foto Pertama (Hero Image) */}
                <div className="w-full h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                   <img src={selectedProject.gallery[0]} alt="Main" className="w-full h-full object-cover" />
                </div>
                {/* Foto Sisanya (Grid Kecil) */}
                <div className="grid grid-cols-3 gap-2">
                   {selectedProject.gallery.slice(1).map((img, idx) => (
                      <div key={idx} className="h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                         <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                      </div>
                   ))}
                </div>
             </div>
          ) : (
            // Placeholder jika tidak ada foto
            <div className="w-full h-48 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-600">
                <ImageIcon size={32} className="mb-2" />
                <span className="text-xs">No documentation images available</span>
            </div>
          )}

          {/* 2. Tombol Aksi (Demo & Repo) */}
          <div className="flex gap-3">
             {selectedProject.repo_link && (
               <a href={selectedProject.repo_link} target="_blank" className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded flex items-center justify-center gap-2 text-sm text-white transition-all">
                  <Github size={16} /> View Source Code
               </a>
             )}
             {selectedProject.demo_link && (
               <a href={selectedProject.demo_link} target="_blank" className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded flex items-center justify-center gap-2 text-sm text-white font-bold transition-all shadow-lg shadow-blue-900/20">
                  <ExternalLink size={16} /> Live Demo
               </a>
             )}
          </div>

          {/* 3. Penjelasan Lengkap (Content) */}
          <div className="prose prose-invert prose-sm max-w-none text-slate-300">
            <h3 className="text-white font-bold text-lg mb-2">Project Overview</h3>
            <p className="whitespace-pre-line leading-relaxed">
               {selectedProject.content || selectedProject.description || "No details provided yet."}
            </p>
          </div>

          {/* 4. Tech Stack List */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
                {selectedProject.tech_stack?.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-blue-300">
                    {t}
                  </span>
                ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // === TAMPILAN 2: GRID LIST (Tampilan Awal) ===
  return (
    <div className="h-full w-full bg-slate-950 p-6 overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="mb-6 border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <Folder size={20} />
          PROJECT_DATABASE_V1
        </h2>
        <p className="text-slate-500 text-xs mt-1">
          // Select a file to view details
        </p>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <div className="text-center text-slate-500 py-10 flex flex-col items-center">
            <AlertTriangle className="mb-2 text-yellow-500" />
            <p>No projects found in database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)} // <--- KLIK DISINI UNTUK BUKA DETAIL
              className="group cursor-pointer relative bg-slate-900/50 border border-slate-700 hover:border-blue-500/50 rounded-lg p-4 transition-all hover:bg-slate-800/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] flex flex-col h-[180px]"
            >
              {/* Dekorasi Sudut */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-600 group-hover:border-blue-400 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  (project.category || '').includes('Cyber') ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                  'bg-blue-500/10 border-blue-500/30 text-blue-400'
                }`}>
                  {project.category || 'General'}
                </span>
              </div>

              <h3 className="text-slate-200 font-bold text-lg mb-1 group-hover:text-blue-300 transition-colors truncate">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-xs mb-4 leading-relaxed line-clamp-2 flex-1">
                {project.description}
              </p>

              <div className="flex items-center text-xs text-slate-500 mt-auto">
                 <span>Click to access files...</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}