'use client';
import { TExperience } from "@/app/Interface/experience.interface";
import { formatDate } from "@/utils/formatDate";
import { FaEdit } from "react-icons/fa";
import { ExperienceModal } from "../Modal/EditExperienceDataModal";
import { useEffect, useState } from "react";
const ExperienceCard = ({ data, onUpdate }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [experience, setExperience] = useState(data);
    useEffect(() => {
        setExperience(data);
    }, [data]);
    return (
        <div className="border rounded-lg p-5 relative">
            <div className="">
                <div>( <span>{formatDate(data?.startDate)}</span> - <span>{formatDate(data?.endDate)}</span> )</div>
                <h2 className="text-2xl font-semibold text-white uppercase">{data?.role}</h2>
                <h3>{data?.company}</h3>
                <button
                    onClick={() => setModalOpen(true)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-pink-600 hover:bg-pink-800"
                    title="Edit"
                >
                    <FaEdit />
                </button>
                <button

                    className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-800"
                    title="Edit"
                >
                    <FaEdit />
                </button>
                <ExperienceModal onUpdate={(updatedData) => {
                    setExperience(updatedData); 
                    onUpdate(updatedData);     
                }} data={data} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
        </div>
    )
}


export default ExperienceCard;