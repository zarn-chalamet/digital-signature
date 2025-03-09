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



export const dummyUsers = [
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "jd@email.com",
        password: "jd2024",
        created_at: "2024-01-01",
        status: false,
    },
    {
        id: 2,
        first_name: "Alice",
        last_name: "Smith",
        email: "alice@email.com",
        password: "alice2024",
        created_at: "2024-02-15",
        status: true
    },
    {
        id: 3,
        first_name: "Bob",
        last_name: "Johnson",
        email: "bob@email.com",
        password: "bob2024",
        created_at: "2024-03-10",
        status: false
    },
    {
        id: 4,
        first_name: "Emma",
        last_name: "Brown",
        email: "emma@email.com",
        password: "emma2024",
        created_at: "2024-04-05",
        status: true
    },
    {
        id: 5,
        first_name: "Michael",
        last_name: "Williams",
        email: "michael@email.com",
        password: "michael2024",
        created_at: "2024-05-20",
        status: false
    },
    {
        id: 6,
        first_name: "Sophia",
        last_name: "Davis",
        email: "sophia@email.com",
        password: "sophia2024",
        created_at: "2024-06-11",
        status: true
    },
    {
        id: 7,
        first_name: "William",
        last_name: "Miller",
        email: "william@email.com",
        password: "william2024",
        created_at: "2024-07-08",
        status: false
    },
    {
        id: 8,
        first_name: "Olivia",
        last_name: "Garcia",
        email: "olivia@email.com",
        password: "olivia2024",
        created_at: "2024-08-14",
        status: true
    },
    {
        id: 9,
        first_name: "James",
        last_name: "Martinez",
        email: "james@email.com",
        password: "james2024",
        created_at: "2024-09-25",
        status: false
    },
    {
        id: 10,
        first_name: "Isabella",
        last_name: "Hernandez",
        email: "isabella@email.com",
        password: "isabella2024",
        created_at: "2024-10-10",
        status: true
    },
    {
        id: 11,
        first_name: "Ethan",
        last_name: "Young",
        email: "ethan@email.com",
        password: "ethan2024",
        created_at: "2024-11-03",
        status: false
    },
    {
        id: 12,
        first_name: "Mia",
        last_name: "King",
        email: "mia@email.com",
        password: "mia2024",
        created_at: "2024-12-17",
        status: true
    },
    {
        id: 13,
        first_name: "Alexander",
        last_name: "Scott",
        email: "alexander@email.com",
        password: "alexander2024",
        created_at: "2024-01-29",
        status: false
    },
    {
        id: 14,
        first_name: "Charlotte",
        last_name: "Perez",
        email: "charlotte@email.com",
        password: "charlotte2024",
        created_at: "2024-02-14",
        status: true
    },
    {
        id: 15,
        first_name: "Benjamin",
        last_name: "Lee",
        email: "benjamin@email.com",
        password: "benjamin2024",
        created_at: "2024-03-06",
        status: false
    }
];