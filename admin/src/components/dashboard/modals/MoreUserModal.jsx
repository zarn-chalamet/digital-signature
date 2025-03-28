/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import UserModal from './UserModal'
import DeleteModal from './DeleteModal'

export default function MoreModal({ user, deleteUser }) {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    return (
        <>
            <div className="absolute right-0 z-10 w-32 bg-white border rounded-md shadow-md top-8">
                <button
                    onClick={() => {
                        setIsOpenEditModal(true)
                    }}
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
                isOpenEditModal && <UserModal user={user} setShowModal={setIsOpenEditModal} />
            }
            {
                isOpenDeleteModal && <DeleteModal type={'user'} onCancel={() => setIsOpenDeleteModal(false)} onAction={() => deleteUser(user._id)} />
            }
        </>
    )
}
