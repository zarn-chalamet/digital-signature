import defaultImage from '@/assets/default.jpg';
import { useSelector } from 'react-redux';

export default function Avatar() {
    const user = useSelector(store => store.user.user)
    
    return (
        <>
            <img src={user?.image || defaultImage} alt="" className='w-10 h-10 border rounded-full cursor-pointer dark:border-slate-700 border-slate-300' />
        </>
    )
}
