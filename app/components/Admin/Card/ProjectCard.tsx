'use client'
import Image from "next/image";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const ProjectCard = ({ data, mutate }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const handleDelete = (id: string) => {

    }
    return (
        <div className="border rounded-lg p-5 relative">
            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex rounded-full mt-3">
                        <Image src={data?.image} alt={data?.name} width={300} height={300} className="object-cover" />
                    </div>
                    <h2 className="text-3xl font-semibold text-white uppercase">{data?.title}</h2>

                </div>

                <Link href={`/admin/project/edit/${data._id}`}>

                    <button

                        className="absolute top-3 right-3 p-2 rounded-full bg-pink-600 hover:bg-pink-800"
                        title="Edit"
                    >

                        <FaEdit />
                    </button>
                </Link>
                <button
                    onClick={() => handleDelete(data._id)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-800"
                    title="Delete"
                >
                    <MdDelete />
                </button>
               

            </div>
        </div>
    );
};

export default ProjectCard;