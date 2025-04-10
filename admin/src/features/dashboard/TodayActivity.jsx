import { fakeTodayData } from "../../utils/constants";

export default function TodayActivity() {
    return (
        <div className="p-5 space-y-3 border rounded-md bg-slate-50 dark:bg-slate-900 dark:border-slate-700">
            <h2 className="text-2xl font-bold dark:text-slate-50">Today Activities</h2>
            <div className="h-64 overflow-y-scroll">
                {
                    fakeTodayData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between px-2 py-3 border-b dark:border-slate-700 last:border-b-0 dark:text-slate-50">
                            <span className="px-2 text-xs font-bold text-blue-600 bg-blue-200 rounded-full">{data.status}</span>
                            <h3 className="font-semibold">{data.sender} &rarr; {data.receiver}</h3>
                            <span className="text-sm italic font-thin">{data.time}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
