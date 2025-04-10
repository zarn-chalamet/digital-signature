/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import api from "@/utils/api";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from 'react-redux';
import { renameTemplate } from "@/features/template/templateSlice";

export default function RenameTemplateModal({ currentId, currentTitle, onClose }) {
    const [newTitle, setNewTitle] = useState(currentTitle || "");
    const dispatch = useDispatch()
    const modalRef = useRef(null)
    const { accessToken } = useAuth()
    const [isEditing, setIsEditing] = useState(false);

    useClickOutside([modalRef], () => onClose());

    const handleRename = async (e) => {
        e.preventDefault()
        try {
            setIsEditing(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const res = await api.post('/api/admin/rename-template', {
                templateId: currentId,
                newTitle
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            dispatch(renameTemplate(currentId, newTitle))
            toast.success(res.data.message)
            setNewTitle('')
            onClose()
        }
        catch (err) {
            console.log(err.message)
            toast.error(err.message)
        }
        finally {
            setIsEditing(false)
        }
    };

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
            <form onSubmit={handleRename} ref={modalRef} className="p-6 bg-white rounded-lg shadow-lg animate-slideUp w-[450px] md:w-[600px]">
                <h2 className="mb-4 text-lg font-semibold">Rename Template</h2>

                <input
                    disabled={isEditing}
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className={cn('focus:border-indigo-500 w-full px-3 py-2 transition-all duration-500 border rounded-md focus:outline-0')}
                />

                <div className="flex justify-between mt-6">
                    <button
                        disabled={isEditing}
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isEditing}
                        type="submit"
                        className="px-4 py-2 text-white bg-indigo-700 rounded-md disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {isEditing ? "Renaming..." : "Rename"}
                    </button>
                </div>
            </form>
        </div>
    );
}