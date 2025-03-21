import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const summary = [
  {
    title: "AITC International (2023 - Present)",
    description:
      "AITC International is a top IT company in Nepal, offering innovative software development, mobile app development, and digital solutions.",
    link: "https://aitc.ai/",
  },
  {
    title: "GyanBazzar Online Private Limited (2022 - 2023)",
    description: "Knowledge accessible at your fingertips.",
    link: "https://gyanbazzar.com/",
  },
  {
    title: "Freelancer (2019 - 2022)",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "#",
  },
];

const Summary = () => {
  return (
    <CommonWrapper className="common-layout max-w-[1350px] flex flex-col items-center justify-center gap-8">
      <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Professional Summary
      </h2>
      <HoverEffect items={summary} />
      <Link
        href="/projects"
        className="text-base font-semibold bg-primary px-3.5 py-2.5 rounded-md shadow-sm hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex flex-row gap-2 items-center"
      >
        <p>View Projects</p>
        <FaArrowRight />
      </Link>
    </CommonWrapper>
  );
};

export default Summary;
