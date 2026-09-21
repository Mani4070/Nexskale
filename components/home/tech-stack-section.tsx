"use client";

import type { IconType } from "react-icons";

// Frontend
import { SiReact } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { SiVuedotjs } from "react-icons/si";
import { SiAngular } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiMui } from "react-icons/si";
import { SiBootstrap } from "react-icons/si";
import { SiSass } from "react-icons/si";

// Backend
import { SiNodedotjs } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiNestjs } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiFastapi } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { SiJsonwebtokens } from "react-icons/si";
import { TbWebhook } from "react-icons/tb";

// Database
import { SiPostgresql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { SiRedis } from "react-icons/si";
import { SiMongoose } from "react-icons/si";

// Cloud & DevOps
import { FaAws } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { SiVercel } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import { SiKubernetes } from "react-icons/si";
import { SiSupabase } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { SiGithubactions } from "react-icons/si";

// AI & Automation
import { TbBrandOpenai } from "react-icons/tb";
import { MdAutoAwesome } from "react-icons/md";
import { TbBrain } from "react-icons/tb";
import { MdSmartToy } from "react-icons/md";
import { SiLangchain } from "react-icons/si";
import { TbMessageChatbot } from "react-icons/tb";
import { MdAutoMode } from "react-icons/md";

// Tools
import { SiGit } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { SiFigma } from "react-icons/si";
import { SiPostman } from "react-icons/si";
import { SiStripe } from "react-icons/si";
import { SiRazorpay } from "react-icons/si";
import { SiCloudinary } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type TechItem = { name: string; Icon: IconType; color: string };

const ALL_ITEMS: TechItem[] = [
    // Frontend
    { name: "React.js", Icon: SiReact, color: "#61dafb" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#555555" },
    { name: "Vue.js", Icon: SiVuedotjs, color: "#42b883" },
    { name: "Angular", Icon: SiAngular, color: "#dd0031" },
    { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
    { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
    { name: "Material UI", Icon: SiMui, color: "#007fff" },
    { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3" },
    { name: "SCSS", Icon: SiSass, color: "#cc6699" },
    // Backend
    { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", Icon: SiExpress, color: "#888888" },
    { name: "NestJS", Icon: SiNestjs, color: "#e0234e" },
    { name: "Python", Icon: SiPython, color: "#3776ab" },
    { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
    { name: "REST APIs", Icon: TbApi, color: "#10b981" },
    { name: "JWT", Icon: SiJsonwebtokens, color: "#d63aff" },
    { name: "Webhooks", Icon: TbWebhook, color: "#f59e0b" },
    // Database
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169e1" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47a248" },
    { name: "MySQL", Icon: SiMysql, color: "#4479a1" },
    { name: "Redis", Icon: SiRedis, color: "#dc382d" },
    { name: "Mongoose", Icon: SiMongoose, color: "#880000" },
    // Cloud & DevOps
    { name: "AWS", Icon: FaAws, color: "#ff9900" },
    { name: "Google Cloud", Icon: SiGooglecloud, color: "#4285f4" },
    { name: "Vercel", Icon: SiVercel, color: "#555555" },
    { name: "Docker", Icon: SiDocker, color: "#2496ed" },
    { name: "Kubernetes", Icon: SiKubernetes, color: "#326ce5" },
    { name: "Supabase", Icon: SiSupabase, color: "#3ecf8e" },
    { name: "Firebase", Icon: SiFirebase, color: "#ffca28" },
    { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff" },
    // AI & Automation
    { name: "OpenAI", Icon: TbBrandOpenai, color: "#10a37f" },
    { name: "Generative AI", Icon: MdAutoAwesome, color: "#a855f7" },
    { name: "RAG", Icon: TbBrain, color: "#f43f5e" },
    { name: "AI Agents", Icon: MdSmartToy, color: "#6366f1" },
    { name: "LangChain", Icon: SiLangchain, color: "#3ecf8e" },
    { name: "LLM APIs", Icon: TbMessageChatbot, color: "#8b5cf6" },
    { name: "Workflow Automation", Icon: MdAutoMode, color: "#f59e0b" },
    // Tools
    { name: "Git", Icon: SiGit, color: "#f05032" },
    { name: "GitHub", Icon: SiGithub, color: "#555555" },
    { name: "Figma", Icon: SiFigma, color: "#f24e1e" },
    { name: "Postman", Icon: SiPostman, color: "#ff6c37" },
    { name: "Stripe", Icon: SiStripe, color: "#635bff" },
    { name: "Razorpay", Icon: SiRazorpay, color: "#0d9fd8" },
    { name: "Cloudinary", Icon: SiCloudinary, color: "#3448c5" },
    { name: "VS Code", Icon: VscVscode, color: "#007acc" },
];

const mid = Math.ceil(ALL_ITEMS.length / 2);
const ROW1 = ALL_ITEMS.slice(0, mid);
const ROW2 = ALL_ITEMS.slice(mid);

const ANIM_CLASSES = ["chip-bounce", "chip-pulse", "chip-wiggle", "chip-scale", "chip-spin-icon"];

function MarqueeRow({ items, reverse = false }: { items: TechItem[]; reverse?: boolean }) {
    const looped = [...items, ...items, ...items];
    return (
        <div className="tech-marquee-wrapper">
            <div
                className={`tech-marquee-track${reverse ? " reverse" : ""}`}
                style={{ animationDuration: `${looped.length * 2.2}s` }}
            >
                {looped.map((item, idx) => {
                    const animClass = ANIM_CLASSES[idx % ANIM_CLASSES.length];
                    return (
                        <div
                            className={`tech-chip ${animClass}`}
                            key={`${item.name}-${idx}`}
                            style={{
                                "--chip-color": item.color,
                                "--chip-color-faded": `${item.color}22`,
                            } as React.CSSProperties}
                        >
                            <span className="tech-chip-icon" style={{ color: item.color }}>
                                <item.Icon size={20} />
                            </span>
                            <span className="tech-chip-name">{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function TechStackSection() {
    return (
        <section className="tech-stack-section">
            <MarqueeRow items={ROW1} reverse={false} />
            <MarqueeRow items={ROW2} reverse={true} />
        </section>
    );
}
