import { FileCheck, Flag, NotepadText, Users2Icon } from "lucide-react";
import Title from "../../ui/Title";
import DashboardFilter from "./DashboardFilter";
import FullfillmenChart from "./FullfillmenChart";
import Stat from "./Stat";
import StatusChart from "./StatusChart";
import TodayActivity from "./TodayActivity";
import { useSearchParams } from "react-router-dom";
import useUserLists from '../user/useUserLists'
import useAllTemplates from '../template/useAllTemplates'

export default function DashboardLayout() {
    const { userLists } = useUserLists()
    const { templates } = useAllTemplates()
    const [searchParams] = useSearchParams()

    const filterValue = Number(searchParams.get('last')) || 7

    const checkPoint = (value) => {
        if (value === 7) return { req: 350, rate: 48 }
        if (value === 30) return { req: 742, rate: 56 }
        if (value === 90) return { req: 1129, rate: 52 }
    }

    return (
        <section className='flex flex-col gap-y-4'>
            <div className="flex items-center justify-between">
                <Title title={"Dashboard"} />
                <DashboardFilter />
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Stat label={'Users'} value={userLists?.length} icon={Users2Icon} color={'text-blue-500'} />
                <Stat label={'Templates'} value={templates?.length} icon={NotepadText} color={'text-orange-500'} />
                <Stat label={'Requests'} value={checkPoint(filterValue)?.req} icon={Flag} color={'text-yellow-500'} />
                <Stat label={'Fullfillment Rate'} value={checkPoint(filterValue)?.rate} icon={FileCheck} color={'text-green-600'} />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <TodayActivity />
                <StatusChart />
            </div>
            <FullfillmenChart />
        </section>
    )
}
