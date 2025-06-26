'use client'
import useSWR from "swr";

import { useState } from "react";
import Loader from '@/app/components/shared/Loader';
import CreateEducationModal from "../Modal/CreateEducationModal";
import EducationCard from "../Card/EducationCard";
const fetcher = (url: string) => fetch(url).then(res => res.json())
const EducationList = () => {
  const [showModal, setShowModal] = useState(false);
  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/education/`, fetcher, {
    revalidateOnFocus: false,
  })

  if (error) return (<div className="flex justify-center items-center h-[calc(100vh-100px)]">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Something went wrong</h1>
  </div>)

  if (!data) return < Loader />

  const educationData = data?.data
  return (
    <div className="">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Please Add Your Education </h1>
      <div className="md:flex md:justify-center md:items-center mt-8">
        <CreateEducationModal modal={showModal} setModal={setShowModal} mutate={mutate} />
        <button onClick={() => setShowModal(true)} className="px-8 p-2 rounded-md bg-pink-700 w-full lg:w-1/4 mx-auto">Add Education</button>

      </div>
      <div className="mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Your Added Degrees </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {


            educationData?.map((data: ({ _id: string; school: string, degree: string; startDate: string, endDate: string })) => (
              <EducationCard key={data._id} data={data} mutate={mutate} />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default EducationList;