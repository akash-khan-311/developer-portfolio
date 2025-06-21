'use client';
import { TExperience } from "@/app/Interface/experience.interface";
import { formatDate } from "@/utils/formatDate";
import { FaEdit } from "react-icons/fa";
import { ExperienceModal } from "../Modal/EditExperienceDataModal";
import { useState } from "react";
const ExperienceCard = ({ data }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="border rounded-lg p-5 relative">
            <div className="">
                <div>( <span>{formatDate(data?.startDate)}</span> - <span>{formatDate(data?.endDate)}</span> )</div>
                <h2 className="text-2xl font-semibold text-white uppercase">{data?.role}</h2>
                <h3>{data?.company}</h3>
                <button
                onClick={() => setModalOpen(true)} 
                    className="absolute top-3 right-3 p-3 text-xl rounded-full bg-gray-600 hover:bg-gray-800"
                    title="Edit"
                >
                    <FaEdit />
                </button>
                <ExperienceModal data={data} modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
        </div>
    )
}


export default ExperienceCard;