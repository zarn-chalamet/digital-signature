import { cn } from "../../../utils/cn";

/* eslint-disable react/prop-types */
export default function StatusBtn({ user, toggleStatus }) {
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={user.status}
                className="sr-only peer"
                onChange={() => toggleStatus(user.id)}
            />
            <div className="h-6 transition-all bg-gray-300 rounded-full w-11 peer-checked:bg-green-500 peer-focus:ring-0">
                <div className={cn("absolute w-4 h-4 transition-transform bg-white rounded-full top-1", user.status ? 'translate-x-6' : 'translate-x-0 left-1')}></div>
            </div>
        </label>
    )
}
