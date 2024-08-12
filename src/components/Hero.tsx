import Image from "next/image";
import { Button } from "~/components/ui/button";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

import heroOne from "../../public/hero1.webp";

export default function Hero() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-12">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
        >
          <div className="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-background/50 to-background blur-3xl" />
          <div className="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl" />
        </div>

        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <Image
                src={heroOne}
                alt="Scrabble Hero Image"
                placeholder="blur"
                className="rounded-xl"
              />

              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Scrabble
                </h1>
              </div>
              {/* End Title */}

              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Play the classic word game Scrabble online with friends and
                  family. Challenge your <span className="m-1">🧠</span> and
                  improve your vocabulary.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-3">
                <SignInButton>
                  <Button size={"lg"}>Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button size={"lg"} variant={"outline"}>
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
