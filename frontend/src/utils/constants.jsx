import { LayoutDashboard, NotepadText, UserCog } from "lucide-react";

export const navbarLinks = [
    {
        links: [
            {
                label: 'Dashboard',
                icon: LayoutDashboard,
                path: '/dashboard'
            },
            {
                label: "Manage Users",
                icon: UserCog,
                path: "/manage-users",
            },
            {
                label: "Template",
                icon: NotepadText,
                path: "/template",
            },
        ],
    }
];