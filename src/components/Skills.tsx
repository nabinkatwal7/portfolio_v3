import {SkillsData, VersionControlData} from "../data/skills.ts";

const Skills = () => {
    return (
        <div className="flex flex-col gap-10">
            <p className="text-4xl font-bold font-playfair">My Tech Stack</p>
            <p className="text-2xl font-bold font-playfair">Web Technologies</p>
            <div className="flex flex-wrap group gap-10 lg:gap-28 lg:items-center justify-center">
                {SkillsData.map((item) => (
                    <div className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
                         key={item.id}>
                        <img src={item.image} alt={item.name} className="w-[70px] h-[70px] object-contain"/>
                        <span
                            className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{item.name}</span>
                    </div>
                ))}
            </div>
            <p className="text-2xl font-bold font-playfair">Version Control</p>
            <div className="group flex flex-wrap gap-10 lg:gap-28 lg:items-center justify-center">
                {VersionControlData.map((item) => (
                    <div className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
                         key={item.id}>
                        <img src={item.image} alt={item.name} className="w-[70px] h-[70px] object-contain"/>
                        <span
                            className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
