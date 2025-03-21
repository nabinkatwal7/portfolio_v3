"use client";
import CommonWrapper from "@/components/common/animation/CommonWrapper";
import { FlipWords } from "@/components/ui/flip-words";
import { Player } from "@lottiefiles/react-lottie-player";

function Hero() {
  const words = [
    "Soy Nabin.", // Spanish
    "Je suis Nabin.", // French
    "Ich bin Nabin.", // German
    "我是Nabin", // Chinese (Simplified)
    "ナビンです", // Japanese
    "Я Набин.", // Russian
    "أنا نابين.", // Arabic
    "Eu sou Nabin.", // Portuguese
    "I'm Nabin.", // English
  ];
  return (
    <CommonWrapper>
      <div className="flex flex-col-reverse max-sm:w-full max-w-[1350px] lg:flex-row gap-8 justify-center items-center common-layout">
        <div className="flex flex-col gap-2 items-center w-full justify-center">
          <FlipWords words={words} /> <br />
          <p className="text-center font-body ">
            Web developer by day, data magician by night. I translate complex
            ideas into stunning, user-friendly web applications using next.js,
            react, and tailwind. When not building interfaces, I&apos;m
            exploring the world of go, typescript and rust. Fluent in neovim,
            git, collaborating and version controlling like a pro. Let&apos;s
            code some magic together!
          </p>
        </div>
        <div className="lg:flex justify-center w-full hidden">
          <Player
            autoplay
            loop
            src="/json/hero.json"
            style={{ height: "500px", width: "500px" }}
            className="sm:w-full sm:h-auto md:w-[375px] md:h-[400px]"
          />
        </div>
      </div>
    </CommonWrapper>
  );
}

export default Hero;
