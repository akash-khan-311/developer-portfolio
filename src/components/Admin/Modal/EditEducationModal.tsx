"use client";
import { useEffect, useState } from "react";
import Field from "../../shared/Form/Field";
import { useForm } from "react-hook-form";
import { updateExperienceData } from "@/lib/updateExperienceData";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { TEducation } from "@/Interface/education.interface";
import { updateEducation } from "@/lib/updateEducation";

type Props = {
  modalOpen: boolean;
  data: {
    _id: string;
    school: string;
    degree: string;
    passYear: Date;
    admitYear: Date;
  };
  setModalOpen: (open: boolean) => void;
  mutate: any;
};
interface ExperienceFormData {
  school: string;
  degree: string;
  passYear: Date;
  admitYear: Date;
}

export function EducationModal({
  data,
  modalOpen,
  setModalOpen,
  mutate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TEducation>({
    defaultValues: {
      school: "",
      degree: "",
      passYear: new Date(),
      admitYear: new Date(),
    },
  });
  useEffect(() => {
    reset({
      school: data.school,
      degree: data.degree,
      passYear: data.passYear,
      admitYear: data.admitYear,
    });
  }, [reset, data]);
  const onSubmit = async (formData: ExperienceFormData): Promise<void> => {
    const payload: ExperienceFormData = {
      school: formData.school,
      degree: formData.degree,
      passYear: formData.passYear,
      admitYear: formData.admitYear,
    };
    try {
      setLoading(true);
      const id: string = data._id;
      const result = await updateEducation(id, payload);
      if (result?.success) {
        Swal.fire({
          background: "#000",
          title: "Good Job!",
          text: result?.message || "Education Successfully Updated",
          icon: "success",
          confirmButtonText: "Okay",
          confirmButtonColor: "#DB2777",
        });
        await mutate();
        reset();
        setModalOpen(false);
        setLoading(false);
      }
    } catch (error: unknown) {
      console.error("Error updating experience:", error);

      const message =
        error instanceof Error
          ? error.message
          : typeof error === "string"
          ? error
          : "Failed to update experience";

      Swal.fire({
        background: "#DB2777",
        title: "Oops!",
        text: message,
        icon: "error",
        confirmButtonText: "Okay",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onClick={() => setModalOpen(false)}
      className={`z-10 fixed flex items-center justify-center h-screen w-screen place-items-center ${
        modalOpen ? "visible opacity-1" : "invisible opacity-0"
      } inset-0 backdrop-blur-sm bg-black/50 duration-100 `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute p-5 m-4 lg:w-2/5 lg:min-w-[40%] max-w-[90%] rounded-lg bg-slate-800 font-sans text-base text-blue-gray-500 ${
          modalOpen
            ? "translate-y-6 opacity-1 duration-300"
            : " opacity-0 duration-200"
        } shadow-2xl`}
      >
        <div className="">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">
            Update Your Experience
          </h1>

          <div className="md:flex md:justify-center md:items-center mt-5">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div>
                <Field
                  htmlFor="school"
                  label="School Name"
                  required
                  error={errors.school}
                >
                  <input
                    {...register("school", {
                      required: "School Name is required",
                    })}
                    type="text"
                    id="school"
                    name="school"
                    className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </Field>
              </div>
              <div>
                <Field
                  htmlFor="degree"
                  label="Degree"
                  required
                  error={errors.degree}
                >
                  <input
                    {...register("degree", {
                      required: "Degree is required",
                      minLength: {
                        value: 10,
                        message: "Degree must be at least 10 characters long",
                      },
                    })}
                    type="text"
                    id="degree"
                    name="degree"
                    className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Field
                    htmlFor="admitYear"
                    label="Admit Year Date"
                    required
                    error={errors.admitYear}
                  >
                    <input
                      {...register("admitYear", {
                        required: "Admit Year is required",
                      })}
                      type="date"
                      id="admitYear"
                      name="admitYear"
                      className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </Field>
                </div>
                <div>
                  <Field
                    htmlFor="passYear"
                    label="End Date"
                    required
                    error={errors.passYear}
                  >
                    <input
                      {...register("passYear", {
                        required: "Pass Year is required",
                      })}
                      type="date"
                      id="passYear"
                      name="passYear"
                      className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </Field>
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="px-8 py-2 mr-1 bg-green-600 font-sans text-xs font-bold text-white uppercase transition-all rounded-lg "
                >
                  {loading ? "Loading....." : "Update Education"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
