/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import RenameTemplateModal from "./RenameTemplateModal";
// import DeleteModal from "./DeleteModal";

export default function MoreTemplateModal({ template, setShowModal, onAction }) {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    return (
        <>
            <div className="absolute z-10 w-32 bg-white border rounded-md shadow-md right-5 top-[51px]">
                <button
                    onClick={() => setIsOpenEditModal(true)}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit size={16} />
                    Edit
                </button>
                <button
                    onClick={() => setIsOpenDeleteModal(true)}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
            {
                isOpenEditModal && <RenameTemplateModal currentId={template._id} currentTitle={template.title} onClose={() => {
                    setIsOpenEditModal(false)
                    setShowModal({})
                }} />
            }
            {
                {/* isOpenDeleteModal && <DeleteModal type={'template'} onCancel={() => setIsOpenDeleteModal(false)} onAction={() => onAction(template._id)}/> */}
            }
        </>
    )
}
