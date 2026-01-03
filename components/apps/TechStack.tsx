'use client';

import { useEffect, useState } from 'react';
import { Cpu, Activity, Server, Shield, Code, Loader2, Database } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export default function TechStack() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('proficiency', { ascending: false }); // Urutkan dari yang paling jago

      if (error) console.error(error);
      else setSkills(data || []); // Typo fix: harusnya setSkills
      
      if (data) setSkills(data);
      setLoading(false);
    };

    fetchSkills();
  }, []);

  // Kelompokkan skill berdasarkan kategori agar rapi
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Fungsi pilih ikon berdasarkan kategori
  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('front') || c.includes('web')) return <Code size={18} />;
    if (c.includes('back') || c.includes('sql')) return <Database size={18} />;
    if (c.includes('iot') || c.includes('robot')) return <Cpu size={18} />;
    if (c.includes('cyber') || c.includes('sec')) return <Shield size={18} />;
    return <Activity size={18} />;
  };

  // Fungsi warna bar berdasarkan level
  const getBarColor = (val: number) => {
    if (val >= 90) return 'bg-green-500 shadow-[0_0_10px_#22c55e]'; // Master
    if (val >= 75) return 'bg-blue-500 shadow-[0_0_10px_#3b82f6]';  // Expert
    if (val >= 50) return 'bg-yellow-500 shadow-[0_0_10px_#eab308]'; // Intermediate
    return 'bg-slate-500'; // Beginner
  };

  if (loading) {
    return (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-blue-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <span className="text-xs font-mono">RUNNING DIAGNOSTICS...</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-slate-950 p-6 overflow-y-auto custom-scrollbar">
      
      {/* Header Ala System Monitor */}
      <div className="mb-8 border-b border-slate-800 pb-4 flex justify-between items-end">
        <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-green-500" /> SYSTEM CAPABILITIES
            </h2>
            <p className="text-slate-500 text-xs mt-1 font-mono">
            // DIAGNOSTIC RESULTS: POSITIVE
            </p>
        </div>
        <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-500">Total Modules Loaded</div>
            <div className="text-xl font-bold text-blue-400 font-mono">{skills.length} UNITS</div>
        </div>
      </div>

      {/* Grid Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(groupedSkills).map((category) => (
          <div key={category} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 backdrop-blur-sm">
            
            {/* Judul Kategori */}
            <div className="flex items-center gap-2 mb-4 text-slate-300 font-bold uppercase text-xs tracking-wider border-b border-slate-800 pb-2">
              {getCategoryIcon(category)}
              {category}
            </div>

            {/* List Skill di Kategori Tersebut */}
            <div className="space-y-4">
              {groupedSkills[category].map((skill) => (
                <div key={skill.id} className="group">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-200 font-medium group-hover:text-blue-300 transition-colors">
                        {skill.name}
                    </span>
                    <span className="text-slate-500 font-mono">{skill.proficiency}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                    {/* Grid Line Dekorasi */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-20" 
                         style={{ backgroundImage: 'linear-gradient(90deg, transparent 90%, #000 90%)', backgroundSize: '10px 100%' }}>
                    </div>
                    
                    {/* Bar Isi (Animated Width) */}
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(skill.proficiency)}`}
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Footer Diagnostic */}
      <div className="mt-8 p-4 bg-green-900/10 border border-green-500/20 rounded-lg flex items-center gap-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-xs font-mono text-green-400">
            ALL SYSTEMS OPERATIONAL. READY FOR DEPLOYMENT.
        </span>
      </div>

    </div>
  );
}