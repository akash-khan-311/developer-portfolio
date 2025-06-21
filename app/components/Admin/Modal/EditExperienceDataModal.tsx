'use client'
import { getExperienceDataById } from "@/lib/getSinglExperienceData"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import Field from "../../shared/Form/Field"
import { useForm } from "react-hook-form"
import { updateExperienceData } from "@/lib/updateExperienceData"
import { toast } from "react-toastify"
type Props = {
    modalOpen: boolean;
    data: { _id: string; company: string; role: string; startDate: Date; endDate: Date };
    setModalOpen: (open: boolean) => void;
};
interface ExperienceFormData {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
}
interface UpdateExperiencePayload extends ExperienceFormData {
    id: string;
}
export function ExperienceModal({ data, modalOpen, setModalOpen }: Props) {
    const [loading, setLoading] = useState(false);
    console.log(data)
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<{ company: string; role: string; startDate: string; endDate: string }>({
        defaultValues: {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
        },
    });
    useEffect(() => {
        reset({
            company: data.company,
            role: data.role,
            startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : "",
            endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : ""
        });
    }, [reset, data])
    const onSubmit = async (formData: ExperienceFormData): Promise<void> => {
        const payload: ExperienceFormData = {
            company: formData.company,
            role: formData.role,
            startDate: formData.startDate,
            endDate: formData.endDate
        };
        try {
            setLoading(true);
            const id: string = data._id;
            const result = await updateExperienceData({
                id,
                payload: {
                    company: payload.company,
                    role: payload.role,
                    startDate: payload.startDate,
                    endDate: payload.endDate
                }
            });

            if (!result.success) {
                toast.error(result.message || 'Something went wrong');
                setLoading(false);
                return;
            }
            if (result.success) {
                toast.success(result.message || 'Experience Updated Successfully', { position: 'bottom-right' });
                setLoading(false);
                setModalOpen(false);
                reset();
            }
        } catch (error) {
            console.error("Error updating experience:", error);
            toast.error('Failed to update experience', { position: 'bottom-right' });
            setLoading(false);
        }
    };
    return (
        <div onClick={() => setModalOpen(false)} className={`z-[999999] fixed flex items-center justify-center h-screen w-screen place-items-center ${modalOpen ? "visible opacity-1" : "invisible opacity-0"} inset-0 backdrop-blur-sm bg-black/50 duration-100 `}>
            <div onClick={(e) => e.stopPropagation()} className={`absolute p-5 m-4 lg:w-2/5 lg:min-w-[40%] max-w-[90%] rounded-lg bg-slate-800 font-sans text-base text-blue-gray-500 ${modalOpen ? "translate-y-6 opacity-1 duration-300" : " opacity-0 duration-200"} shadow-2xl`}>
                <div className="">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Update Your Experience</h1>

                    <div className="md:flex md:justify-center md:items-center mt-5">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <Field htmlFor="company" label="Company Name" required error={errors.company}>
                                    <input  {...register("company", {
                                        required: "Company Name is required",
                                    })} type='text' id="company" name="company" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div>
                                <Field htmlFor="role" label="Role" required error={errors.role}>
                                    <input  {...register("role", {
                                        required: "Role is required",
                                    })} type='text' id="role" name="role" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                </Field>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Field htmlFor="startDate" label="Start Date" required error={errors.startDate}>
                                        <input
                                            {...register("startDate", {
                                                required: "Start Date is required",
                                            })}
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                                        />
                                    </Field>
                                </div>
                                <div>
                                    <Field htmlFor="endDate" label="End Date" required error={errors.endDate}>
                                        <input  {...register("endDate", {
                                            required: "End Date is required",
                                        })} type='date' id="endDate" name="endDate" className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
                                    </Field>
                                </div>
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
    )
}
