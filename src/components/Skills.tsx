import { ProjectData } from "../data/project.ts";
import { DataAnalysisData, ProgrammingData, SkillsData, VersionControlData } from "../data/skills.ts";

const Skills = () => {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-4xl font-bold font-playfair">My Tech Stack</p>
      <p className="text-2xl font-bold font-playfair">Web Technologies</p>
      <div className="flex flex-wrap group gap-10 lg:items-center justify-center">
        {SkillsData.map((item) => (
          <div
            className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[60px] h-[60px] object-contain"
            />
            <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold font-playfair">Version Control</p>
      <div className="group flex flex-wrap gap-10 lg:items-center justify-center">
        {VersionControlData.map((item) => (
          <div
            className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[60px] h-[60px] object-contain"
            />
            <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold font-playfair">Data Analysis</p>
      <div className="group flex flex-wrap gap-10 lg:items-center justify-center">
        {DataAnalysisData.map((item) => (
          <div
            className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[60px] h-[60px] object-contain"
            />
            <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold font-playfair">Programming</p>
      <div className="group flex flex-wrap gap-10 lg:items-center justify-center">
        {ProgrammingData.map((item) => (
          <div
            className="flex flex-row gap-10 items-center transition-all hover:scale-110 hover:-rotate-2"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[60px] h-[60px] object-contain"
            />
            <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-2xl font-bold font-playfair">Work</p>
      <div className="group flex flex-wrap gap-10 lg:items-center justify-start">
        {ProjectData.map((item) => (
          <div
            className="flex flex-col lg:w-[45%] gap-4 justify-center transition-all hover:scale-110 hover:-rotate-2"
            key={item.id}
          >
            <p className="text-2xl font-bold font-playfair" >{item.title}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
