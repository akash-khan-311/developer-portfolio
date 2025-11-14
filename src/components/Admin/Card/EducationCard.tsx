"use client";
import { formatDate } from "@/utils/formatDate";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ExperienceModal } from "../Modal/EditExperienceDataModal";
import { useState } from "react";
import { deleteExperience } from "@/lib/deleteExperienceData";
import Swal from "sweetalert2";
import { EducationModal } from "../Modal/EditEducationModal";
import { deleteEducationFromDB } from "@/lib/deleteEducation";
import { TExperience } from "@/Interface/experience.interface";
import { TEducation } from "@/Interface/education.interface";

type Props = {
  data: any;
  mutate: any;
};
const EducationCard = ({ data, mutate }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

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
          const res = await deleteEducationFromDB(id);
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
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="border rounded-lg p-5 relative">
      <div className="flex flex-col gap-y-5">
        <div>
          ( <span>{formatDate(data?.passYear)}</span> -{" "}
          <span>{formatDate(data?.admitYear)}</span> )
        </div>

        <h3>{data?.degree}</h3>
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
        <EducationModal
          mutate={mutate}
          data={data}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default EducationCard;
