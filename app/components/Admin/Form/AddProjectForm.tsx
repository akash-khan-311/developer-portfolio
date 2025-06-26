import Image from "next/image";
import Field from "../../shared/Form/Field";
import { FieldError, useForm } from "react-hook-form";
import { TProject } from "@/app/Interface/project.interface";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { createProjectData } from "@/lib/createProjectData";
import Swal from "sweetalert2";

const AddProjectForm = ({ mutate }: any) => {
  const [loading, setLoading] = useState(false)
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

  const onSubmit = async (data: any) => {


    if (tech.length < 2) {
      setError('technologies', {
        type: 'manual',
        message: 'At least two technology is required',
      });
      return;
    }



    try {
      setSubmitLoading(true);

      const imgUrl = await uploadImageToCloudinary(data.image[0]);

      const payload = {
        title: data.title,
        description: data.description,
        image: imgUrl,
        codeLink: data.codeLink,
        liveLink: data.liveLink,
        technologies: tech
      }

      const result = await createProjectData(payload);

      if (result?.success) {
        Swal.fire({
          title: "Good Job!",
          text: result.message || 'Project Created Successfully',
          icon: "success"
        })
        reset();
        await mutate();
      }
      setSubmitLoading(false);
    } catch (error) {

      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong",
        icon: "error"
      })
    } finally {
      setSubmitLoading(false);
    }

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      <div>
        <div className="w-1/3 h-1/3 mx-auto mt-4">
          <Image
            id="preview_img"
            className="w-full h-full object-cover border-2 p-1 rounded-md"
            src={previewImage}
            alt="Preview"
            width={300}
            height={300}
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
  );
};

export default AddProjectForm;