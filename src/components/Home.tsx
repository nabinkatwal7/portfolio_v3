import {Description} from "../data/description.ts";
import Resume from "./Resume.tsx";


function Home() {
    return (
        <div className="flex flex-col gap-10 px-4 sm:w-[60%] m-auto justify-center pt-4 sm:pt-20">
            <div className="flex flex-col gap-2 justify-start text-left">
                <p className="text-4xl font-bold font-playfair"> {Description.name} </p>
                <p className="text-3xl font-playfair"> {Description.title} </p>
            </div>
            <Resume/>
        </div>
    );
}

export default Home;
