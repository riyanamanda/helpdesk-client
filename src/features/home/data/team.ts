import {
    AdriImg,
    DetiImg,
    GunawanImg,
    LedyImg,
    NabilaImg,
    RahmatImg,
    RendraImg,
    RiyanImg,
} from "@/assets/images";

export interface TeamMember {
    name: string;
    role: string;
    image?: string;
    featured?: boolean;
}

export const team: TeamMember[] = [
    {
        name: "Ledyana Puspasari",
        role: "IT Manager",
        featured: true,
        image: LedyImg,
    },
    {
        name: "Gunawan Santoso",
        role: "IT Support",
        image: GunawanImg,
    },
    {
        name: "Rendra Triyono",
        role: "Network Engineer",
        image: RendraImg,
    },
    {
        name: "Adriansyah Malikus Saleh",
        role: "Network Engineer",
        image: AdriImg,
    },
    {
        name: "Deti Nadya Rahma",
        role: "IT Helpdesk",
        image: DetiImg,
    },
    {
        name: "Riyan Amanda Nasution",
        role: "Fullstack Software Engineer",
        image: RiyanImg,
    },
    {
        name: "Rahmat Setiawan",
        role: "IT Support",
        image: RahmatImg,
    },
    {
        name: "Nabila",
        role: "IT Administrator",
        image: NabilaImg,
    },
];
