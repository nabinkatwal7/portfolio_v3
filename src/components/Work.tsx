import Skills from "./Skills.tsx";

const Work = () => {
    return (
        <div className="flex flex-col gap-10 px-4 sm:w-[60%] m-auto justify-center pt-4 sm:pt-20" >
            <div className="flex flex-col gap-2 justify-start text-left">
                <Skills />
            </div>
        </div>
    );
};

export default Work;
