import CommonWrapper from "@/components/common/animation/CommonWrapper";

const stats = [
  { id: 1, name: "Projects", value: "20+" },
  { id: 2, name: "Hours of code", value: "3,840+" },
  { id: 3, name: "Languages", value: "7" },
];

const Statistics = () => {
  return (
    <CommonWrapper>
      <div className="common-layout">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 ">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Statistics;
