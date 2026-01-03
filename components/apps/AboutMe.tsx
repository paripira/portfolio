'use client';

import { useEffect, useState } from 'react';
import { User, MapPin, Briefcase, Mail, Github, Linkedin, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // Import koneksi database

// Tipe data sesuai tabel database
interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  github_username: string;
  linkedin_username: string;
}

export default function AboutMe() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk ambil data dari Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      // Select data dari tabel 'profile', ambil baris pertama (single)
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Tampilan Loading saat sedang mengambil data
  if (loading) {
    return (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-blue-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <span className="text-xs font-mono">CONNECTING TO DATABASE...</span>
      </div>
    );
  }

  // Jika data kosong
  if (!profile) return <div className="text-white p-10">Data Profile Kosong.</div>;

  return (
    <div className="h-full w-full bg-slate-950 text-slate-300 p-8 overflow-y-auto flex flex-col items-center">
      
      {/* Container Kartu */}
      <div className="max-w-2xl w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-2xl relative overflow-hidden">
        
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

        {/* Header: Foto & Identitas (DATA DARI DATABASE) */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 relative z-10">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shadow-lg">
               <User size={40} className="text-slate-500" />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">{profile.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400 font-medium mb-2">
              <Briefcase size={16} />
              <span>{profile.role}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><MapPin size={12} /> {profile.location}</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-800 mb-6"></div>

        {/* Bio Section (DATA DARI DATABASE) */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">System Bio</h3>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {profile.bio}
          </p>
        </div>

        {/* Socials & Contact */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-800">
           <div className="flex gap-4">
             {profile.github_username && (
                <a href={`https://github.com/${profile.github_username}`} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                    <Github size={20} />
                </a>
             )}
             {profile.linkedin_username && (
                <a href={`https://linkedin.com/in/${profile.linkedin_username}`} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                </a>
             )}
           </div>
           <div className="flex items-center gap-2 text-sm text-slate-400">
             <Mail size={16} />
             {profile.email}
           </div>
        </div>

      </div>
    </div>
  );
}