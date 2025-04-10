import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSearchParams } from "react-router-dom";

export default function StatusChart() {
    const [searchParams] = useSearchParams();

    const filterValue = Number(searchParams.get("last")) || 7;

    const getStatusSummary = (days) => {
        switch (days) {
            case 7:
                return [
                    { label: "Pending", value: 15, color: "#3B82F6" },
                    { label: "Success", value: 80, color: "#22C55E" },
                    { label: "Fail", value: 5, color: "#DC2626" },
                ];
            case 30:
                return [
                    { label: "Pending", value: 25, color: "#3B82F6" },
                    { label: "Success", value: 65, color: "#22C55E" },
                    { label: "Fail", value: 10, color: "#DC2626" },
                ];
            case 90:
                return [
                    { label: "Pending", value: 20, color: "#3B82F6" },
                    { label: "Success", value: 70, color: "#22C55E" },
                    { label: "Fail", value: 10, color: "#DC2626" },
                ];
            default:
                return [
                    { label: "Pending", value: 0, color: "#3B82F6" },
                    { label: "Success", value: 0, color: "#22C55E" },
                    { label: "Fail", value: 0, color: "#DC2626" },
                ];
        }
    };

    const fakeStatusSummary = getStatusSummary(filterValue);


    return (
        <div className="p-5 space-y-3 border rounded-md bg-slate-50 dark:bg-slate-900 dark:border-slate-700">
            <h2 className="text-2xl font-bold dark:text-slate-50">Status Summary</h2>
            <ResponsiveContainer width={'100%'} height={240}>
                <PieChart>
                    <Pie
                        data={fakeStatusSummary}
                        nameKey={'label'}
                        dataKey={'value'}
                        innerRadius={65}
                        outerRadius={110}
                        cx={'40%'}
                        cy={'50%'}
                        paddingAngle={3}
                    >
                        {fakeStatusSummary.map(entry => <Cell key={entry.label} fill={entry.color} stroke={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="middle" align="right" width={'30%'} layout="vertical" iconSize={15} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
