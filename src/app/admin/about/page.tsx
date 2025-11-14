"use client";
import Field from "@/components/shared/Form/Field";
import Loader from "@/components/shared/Loader";
import { getAboutData } from "@/lib/getAboutData";
import { updateAboutData } from "@/lib/updateAboutData";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  //! this is react hook form methods
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<{ description: string; profileImage: FileList }>({
    defaultValues: {
      description: "",
      profileImage: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
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
  // Fetch hero data using fetch API
  useEffect(() => {
    async function fetchAbout() {
      setLoading(true);
      try {
        const data = await getAboutData();
        const about = data?.data;
        if (!about) {
          console.error("No about data found");
          return;
        }
        setAboutData(about);
        if (about) {
          reset({
            description: about?.description || "",
          });
          setPreviewImage(about?.profileImage);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load hero data");
      }
    }

    fetchAbout();
  }, [reset]);

  const submitForm = async (data: {
    description: string;
    profileImage: FileList;
  }) => {
    try {
      setSubmitFormLoading(true);
      const file = data?.profileImage?.[0];
      if (!file) {
        alert("Please Select a Profile Image");
        return;
      }

      const imageUrl = await uploadImageToCloudinary(file);
      const payload = {
        description: data.description,
        profileImage: imageUrl,
      };

      const result = await updateAboutData(payload);
      if (!result.success) {
        toast.error(result.message || "Something went wrong");
        return;
      }
      if (result.success) {
        toast.success(result.message);
        reset();
        setPreviewImage(imageUrl);
      }
    } catch (error) {
      setSubmitFormLoading(false);
      console.error("Error uploading image:", error);
    } finally {
      setSubmitFormLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Field
              htmlFor="description"
              label="Description"
              required
              error={errors.description}
            >
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={5}
                id="description"
                name="description"
                className="w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </Field>
          </div>
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
            <Field
              htmlFor="profileImage"
              label="Profile Image"
              required
              error={errors.profileImage}
            >
              <input
                {...register("profileImage", {
                  required: "Profile image is required",
                })}
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={loadFile}
                className="w-full px-3 py-10 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </Field>
          </div>
          <div className="mt-5">
            <button
              className=" bg-green-700 hover:bg-green-500 transition-all duration-300 rounded-md text-lg px-8 py-1 "
              type="submit"
            >
              {submitFormLoading ? "Loading...." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutPage;
