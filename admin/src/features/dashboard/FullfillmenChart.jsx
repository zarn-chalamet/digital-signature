import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import useTheme from '@/hooks/useTheme';

const fakeFullfillmentData = [];
const startDate = new Date('2025-03-20T07:54:44.601Z');

for (let day = 0; day < 50; day++) {
    for (let timeIndex = 0; timeIndex < 3; timeIndex++) {
        const date = new Date(startDate);
        date.setUTCDate(startDate.getUTCDate() + day);
        date.setUTCHours(8 + timeIndex * 4);

        const timestamp = date.toISOString().replace('T', ' ').replace('Z', '+00');
        fakeFullfillmentData.push({
            time: timestamp,
            value: Math.floor(Math.random() * 50) + 1
        });
    }
}

export default function FullfillmenChart() {
    const [searchParams] = useSearchParams()
    const { isDark } = useTheme()

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))

    const allDates = eachDayOfInterval({
        start: subDays(new Date(), numDays - 1),
        end: new Date()
    })

    const data = allDates.map(date => {
        return {
            label: format(date, 'MMM dd'),
            data: fakeFullfillmentData.filter(data => isSameDay(date, new Date(data.time))).reduce((total, cur) => total + cur.value, 0),
        }
    })

    const colors = isDark
        ? {
            fullfillment: { stroke: "#4f46e5", fill: "#4f46e5" },
            text: "#e5e7eb",
            background: "#18212f",
        }
        : {
            fullfillment: { stroke: "#4f46e5", fill: "#c7d2fe" },
            text: "#374151",
            background: "#fff",
        };

    return (
        <div className="w-full p-5 border rounded-md dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <h2 className="mb-5 text-2xl font-bold dark:text-slate-50">Fullfillment from {format(allDates.at(0), 'MMM dd yyyy')} to {format(allDates.at(-1), 'MMM dd yyyy')}</h2>
            <ResponsiveContainer height={300} width={'100%'}>
                <AreaChart data={data} >
                    <XAxis dataKey={'label'} tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
                    <YAxis tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
                    <CartesianGrid strokeDasharray={'4'} />
                    <Tooltip contentStyle={{ backgroundColor: colors.background }} />
                    <Area
                        dataKey={'data'}
                        type={'monotone'}
                        strokeWidth={2}
                        stroke={colors.fullfillment.stroke}
                        fill={colors.fullfillment.fill}
                        name="Full-fillment"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
