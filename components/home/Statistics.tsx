const stats = [
  { id: 1, name: "Projects", value: "20+" },
  { id: 2, name: "Hours of code", value: "3,840+" },
  { id: 3, name: "Languages", value: "7" },
];

const Statistics = () => {
  return (
    <section className="section-padding">
      <div className="container-max common-layout grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((stat) => (
          <div key={stat.id}>
            <div className="text-2xl md:text-3xl font-normal text-[var(--color-text-main)] mb-2">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{stat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
