'use client';
import { FieldError, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getHeroData } from '@/lib/getHeroData';
import Field from '@/app/components/shared/Form/Field';
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from 'next/image';
import { uploadImageToCloudinary } from '@/utils/uploadImageToCloudinary';
import { updateHeroData } from '@/lib/updateHeroData';
import Loader from '@/app/components/shared/Loader';

type HeroFormValues = {
  greet: string;
  name: string;
  introText: string[];
  backgroundImage?: string;
};
const AdminHeroPage = () => {

  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [introInput, setIntroInput] = useState('');
  const [introList, setIntroList] = useState<string[]>([]);
  // ! in from when the user upload the BG image and show the preview
  const [previewImage, setPreviewImage] = useState(
    "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
  );

  console.log(heroData?.backgroundImage)
  const [file, setFile] = useState<File | null>(null);
  const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({
    defaultValues: {
      greet: '',
      name: '',
      introText: [],
      backgroundImage: '',
    },
  });

  console.log(heroData)

  // Fetch hero data using fetch API
  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await getHeroData();
        const hero = data?.data;
        if (!hero) {
          console.error('No hero data found');
          return;
        }
        setHeroData(hero);
        if (hero) {
          reset({
            greet: hero?.greet || '',
            name: hero?.name || '',
            introText: hero?.introText || [],
            backgroundImage: hero?.backgroundImage || '',
          });
          setIntroList(hero?.introText || []);

          setPreviewImage(hero?.backgroundImage);

        }
      } catch (error) {
        console.error('Failed to load hero data');
      }
    }

    fetchHero();
  }, [reset]);
  const addIntro = () => {
    const trimmed = introInput.trim();
    if (trimmed && !introList.includes(trimmed)) {
      const updated = [...introList, trimmed];
      setIntroList(updated);
      setValue('introText', updated);
      setIntroInput('');
      if (updated.length >= 2) {
        clearErrors('introText');
      }
    }
  };

  const removeIntro = (index: number) => {
    const updated = introList.filter((_, i) => i !== index);
    setIntroList(updated);
    setValue('introText', updated);
  };
  // Submit handler using fetch PUT
  const onSubmit = async (data: HeroFormValues) => {
    if (introList.length < 2) {
      setError('introText', {
        type: 'manual',
        message: 'At least two intro text is required',
      });
      return;
    }

    setLoading(true);
    try {
      let imageUrl = heroData.backgroundImage || '';

      if (file) {
        imageUrl = await uploadImageToCloudinary(file)
      }
      const payload = {
        ...data,
        introText: introList,
        backgroundImage: imageUrl,
      };

      const result = await updateHeroData(payload)

      if (result?.success) {
        console.log(result.message || "Hero section updated!");
      } else {
        console.error(result.message || "Update failed!");
      }


    } catch (error) {
      console.error('Update failed!');
    } finally {
      setLoading(false);
    }
  };


  if (!heroData) return <Loader />;
  return (
    <div className=" mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">🦸 Edit Hero Section</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4  p-6 rounded-lg shadow-md"
      >
        <div>
          <Field label="Greet" required error={errors.greet}>
            <input  {...register("greet", { required: "Greet is Required" })} name='greet' type='text' id='greet' placeholder='ex: Assalamu Alaikum' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>

        <div>
          <Field label="Name " required error={errors.name}>
            <input {...register("name", { required: "Name Title is Required" })} name='name' type='text' id='name' placeholder='ex: Your Name ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>

        {/* IntroText: Array input */}
        <div>
          <label>Add Intro Text</label>
          <div className="flex gap-2">
            <input
              value={introInput}
              onChange={(e) => setIntroInput(e.target.value)}
              placeholder="ex: web developer"
              className=' w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />

            <button className={'px-4 py-1 bg-pink-500 rounded-lg'} type="button" onClick={addIntro}>
              Add
            </button>

          </div>
          {errors.introText && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.introText as FieldError)?.message}
            </p>
          )}
          {/* Show list */}
          <ul className="mt-2 space-y-1 inline">
            {introList.map((text, index) => (
              <li
                key={index}
                className=" flex items-center px-3 py-1 rounded-md"
              >
                <span className={'bg-gray-400 px-4 py-1 rounded-lg'}>{text}</span>
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => removeIntro(index)}
                >
                  <IoIosCloseCircleOutline className={'w-5 h-5'} />
                </button>
              </li>
            ))}
          </ul>
          <div className=" mt-5">

            <div className="">
              <Field
                htmlFor="backgroundImage"
                label="Profile Image"
                error={errors.backgroundImage as FieldError}
                required
              >

                <input {...register("backgroundImage", {
                  required: "Background Image is required",
                })} type="file"
                  accept="image/*"
                  onChange={loadFile} id="backgroundImage" className=" w-full cursor-pointer appearance-none rounded-md border border-gray-200 bg-slate-900 px-3 py-2 text-sm transition focus:z-10 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75" />


              </Field>
            </div>
            <div className="lg:w-[300px] lg:h-[300px] mt-5">
              <Image
                id="preview_img"
                className=" w-full h-full  border-2 p-1 rounded-md"
                src={previewImage}
                alt="Preview"
                width={100}
                height={100}
              />
            </div>

          </div>
        </div>

        <button className="px-6 py-1 bg-green-500 rounded-md hover:bg-green-600" type="submit" disabled={loading || isSubmitting}>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default AdminHeroPage;