import React from "react";

/* eslint-disable react/prop-types */
export default function Stat({ label, value, icon, color }) {
    return (
        <div className="flex items-center p-4 border rounded-md md:p-5 bg-slate-50 border-slate-300 dark:bg-slate-900 dark:border-slate-700">
            <div className="flex items-center gap-3">
                <div className="p-4 bg-blue-100 border rounded-full dark:border-slate-500 md:p-5 dark:bg-slate-700">
                    <div className={`flex items-center justify-center ${color} md:size-7 size-5`}>{icon && React.createElement(icon)}</div>
                </div>
                <div>
                    <h1 className="text-sm font-medium text-gray-500 md:text-[16px] mb-1">{label}</h1>
                    <p className="text-3xl font-bold md:text-4xl dark:text-slate-50">{label !== 'Fullfillment Rate' ? value : `${value}%`}</p>
                </div>
            </div>
        </div>
    )
}
