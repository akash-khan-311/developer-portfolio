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
import { THero } from '@/app/Interface/hero.interface';
import Link from 'next/link';

const AdminHeroPage = () => {

  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [slugInput, setSlugInput] = useState('');
  const [slug, setSlug] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<THero>({
    defaultValues: {
      name: '',
      slug: [],
      socialLinks: {
        facebook: '',
        twitter: '',
        linkedin: '',
        github: '',
      },
      resume: '',
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
            name: hero?.name || '',
            slug: hero?.slug || [],
            socialLinks: {
              facebook: hero?.socialLinks?.facebook || '',
              twitter: hero?.socialLinks?.twitter || '',
              linkedin: hero?.socialLinks?.linkedin || '',
              github: hero?.socialLinks?.github || '',
            },
            resume: hero?.resume || '',
          });
          setSlug(hero?.slug || []);

        }
      } catch (error) {
        console.error('Failed to load hero data');
      }
    }

    fetchHero();
  }, [reset]);
  const addIntro = () => {
    const trimmed = slugInput.trim();
    if (trimmed && !slug.includes(trimmed)) {
      const updated = [...slug, trimmed];
      setSlug(updated);
      setValue('slug', updated);
      setSlugInput('');
      if (updated.length >= 2) {
        clearErrors('slug');
      }
    }
  };

  const removeIntro = (index: number) => {
    const updated = slug.filter((_, i) => i !== index);
    setSlug(updated);
    setValue('slug', updated);
  };
  // Submit handler using fetch PUT
  const onSubmit = async (data: THero) => {
    if (slug.length < 2) {
      setError('slug', {
        type: 'manual',
        message: 'At least two intro text is required',
      });
      return;
    }

    setLoading(true);
    try {

      const payload = {
        ...data,
        slug,
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


  // if (!heroData) return <Loader />;
  return (
    <div className=" mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-4">🦸 Edit Hero Section</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4  p-6 rounded-lg shadow-md"
      >

        {/* Name Field */}
        <div>
          <Field label="Name " required error={errors.name}>
            <input {...register("name", { required: "Name Title is Required" })} name='name' type='text' id='name' placeholder='ex: Your Name ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>
        {/* Resume */}
        <div>
          <Field label="Your Resume Drive Link" required error={errors?.resume}>
            <input {...register("resume", { required: "Resume URL is Required" })} name='resume' type='text' id='resume' placeholder='ex: https://drive.google.com/file/d/ ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>
        {/* Social Field */}
        {/* Facebook */}
        <div>
          <Field label="Facebook URL" required error={errors?.socialLinks?.facebook}>
            <input {...register("socialLinks.facebook", { required: "Facebook URL is Required" })} name='socialLinks.facebook' type='text' id='facebook' placeholder='ex: https://facebook.com/your_profile_id ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>
        {/* Linkdin */}
        <div>
          <Field label="Linkedin URL" required error={errors?.socialLinks?.linkedin}>
            <input {...register("socialLinks.linkedin", { required: "Linkedin URL is Required" })} name='socialLinks.linkedin' type='text' id='linkedin' placeholder='ex: https://linkedin.com/your_profile_id ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>
        {/* Twitter */}
        <div>
          <Field label="Twitter URL" required error={errors?.socialLinks?.twitter}>
            <input {...register("socialLinks.twitter", { required: "Twitter URL is Required" })} name='socialLinks.twitter' type='text' id='twitter' placeholder='ex: https://x.com/your_profile_id ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>
        {/* github */}
        <div>
          <Field label="Github URL" required error={errors?.socialLinks?.github}>
            <input {...register("socialLinks.github", { required: "Github URL is Required" })} name='socialLinks.github' type='text' id='github' placeholder='ex: https://github.com/your_profile_id ' className='w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          </Field>
        </div>

        {/* IntroText: Array input */}
        <div>
          <label>Add Slug</label>
          <div className="flex gap-2">
            <input
              value={slugInput}
              onChange={(e) => setSlugInput(e.target.value)}
              placeholder="ex: web developer"
              className=' w-full px-3 py-2 border bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />

            <button className={'px-4 py-1 bg-pink-500 rounded-lg'} type="button" onClick={addIntro}>
              Add
            </button>

          </div>
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.slug as FieldError)?.message}
            </p>
          )}
          {/* Show list */}
          <ul className="mt-2 space-y-1 inline">
            {slug.map((text, index) => (
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

        </div>

        <div className="flex items-center justify-between gap-4">
          <button className="px-6 py-1 bg-green-500 rounded-md hover:bg-green-600" type="submit" disabled={loading || isSubmitting}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          <Link href="/" className="px-6 py-1 bg-pink-700 rounded-md hover:bg-pink-600">
            <button >
              Preview
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminHeroPage;