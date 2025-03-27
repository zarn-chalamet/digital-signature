/* eslint-disable react/prop-types */
export default function CreateBtn({ text, setShowModal }) {

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                type='button'
                className='px-4 py-2 text-white transition-colors duration-200 rounded-md bg-secondary hover:bg-blue-800'
            >
                {text}
            </button>
        </>
    );
}