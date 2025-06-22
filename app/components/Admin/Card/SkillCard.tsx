'use client'
import { TSkills } from "@/app/Interface/skills.interface";
import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateSkillModal from "../Modal/updateSkillModal";

type Props = {
    data: {
        _id: string;
        name: string;
        icon: string;
    }
    mutate: () => Promise<unknown>;
}

const SkillCard = ({ data, mutate }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    
    return (
        <div className="border rounded-lg p-5 relative">
            <div className="">
               <div className="">
                <h2 className="text-3xl font-semibold text-white uppercase">{data?.name}</h2>
               <div className="flex rounded-full mt-3">
                 <Image src={data?.icon} alt={data?.name} width={50} height={50} className="object-cover"/>
               </div>
               </div>
                
                <button
                    onClick={() => setModalOpen(true)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-pink-600 hover:bg-pink-800"
                    title="Edit"
                >
                    <FaEdit />
                </button>
                <button
                    // onClick={() => handleDelete(data._id)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-800"
                    title="Delete"
                >
                    <MdDelete />
                </button>
                <UpdateSkillModal mutate={mutate} data={data} modalOpen={modalOpen} setModalOpen={setModalOpen} />

            </div>
        </div>

    )
        ;
};

export default SkillCard;