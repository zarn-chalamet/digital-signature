import Title from "../../ui/Title";
import { stats } from "../../utils/constants";
import Stat from "./Stat";

export default function DashboardLayout() {
    return (
        <section className='flex flex-col gap-y-4'>
            <Title title={"Dashboard"} />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <Stat key={index} label={stat.label} value={stat.value} icon={stat.icon} />
                ))}
            </div>
        </section>
    )
}
