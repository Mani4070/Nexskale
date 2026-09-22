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
    { name: "React.js", Icon: SiReact, color: "var(--brand-violet)" },
    { name: "Next.js", Icon: SiNextdotjs, color: "var(--brand-blue)" },
    { name: "Vue.js", Icon: SiVuedotjs, color: "var(--brand-cyan)" },
    { name: "Angular", Icon: SiAngular, color: "var(--brand-violet)" },
    { name: "TypeScript", Icon: SiTypescript, color: "var(--brand-blue)" },
    { name: "JavaScript", Icon: SiJavascript, color: "var(--brand-cyan)" },
    { name: "Tailwind CSS", Icon: SiTailwindcss, color: "var(--brand-violet)" },
    { name: "Material UI", Icon: SiMui, color: "var(--brand-blue)" },
    { name: "Bootstrap", Icon: SiBootstrap, color: "var(--brand-cyan)" },
    { name: "SCSS", Icon: SiSass, color: "var(--brand-violet)" },
    // Backend
    { name: "Node.js", Icon: SiNodedotjs, color: "var(--brand-blue)" },
    { name: "Express.js", Icon: SiExpress, color: "var(--brand-cyan)" },
    { name: "NestJS", Icon: SiNestjs, color: "var(--brand-violet)" },
    { name: "Python", Icon: SiPython, color: "var(--brand-blue)" },
    { name: "FastAPI", Icon: SiFastapi, color: "var(--brand-cyan)" },
    { name: "REST APIs", Icon: TbApi, color: "var(--brand-violet)" },
    { name: "JWT", Icon: SiJsonwebtokens, color: "var(--brand-blue)" },
    { name: "Webhooks", Icon: TbWebhook, color: "var(--brand-cyan)" },
    // Database
    { name: "PostgreSQL", Icon: SiPostgresql, color: "var(--brand-violet)" },
    { name: "MongoDB", Icon: SiMongodb, color: "var(--brand-blue)" },
    { name: "MySQL", Icon: SiMysql, color: "var(--brand-cyan)" },
    { name: "Redis", Icon: SiRedis, color: "var(--brand-violet)" },
    { name: "Mongoose", Icon: SiMongoose, color: "var(--brand-blue)" },
    // Cloud & DevOps
    { name: "AWS", Icon: FaAws, color: "var(--brand-cyan)" },
    { name: "Google Cloud", Icon: SiGooglecloud, color: "var(--brand-violet)" },
    { name: "Vercel", Icon: SiVercel, color: "var(--brand-blue)" },
    { name: "Docker", Icon: SiDocker, color: "var(--brand-cyan)" },
    { name: "Kubernetes", Icon: SiKubernetes, color: "var(--brand-violet)" },
    { name: "Supabase", Icon: SiSupabase, color: "var(--brand-blue)" },
    { name: "Firebase", Icon: SiFirebase, color: "var(--brand-cyan)" },
    { name: "GitHub Actions", Icon: SiGithubactions, color: "var(--brand-violet)" },
    // AI & Automation
    { name: "OpenAI", Icon: TbBrandOpenai, color: "var(--brand-blue)" },
    { name: "Generative AI", Icon: MdAutoAwesome, color: "var(--brand-cyan)" },
    { name: "RAG", Icon: TbBrain, color: "var(--brand-violet)" },
    { name: "AI Agents", Icon: MdSmartToy, color: "var(--brand-blue)" },
    { name: "LangChain", Icon: SiLangchain, color: "var(--brand-cyan)" },
    { name: "LLM APIs", Icon: TbMessageChatbot, color: "var(--brand-violet)" },
    { name: "Workflow Automation", Icon: MdAutoMode, color: "var(--brand-blue)" },
    // Tools
    { name: "Git", Icon: SiGit, color: "var(--brand-cyan)" },
    { name: "GitHub", Icon: SiGithub, color: "var(--brand-violet)" },
    { name: "Figma", Icon: SiFigma, color: "var(--brand-blue)" },
    { name: "Postman", Icon: SiPostman, color: "var(--brand-cyan)" },
    { name: "Stripe", Icon: SiStripe, color: "var(--brand-violet)" },
    { name: "Razorpay", Icon: SiRazorpay, color: "var(--brand-blue)" },
    { name: "Cloudinary", Icon: SiCloudinary, color: "var(--brand-cyan)" },
    { name: "VS Code", Icon: VscVscode, color: "var(--brand-violet)" },
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
                                "--chip-color-faded": `color-mix(in srgb, ${item.color} 13%, transparent)`,
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
        <section className="tech-stack-section" aria-label="Technologies and frameworks we use">
            <MarqueeRow items={ROW1} reverse={false} />
            <MarqueeRow items={ROW2} reverse={true} />
        </section>
    );
}
