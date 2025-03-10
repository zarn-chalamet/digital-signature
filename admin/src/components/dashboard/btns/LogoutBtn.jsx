/* eslint-disable react/prop-types */
export default function LogoutBtn({ setShowModal }) {
    return (
        <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 text-sm text-white font-semibold rounded-full bg-primary" type='button'>
            Logout
        </button>
    )
}
