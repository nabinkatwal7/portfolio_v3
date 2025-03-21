import CommonWrapper from "@/components/common/animation/CommonWrapper";
import Link from "next/link";

const features = [
  {
    name: "Deerwalk Institute of Technology",
    description:
      "Bachelors in Science, Computer Science and Information Technology. (2018-2022)",
    href: "https://deerwalk.edu.np/DWIT/",
  },
  {
    name: "Sainik Awasiya Mahavidyalaya. Bhaktapur, Nepal",
    description: "Higher Secondary School. (2016-2018)",
    href: "https://bsamv.edu.np/",
  },
  {
    name: "Peace Zone RHSS, Sunsari, Nepal",
    description: "Secondary School.",
    href: "https://www.facebook.com/peacezoneschool/",
  },
];

const Education = () => {
  return (
    <CommonWrapper className="common-layout max-w-[1350px]">
      <div className="mx-auto  px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty  sm:text-5xl lg:text-balance">
            Educational Summary
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-white">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      target="_blank"
                      href={feature.href}
                      className="text-sm/6 font-semibold text-indigo-400"
                    >
                      Visit <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Education;
