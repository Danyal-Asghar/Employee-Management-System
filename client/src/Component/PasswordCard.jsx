import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal'; // Import the new modal

const PasswordCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-center justify-between shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-slate-50 p-3 rounded-lg">
            <Lock size={20} className="text-slate-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Password</h3>
            <p className="text-sm text-slate-500">Update your account password</p>
          </div>
        </div>

        {/* Trigger the Modal */}
        <button 
          onClick={handleOpenModal}
          className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 transition-colors"
        >
          Change
        </button>
      </div>

      {/* Render the Modal */}
      <ChangePasswordModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default PasswordCard;