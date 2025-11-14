'use client'
import { useState } from "react";
import useSWR from "swr";
import Loader from "../../shared/Loader";
import AddProjectForm from "../Form/AddProjectForm";
import ProjectCard from "../Card/ProjectCard";
const fetcher = (url: string) => fetch(url).then(res => res.json())
const ProjectList = () => {
  
  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/`, fetcher, {
    revalidateOnFocus: false,
  })
 
  if (error) return (<div className=" flex justify-center items-center h-[calc(100vh-100px)]">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Something went wrong</h1>
  </div>)

  if (!data) return <Loader />

  const projectData = data?.data
  return (
    <div className="">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Did you complete a Project ? </h1>
      <div className="md:flex md:justify-center md:items-center mt-8">
        <div className="md:flex md:justify-center md:items-center mt-5">
          <AddProjectForm mutate={mutate} />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center">Your Added Project Here </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {
            projectData?.map((data: { _id: string; company: string, role: string; endDate: string, startDate: string }) => (
              <ProjectCard key={data._id} data={data}  mutate={mutate}/>
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default ProjectList;