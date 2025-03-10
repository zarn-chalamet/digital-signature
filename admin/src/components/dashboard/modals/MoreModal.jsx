/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";

export default function MoreModal({user, deleteUser}) {
    return (
        <div className="absolute right-0 z-10 w-32 bg-white border rounded-md shadow-md top-8">
            <button className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Edit size={16} />
                Edit
            </button>
            <button
                onClick={() => deleteUser(user.id)}
                className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
                <Trash2 size={16} />
                Delete
            </button>
        </div>
    )
}
