'use client'

import Image from "next/image";
import { useState } from "react";
import Field from "../../shared/Form/Field";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FieldError, useForm } from "react-hook-form";
import { TProject } from "@/app/Interface/project.interface";

type Props = {
    mutate: () => Promise<unknown>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: {
        _id: string;
        title: string;
        image: string;
        description: string;
        technologies: string[];
        codeLink: string;
        liveLink: string;
    };
};
const UpdateProjectModal = ({ modalOpen, setModalOpen, mutate } : Props) => {
    const [submitLoading, setSubmitLoading] = useState(false);
      const [techInput, setTechInput] = useState('');
      const [tech, setTech] = useState<string[]>([]);
      // ! in from when the user upload the profile image and show the preview
      const [previewImage, setPreviewImage] = useState(
        "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
      );
      // ! here is loaded the image file for show image preview
      const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
          setPreviewImage(URL.createObjectURL(file));
        }
      };
    
      const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        reset,
        formState: { errors },
      } = useForm<TProject>({
        defaultValues: {
          title: '',
          description: '',
          image: '',
          codeLink: '',
          liveLink: '',
          technologies: [],
    
        },
      });
    
      const addTechnology = () => {
        const trimmed = techInput.trim();
        if (trimmed && !tech.includes(trimmed)) {
          const updated = [...tech, trimmed];
          setTech(updated);
          setValue('technologies', updated);
          setTechInput('');
          if (updated.length >= 2) {
            clearErrors('technologies');
          }
        }
      };
    
      const removeTech = (index: number) => {
        const updated = tech.filter((_, i) => i !== index);
        setTech(updated);
        setValue('technologies', updated);
      };
    

      const onSubmit = async ()=> {

      }

    return (
        <div>
            <div onClick={() => setModalOpen(false)} className={`z-[99999999] fixed flex items-center justify-center h-screen w-screen place-items-center ${modalOpen ? "visible opacity-1" : "invisible opacity-0"} inset-0 bg-black bg-opacity-60 duration-100 `}>
                <div onClick={(e) => e.stopPropagation()} className={`absolute m-4 w-3/4 min-w-[60%] max-w-[60%] rounded-lg bg-slate-900 font-sans text-base font-lightd text-blue-gray-500 ${modalOpen ? "translate-y-6 opacity-1 duration-300" : "-translate-y-6 opacity-0 duration-200"} shadow-2xl`}>
                    <div className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
                        Hi, I'm Soft UI
                    </div>
                     <form onSubmit={handleSubmit(onSubmit)} action="">
      <div>
        <div className="w-1/4 h-1/4 mx-auto mt-4">
          <Image
            id="preview_img"
            className="w-full h-full object-cover border-2 p-1 rounded-md"
            src={previewImage}
            alt="Preview"
            width={100}
            height={100}
          />
        </div>
        <Field htmlFor="image" label="Project Image" required error={errors.image}>
          <input   {...register("image", {
            required: "Project image is required",
          })}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={loadFile} className='w-full px-3 py-3 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </Field>

      </div>
      <div>
        <Field htmlFor="title" label="Project Title" required error={errors.title}>
          <input  {...register("title", {
            required: "Project Title is required",
          })} type='text' id="title" name="title" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </Field>
      </div>
      <div>
        <Field htmlFor="description" label="Description" required error={errors.description}>
          <textarea  {...register("description", {
            required: "Description is required",
          })} id="description" name="description" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </Field>
      </div>
      <div>
        <Field htmlFor="codeLink" label="Github Code Link" required error={errors.codeLink}>
          <input  {...register("codeLink", {
            required: "Code Link is required",
          })} type='text' id="codeLink" name="codeLink" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </Field>
      </div>
      <div>
        <Field htmlFor="liveLink" label="Live Link" required error={errors.liveLink}>
          <input  {...register("liveLink", {
            required: "Live Link is required",
          })} type='text' id="liveLink" name="liveLink" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </Field>
      </div>
      {/* IntroText: Array input */}
      <div>
        <label>Add Slug</label>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="ex: React.js"
            className=' w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />

          <button className={'px-4 py-1 bg-pink-500 rounded-lg'} type="button" onClick={addTechnology}>
            Add
          </button>

        </div>
        {errors.technologies && (
          <p className="text-red-500 text-sm mt-1">
            {(errors.technologies as FieldError)?.message}
          </p>
        )}
        {/* Show list */}
        <ul className="mt-2 space-y-1 inline">
          {tech?.map((text, index) => (
            <li
              key={index}
              className=" flex items-center px-3 py-1 rounded-md"
            >
              <span className={'bg-gray-400 px-4 py-1 rounded-lg'}>{text}</span>
              <button
                type="button"
                className="text-red-500 text-sm"
                onClick={() => removeTech(index)}
              >
                <IoIosCloseCircleOutline className={'w-5 h-5'} />
              </button>
            </li>
          ))}
        </ul>

      </div>
      <div className="flex justify-between items-center mt-6">
        <button type="submit" className="w-full px-8 py-2 mr-1 bg-green-600 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg ">
          {submitLoading ? 'Loading.....' : 'Add Project'}
        </button>

      </div>
    </form>
                    <div className="flex flex-wrap items-center justify-end p-4 shrink-0 text-blue-gray-500">
                        <button onClick={() => setModalOpen(false)} className="px-6 py-3 mr-1 font-sans text-xs font-bold text-red-500 uppercase transition-all rounded-lg middle none center hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Cancel</button>
                        <button onClick={() => setModalOpen(false)} className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProjectModal;