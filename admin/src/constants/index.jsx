import { LayoutTemplate, NotepadText, UserCog, } from "lucide-react";

export const navbarLinks = [
    {
        links: [
            {
                label: "Manage Users",
                icon: UserCog,
                path: "/",
            },
            {
                label: "Template",
                icon: LayoutTemplate,
                path: "/template",
            },
            {
                label: "Reports",
                icon: NotepadText,
                path: "/reports",
            },
        ],
    }
];



export const userLists = [
    {
        number: 1,
        first_name: "John",
        last_name: "Doe",
        email: "jd@email.com",
        password: "jd2024",
        created_at: "2024-01-01",
        status: false,
    },
    {
        number: 2,
        first_name: "Alice",
        last_name: "Smith",
        email: "alice@email.com",
        password: "alice2024",
        created_at: "2024-02-15",
        status: true
    },
    {
        number: 3,
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob@email.com",
        password: "bob2024",
        created_at: "2024-03-10",
        status: false
    },
    {
        number: 4,
        first_name: "Emma",
        last_name: "Brown",
        email: "emma@email.com",
        password: "emma2024",
        created_at: "2024-04-05",
        status: true
    },
    {
        number: 5,
        first_name: "Michael",
        last_name: "Williams",
        email: "michael@email.com",
        password: "michael2024",
        created_at: "2024-05-20",
        status: false
    }
];