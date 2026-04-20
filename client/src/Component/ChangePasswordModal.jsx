import React from 'react';
import { Lock, X } from 'lucide-react';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Dark Backdrop/Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* 2. Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Lock size={20} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Change Password</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body/Form */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Current Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Footer/Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
          <button 
            onClick={onClose}
            className="btn-secondary" // Using your custom CSS class
          >
            Cancel
          </button>
          <button 
            className="btn-primary" // Using your custom CSS class
            style={{ backgroundColor: '#6366f1' }} // Matching the purple-ish blue in your image
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;