import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { Timeline } from "@/components/ui/timeline";

const Experience = () => {
  const data = [
    {
      title: "2024 - ",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Enjoying life and Work at AITC International.
          </p>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },
    {
      title: "2023-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Left GyanBazzar Online Private Limited (July 2023).
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Joined AITC International as a Frontend Developer (August 2023).
          </p>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },

    {
      title: "2021 - 2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Completed my Bachelor&apos;s in Computer Science and Information
            Technology from Deerwalk Institute of Technology (TU Affiliated).
            (Class of 2022)
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Landed my first full time job at GyanBazzar Online Private Limited
            as a frontend developer (February 2022). Quit Freelancing as I was
            having hard time balancing a full time job and freelancing (need
            personal time as well?).
          </p>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },
    {
      title: "2019 - 2020",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Started Freelancing as a Web Developer and Machine Learning
            Engineer. Not much experience but a lot of learning.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Lockdown. Who doesn&apos;t remember?
          </p>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },
  ];
  return (
    <CommonWrapper>
      <div className="w-full common-layout max-md:pb-20">
        <Timeline data={data} />
      </div>
    </CommonWrapper>
  );
};

export default Experience;
