'use client'

import { useForm } from "react-hook-form";
import Field from "../../shared/Form/Field";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
    mutate: () => Promise<unknown>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: {
        _id: string;
        name: string;
        icon: string;
    };
};
const UpdateSkillModal = ({ data, modalOpen, setModalOpen, mutate }: Props) => {
    const [loading, setLoading] = useState(false);
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
        reset,
        formState: { errors },
    } = useForm<{ name: string; icon: string; }>({
        defaultValues: {
            name: "",
            icon: data?.icon,

        },
    });

    useEffect(() => {
        reset({
            name: data?.name,
            icon: data?.icon,
        })
    }, [reset, data])

    const onSubmit = async (data: any) => {

    }
    return (
        <div onClick={() => setModalOpen(false)} className={`z-[999999] fixed flex items-center justify-center h-screen w-screen place-items-center ${modalOpen ? "visible opacity-1" : "invisible opacity-0"} inset-0 backdrop-blur-sm bg-black/50 duration-100 `}>
            <div onClick={(e) => e.stopPropagation()} className={`absolute p-5 m-4 lg:w-2/5 lg:min-w-[40%] max-w-[90%] rounded-lg bg-slate-800 font-sans text-base text-blue-gray-500 ${modalOpen ? "translate-y-6 opacity-1 duration-300" : " opacity-0 duration-200"} shadow-2xl`}>
                <div className="">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Update Your Experience</h1>

                    <div className="md:flex md:justify-center md:items-center mt-5">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <Field htmlFor="name" label="Skill Name" required error={errors.name}>
                                    <input  {...register("name", {
                                        required: "Skill Name is required",
                                    })} type='text' id="name" name="name" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                             <div className="flex flex-col lg:flex-row-reverse justify-between items-center mt-5 gap-x-10">
                                <Image
                                    id="preview_img"
                                    className="h-32 w-32 object-cover border-2 p-1 rounded-full"
                                    src={data?.icon || previewImage}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                />
                                <Field htmlFor="icon" label="Skill Icon" required error={errors.icon}>
                                    <input  {...register("icon", {
                                        required: "Skill Icon is required",
                                    })} type="file"
                                        accept="image/*"
                                        onChange={loadFile} id="icon" name="icon" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button type="submit" className="px-8 py-2 mr-1 bg-green-600 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg ">
                                    {loading ? 'Loading.....' : 'Update Skill'}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default UpdateSkillModal;