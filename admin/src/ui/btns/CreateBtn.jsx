import { HiPlus } from "react-icons/hi2";

export default function CreateBtn() {
    return (
        <button
            className='flex items-center gap-1 px-4 py-2 text-white transition-colors duration-200 rounded-md bg-secondary hover:bg-blue-800'>
            <HiPlus /> Create New User
        </button>
    );
}