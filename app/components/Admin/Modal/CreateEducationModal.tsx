'use client'
import { useForm } from "react-hook-form";
import Field from "../../shared/Form/Field";
import { useState } from "react";
import { TEducation } from "@/app/Interface/education.interface";
import { createEducationData } from "@/lib/createEducation";
import Swal from "sweetalert2";
type Props = {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    mutate: any;
}
const CreateEducationModal = ({ modal, setModal, mutate }: Props) => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TEducation>({
        defaultValues: {
            school: "",
            degree: "",
            admitYear: "",
            passYear: "",

        },
    });

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const payload = {
                school: data.school,
                degree: data.degree,
                admitYear: data.admitYear,
                passYear: data.passYear,
            }
            const result = await createEducationData(payload)
            if (!result?.success) {
                Swal.fire({
                    background: '#000',
                    title: "Oops!",
                    text: result.message || 'Education Created Failed',
                    icon: "error",
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#DB2777'
                })

                return

            }
            if (result?.success) {
                Swal.fire({
                    background: '#000',
                    title: "Good Job!",
                    text: result.message || 'Education Created Successfully',
                    icon: "success",
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#DB2777'
                })
                await mutate();
                reset();
                setModal(false);
                setLoading(false);
            }

        } catch (error) {

            console.log('error', error);

        }
    }
    return (
        <div onClick={() => setModal(false)} className={`z-[999999] fixed flex items-center justify-center h-screen w-screen place-items-center ${modal ? "visible opacity-1" : "invisible opacity-0"} inset-0 backdrop-blur-sm bg-black/50 duration-100 `}>
            <div onClick={(e) => e.stopPropagation()} className={`absolute p-5 m-4 lg:w-2/5 lg:min-w-[40%] max-w-[90%] rounded-lg bg-slate-800 font-sans text-base text-blue-gray-500 ${modal ? "translate-y-6 opacity-1 duration-300" : " opacity-0 duration-200"} shadow-2xl`}>
                <div className="">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Update Your Experience</h1>

                    <div className="md:flex md:justify-center md:items-center mt-5">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <Field htmlFor="school" label="School/University Name" required error={errors.school}>
                                    <input  {...register("school", {
                                        required: "School/University Name is required",
                                    })} type='text' id="school" name="school" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div>
                                <Field htmlFor="degree" label="Degree" required error={errors.degree}>
                                    <input  {...register("degree", {
                                        required: "Degree is required",
                                    })} type='text' id="degree" name="degree" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div>
                                <Field htmlFor="passYear" label="Pass Year" required error={errors.passYear}>
                                    <input  {...register("passYear", {
                                        required: "Please Add Your Pass Year",
                                    })} type='date' id="passYear" name="passYear" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div>
                                <Field htmlFor="admitYear" label="Admit Year" required error={errors.admitYear}>
                                    <input  {...register("admitYear", {
                                        required: "Please Add Your Admit Year",
                                    })} type='date' id="admitYear" name="admitYear" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>

                            <div className="flex justify-between items-center mt-6">
                                <button type="submit" className="px-8 py-2 mr-1 bg-green-600 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg ">
                                    {loading ? 'Loading.....' : 'Add Education'}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateEducationModal;