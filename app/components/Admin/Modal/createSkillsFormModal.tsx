'use client'
import { useForm } from "react-hook-form";
import Field from "../../shared/Form/Field";
import { useState } from "react";
import Image from "next/image";
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { createSkillData } from "@/lib/createSkillData";
import Swal from "sweetalert2";

    interface SkillFormData {
        name: string;
        icon: FileList;
    }

    interface CreateSkillsFormModalProps {
        mutate: () => Promise<void>;
        modal: boolean;
        setModal: (value: boolean) => void;
    }
const CreateSkillsFormModal = ({ mutate, modal, setModal } : CreateSkillsFormModalProps) => {
    const [loading, setLoading] = useState(false)
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
    } = useForm<SkillFormData>({
        defaultValues: {
            name: "",
            icon: undefined as unknown as FileList,
        },
    });


    const onSubmit = async (data: SkillFormData): Promise<void> => {
  
        const file = data?.icon[0];

        try {
            setLoading(true);
            const iconURL: string = await uploadImageToCloudinary(file);
            console.log(iconURL);
            const payload = {
                name: data.name,
                icon: iconURL
            };
            const result: { success: boolean; message?: string } = await createSkillData(payload);
            if (result.success) {
                Swal.fire({
                    background: '#000',
                    title: "Good Job!",
                    text: result.message || 'Skill Successfully Added',
                    icon: "success",
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#DB2777'
                });
                await mutate();
                reset();
                setModal(false);
                setLoading(false);
            }
        } catch (error) {
            console.log('error', error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div onClick={() => setModal(false)} className={`z-[10] absolute flex items-center justify-center h-screen place-items-center ${modal ? "visible opacity-1 inset-0" : "invisible opacity-0"} inset-0 backdrop-blur-sm bg-black/50 duration-100 `}>
            <div onClick={(e) => e.stopPropagation()} className={`absolute p-5 m-4 lg:w-2/5 lg:min-w-[40%] max-w-[90%] rounded-lg bg-slate-800 font-sans text-base text-blue-gray-500 ${modal ? "translate-y-6 opacity-1 duration-300" : " opacity-0 duration-200"} shadow-2xl`}>
                <div className="">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Add New Skill</h1>

                    <div className="md:flex md:justify-center md:items-center mt-5">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <Field htmlFor="name" label="Skill Name" required error={errors.name}>
                                    <input  {...register("name", {
                                        required: "Skill Name is required",
                                    })} placeholder="Write The Skill Name" type='text' id="name" name="name" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div className="flex flex-col lg:flex-row-reverse justify-between items-center mt-5 gap-x-10">
                                <Image
                                    id="preview_img"
                                    className="h-32 w-32 object-cover border-2 p-1 rounded-full"
                                    src={previewImage}
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
                                    {loading ? 'Loading.....' : 'Add Skill'}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateSkillsFormModal;