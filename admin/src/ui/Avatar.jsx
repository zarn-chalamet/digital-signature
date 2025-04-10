import defaultImage from '@/assets/default.jpg';

export default function Avatar() {
    return (
        <>
            <img src={defaultImage} alt="" className='w-10 h-10 rounded-full' />
        </>
    )
}
