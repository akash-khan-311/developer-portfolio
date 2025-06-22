'use client';

import { useState } from 'react';

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  country: string;
  bloodGroup: string;
  languages: string;
  dob: string;
  bio: string;
};

const EditUserModal = ({
  userInfo,
  onClose,
  onSave
}: {
  userInfo: UserInfo;
  onClose: () => void;
  onSave: (data: UserInfo) => void;
}) => {
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className=" inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl w-[90%] max-w-lg space-y-4">
        <h2 className="text-xl font-bold text-center">Edit Information</h2>

        <input name="name" value={formData.name} onChange={handleChange} className="input" placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} className="input" placeholder="Email" />
        <input name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="Phone" />
        <input name="country" value={formData.country} onChange={handleChange} className="input" placeholder="Country" />
        <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input" placeholder="Blood Group" />
        <input name="languages" value={formData.languages} onChange={handleChange} className="input" placeholder="Languages" />
        <input name="dob" value={formData.dob} onChange={handleChange} className="input" placeholder="DOB" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} className="input" placeholder="Bio" />

        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
          <button onClick={onClose} type="button" className="bg-gray-400 px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
