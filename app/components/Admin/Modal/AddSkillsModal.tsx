'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "../../shared/Form/Field";

type Props = {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    mutate: any;

};
interface ExperienceFormData {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
}
const AddSkillsModal = ({ modalOpen, setModalOpen, mutate }: Props) => {
    const [loading, setLoading] = useState(false);
      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<{ name: string; icon: string; }>({
            defaultValues: {
                name: "",
                icon: "",
            
            },
        });

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
                            <div>
                                <Field htmlFor="icon" label="Skill Icon" required error={errors.icon}>
                                    <input  {...register("icon", {
                                        required: "Skill Icon is required",
                                    })} type='text' id="icon" name="icon" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            
                            <div className="flex justify-between items-center mt-6">
                                <button type="submit" className="px-8 py-2 mr-1 bg-green-600 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg ">
                                    {loading ? 'Loading.....' : 'Update Experience'}
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
  );
};

export default AddSkillsModal;