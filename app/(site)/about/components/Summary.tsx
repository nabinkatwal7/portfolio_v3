import CommonLink from "@/components/common/CommonLink";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { OrbitRingsBackground } from "@/components/common/animation/OrbitRingsBackground";
import { HoverEffect } from "@/components/ui/card-hover-effect";

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
    <div className="relative overflow-hidden">
      <OrbitRingsBackground />
      <CommonWrapper className="common-layout max-w-[1350px] flex flex-col items-center justify-center gap-4">
        <p className="text-label">Experience</p>
        <h2 className="heading-section">
          Professional Summary
        </h2>
        <HoverEffect items={summary} />
        <CommonLink href="/projects" title="View Projects" />
      </CommonWrapper>
    </div>
  );
};

export default Summary;
