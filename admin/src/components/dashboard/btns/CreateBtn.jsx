import { useState } from "react";
import UserModal from "../modals/UserModal";

export default function CreateBtn() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsCreateModalOpen(true)}
                type='button'
                className='px-4 py-2 text-white transition-colors duration-200 rounded-md bg-secondary hover:bg-blue-800'
            >
                Create New User
            </button>

            {isCreateModalOpen && (
                <UserModal setShowModal={setIsCreateModalOpen} />
            )}
        </>
    );
}