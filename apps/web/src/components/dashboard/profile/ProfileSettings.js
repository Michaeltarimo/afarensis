"use client";
import { useState } from 'react';
import { Edit, User } from 'lucide-react';
import Image from 'next/image';

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Michael Tarimo',
    profileUrl: 'https://lh3.googleusercontent.com/a/ACg8ocLgpt8vc-5J2vFRFsfClakM-WChm4RP1ojU52hjJ5fFw11ZxUj6Lw=s96-c'
  });

  if (isEditing) {
    return (
      <div className="w-full">
        <div className="bg-background-elevated-dark rounded-lg p-6">
          <div className="space-y-6">
            {/* Profile Picture Preview */}
            <div className="flex justify-center">
              {profile.profileUrl ? (
                <Image 
                  src={profile.profileUrl} 
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="rounded-full border-2 border-white/10"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
                  <User className="h-10 w-10 text-text-dark-secondary" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-text-dark-secondary mb-2">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary focus:border-lime-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-text-dark-secondary mb-2">
                Profile Picture URL
              </label>
              <input
                type="text"
                value={profile.profileUrl}
                onChange={(e) => setProfile({ ...profile, profileUrl: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-text-dark-primary focus:border-lime-400 outline-none text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-text-dark-secondary py-2 rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-lime-400 hover:bg-lime-500 text-black font-medium py-2 rounded-lg transition-colors text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-background-elevated-dark rounded-lg p-6">
        <div className="flex items-center justify-between">
          {/* User Icon */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
              <User className="h-5 w-5 text-text-dark-secondary" />
            </div>
          </div>

          {/* Name */}
          <div className="flex-shrink-0 ml-6">
            <h2 className="text-base font-semibold text-text-dark-primary">
              {profile.name}
            </h2>
          </div>

          {/* Contact Info */}
          <div className="flex-1 ml-12">
            <div className="flex flex-col">
              <span className="text-sm text-text-dark-secondary">michaeltarimo4@gmail.com</span>
              <span className="text-xs text-text-dark-secondary/60 mt-0.5">ID: cm448rtn70098hxl4u9dpfwgb</span>
            </div>
          </div>

          {/* Edit Button */}
          <button 
            onClick={() => setIsEditing(true)}
            className="flex-shrink-0 ml-6 p-2 hover:bg-white/5 rounded-lg transition-colors group"
          >
            <Edit className="h-4 w-4 text-text-dark-secondary group-hover:text-lime-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
} 