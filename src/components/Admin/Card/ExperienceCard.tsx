"use client";
import { formatDate } from "@/utils/formatDate";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ExperienceModal } from "../Modal/EditExperienceDataModal";
import { useState } from "react";
import { deleteExperience } from "@/lib/deleteExperienceData";
import Swal from "sweetalert2";
import { TExperience } from "@/Interface/experience.interface";

type Props = {
  data: TExperience;
  mutate: () => Promise<unknown>;
};
const ExperienceCard = ({ data, mutate }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  console.log(data);
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteExperience(id);
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            await mutate();
          }
        }
      });
    } catch (error) {}
  };

  return (
    <div className="border rounded-lg p-5 relative">
      <div className="">
        <div>
          ( <span>{formatDate(data?.startDate)}</span> -{" "}
          <span>
            {data?.endDate === null ? "Present" : formatDate(data?.endDate)}
          </span>{" "}
          )
        </div>
        <h2 className="text-2xl font-semibold text-white uppercase">
          {data?.role}
        </h2>
        <h3>{data?.company}</h3>
        <button
          onClick={() => setModalOpen(true)}
          className="absolute top-3 right-3 p-2 rounded-full bg-pink-600 hover:bg-pink-800"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => handleDelete(data._id)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-800"
          title="Delete"
        >
          <MdDelete />
        </button>
        <ExperienceModal
          mutate={mutate}
          data={data}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;
