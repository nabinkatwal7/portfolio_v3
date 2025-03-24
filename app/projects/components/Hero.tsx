import CommonWrapper from "@/components/common/animation/CommonWrapper";

const Hero = () => {
  return (
    <CommonWrapper>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-24 md:py-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1569396116180-210c182bedb8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="text-center relative common-layout flex flex-col max-w-[1350px]  gap-8 items-center justify-center">
          <h1 className="text-5xl font-semibold tracking-tight text-pretty sm:text-7xl ">
            Crafted with{" "}
            <span className="text-transparent bg-clip-text px-1 bg-[linear-gradient(90deg,#ff6b6b,#f7b42c,#48c78e,#4daaf5,#a076f9,#f471b5)]">
              Code
            </span>
            , Built to Last
          </h1>
          <p className="text-sm/7 tracking-tight text-pretty text-white/70">
            Every project tells a story—of precision, performance, and a touch
            of ingenuity. From intuitive interfaces to scalable backends, I
            build with purpose, ensuring seamless experiences and lasting
            impact. Quality isn’t just a goal; it’s the standard.
          </p>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Hero;
