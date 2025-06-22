'use client'

import useSWR from "swr";
import Loader from "../../shared/Loader";
import { useState } from "react";
import CreateSkillsFormModal from '@/app/components/Admin/Modal/createSkillsFormModal';
import SkillCard from "../Card/SkillCard";
const fetcher = (url: string) => fetch(url).then(res => res.json())
const SkillLists = () => {
  const [showModal, setShowModal] = useState(false);
    const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/`, fetcher, {
    revalidateOnFocus: false,
  })
  if (error) return (<div className=" flex justify-center items-center h-[calc(100vh-100px)]">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Something went wrong</h1>
  </div>)

  if (!data) return <Loader />

  const skills = data?.data

  console.log(skills);
    return (
    <div className="">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white text-center">Did You Learn Something ? Please Add This Skill</h1>
      <div className="md:flex md:justify-center md:items-center mt-8">
        <button onClick={()=>setShowModal(true)} className="px-8 p-2 rounded-md bg-pink-700 w-full lg:w-1/4">Add Skills</button>
        <CreateSkillsFormModal modal={showModal}setModal={setShowModal} mutate={mutate} />
      </div>
      <div className="mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Your Added Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {


            skills?.map((data: { _id: string; name: string, icon: string;}) => (
              <SkillCard key={data._id} data={data} mutate={mutate} />
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default SkillLists;