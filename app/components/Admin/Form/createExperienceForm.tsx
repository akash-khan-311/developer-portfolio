"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Field from "@/app/components/shared/Form/Field";
import { createExperience } from "@/lib/createExperienceData";
import Swal from "sweetalert2";

type Props = {
  mutate: () => void;
};
const CreateExperienceForm = ({ mutate }: Props) => {
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<{
    company: string;
    role: string;
    startDate: Date;
    endDate: string | Date | null;
  }>({
    defaultValues: {
      company: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const submitForm = async (data: {
    company: string;
    role: string;
    startDate: Date;
    endDate: string | Date | null;
  }) => {
    const payload = {
      ...data,
      endDate: currentlyWorking ? "Present" : data.endDate,
    };

    try {
      setSubmitFormLoading(true);
      const result = await createExperience(payload);
      if (!result.success) {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong",
          icon: "error",
        });
        setSubmitFormLoading(false);
        return;
      }
      if (result.success) {
        Swal.fire({
          title: "Good Job!",
          text: result.message || "Experience Created Successfully",
          icon: "success",
        });
        setSubmitFormLoading(false);
        reset();
        await mutate();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately, e.g., show a toast notification
    } finally {
      setSubmitFormLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} action="">
      <div>
        <Field
          htmlFor="company"
          label="Company Name"
          required
          error={errors.company}
        >
          <input
            {...register("company", {
              required: "Company Name is required",
            })}
            type="text"
            id="company"
            name="company"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-slate-900 focus:outline-none focus:border-blue-500"
          />
        </Field>
      </div>
      <div>
        <Field htmlFor="role" label="Role" required error={errors.role}>
          <input
            {...register("role", {
              required: "Role is required",
            })}
            type="text"
            id="role"
            name="role"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-slate-900 focus:outline-none focus:border-blue-500"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Field
            htmlFor="startDate"
            label="Start Date"
            required
            error={errors.startDate}
          >
            <input
              {...register("startDate", {
                required: "Start Date is required",
              })}
              type="date"
              id="startDate"
              name="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-slate-900 focus:outline-none focus:border-blue-500"
            />
          </Field>
        </div>
        <div>
          <Field htmlFor="endDate" label="End Date" error={errors.endDate}>
            <input
              {...register("endDate")}
              type="date"
              id="endDate"
              value={currentlyWorking ? "Present" : undefined}
              disabled={currentlyWorking}
              onChange={(e) => setValue("endDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-slate-900 focus:outline-none focus:border-blue-500"
            />
          </Field>
          <div className="flex items-center mt-1">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={currentlyWorking}
              onChange={(e) => setCurrentlyWorking(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="currentlyWorking" className="text-sm">
              Currently Working Here
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-8 py-2 mt-6 text-lg text-white bg-green-600 rounded hover:bg-green-700"
      >
        {submitFormLoading ? "Loading....." : "Add Experience"}
      </button>
    </form>
  );
};

export default CreateExperienceForm;
