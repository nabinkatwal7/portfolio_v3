import {Description} from "../data/description.ts";
import {ResumeData, ResumeType} from "../data/resume.ts";

const Resume = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className=" w-full sm:w-[60%]">
                <p className="text-lg font-montserrat text-left"> {Description.description}</p>
            </div>
            <div className=" w-full sm:w-[40%]">
                <p className="text-[#1374d0] font-bold text-left">BRIEF HISTORY IN TIME</p>
                <div className="flex flex-col gap-2 text-left">
                    {ResumeData.map((item: ResumeType) => (
                        <div key={item.id}>
                            <p className="text-sm font-montserrat text-gray-600/50">{item.date}</p>
                            <p className="text-lg font-bold font-montserrat">{item.title}</p>
                            <p className="text-base font-montserrat">{item.company}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resume;
