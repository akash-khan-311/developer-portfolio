'use client'
import { useState } from "react";
const PersonalInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="rounded-2xl mt-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between relative">
        <div>
          <h4 className="text-lg font-semibold text-gray-400 lg:mb-6">
            Personal Information
          </h4>
          <button onClick={() => setEditMode(!editMode)} className="text-gray-800 px-4 py-1 rounded-md bg-white text-lg absolute top-0 right-0">
            {editMode ? "Cancel" : "Edit"}
          </button>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Email Address
              </p>
              {editMode ? (<input name="email" className="border p-2 w-full bg-slate-800 rounded-md" />) : (<p className="text-sm font-medium text-gray-400">
                akash@gmail.com
              </p>)}

            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Phone
              </p>
              {editMode ? (<input name="phone" className="border p-2 w-full bg-slate-800 rounded-md" />) : (<p className="text-sm font-medium text-gray-400">
                01719681150
              </p>)}

            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Country
              </p>

              {editMode ? (<input name="country" className="border p-2 w-full bg-slate-800 rounded-md" />) : (<p className="text-sm font-medium text-gray-400">
                Bangladesh
              </p>)}
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Blood Group
              </p>
              {editMode ? (<input name="bloodGroup" className="border p-2 w-full bg-slate-800 rounded-md" />) : (<p className="text-sm font-medium text-gray-400">
                A+
              </p>)}

            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Languages
              </p>

              <p className="text-sm font-medium text-gray-400">
                English, Bangla
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-100">
                Date Of Birth
              </p>
              <p className="text-sm font-medium text-gray-400">
                1999-01-01
              </p>
            </div>


          </div>
          <div className="mt-6 w-1/2">
            <p className="mb-2 text-xs leading-normal text-gray-100">
              Bio
            </p>
            <p className="text-sm font-medium text-gray-400">
              I&apos;m Akash Khan I believe in the power of technology to make a positive impact on people&apos;s lives. Each line of code I write is fueled by a desire to create solutions that are not just functional but also intuitive and delightful for users.
              I strive to build applications that are not only efficient but also user-friendly, ensuring that technology serves as a bridge to connect people and enhance their experiences.
              Whether it&apos;s through crafting elegant user interfaces or optimizing backend processes, my goal is to
            </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PersonalInfo;