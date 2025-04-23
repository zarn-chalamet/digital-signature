import { LayoutDashboard, NotepadText, FileClock, ScrollText, ClipboardMinus } from "lucide-react";

export const navbarLinks = [
    {
        links: [
            {
                label: 'Dashboard',
                icon: LayoutDashboard,
                path: '/dashboard'
            },
            {
                label: "Requests",
                icon: ScrollText,
                path: "/requests",
            },
            {
                label: "Templates",
                icon: NotepadText,
                path: "/templates",
            },
            {
                label: "Reports",
                icon: ClipboardMinus,
                path: "/reports",
            },
            {
                label: "History",
                icon: FileClock,
                path: "/history",
            },
        ],
    }
];