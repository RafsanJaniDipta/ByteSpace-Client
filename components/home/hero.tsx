import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Hero() {
  return (
    <div className="  relative flex min-h-svh overflow-hidden bg-brand h-[924px]">
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* 3D ornament — full-width band at the bottom, like the design frame */}
      <Image
        src="/3d ornament.png"
        alt=""
        aria-hidden
        priority
        width={5760}
        height={3500}
        sizes="100vw"
        className=" pointer-events-none absolute inset-x-0 inset-y-5 bottom-0 h-10/12 w-full mt-20 z-10 object-bottom select-none"
      />

      {/* Half-donut arch */}
      <Image
        src="/donut.svg"
        alt=""
        aria-hidden
        priority
        width={5}
        height={3}
        sizes="50vw"
        className=" pointer-events-none absolute inset-x-40 inset-y-40 bottom-0 h-full w-10/12 mt-40 items-center justify-baseline object-bottom select-none "
      />

      {/* Laptop image */}
      <Image
        src="/hero-laptop.png"
        alt=""
        aria-hidden
        priority
        width={5}
        height={3}
        sizes="50vw"
        className=" pointer-events-none absolute inset-x-90 inset-y-85 bottom-0 h-6/10 w-8/12 mt-40 items-center justify-baseline object-bottom select-none"
      />

      {/* Copy */}
      <div className="  relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-6 px-6 pb-2 pt-20 text-center sm:gap-8">
        <h1 className="max-w-4xl text-center font-poppins text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-white">
          Get Access to Hundreds <br /> Courses Available
        </h1>
        <p className="max-w-8xl text-center font-satoshi text-[18px] font-normal tracking-normal text-white/75">
          Unlock your creativity, gain valuable knowledge, and grow your
          business with our wide range of courses.
        </p>
        <div className=" flex w-full max-w-xl mt-20 flex-wrap items-center justify-center gap-3 ">
          <Field orientation="horizontal" className="w-full">
            <Input
              className="w-[500px] h-16 rounded-full border-transparent bg-white px-5 py-5 text-[16px] text-left text-black placeholder:text-[16px] placeholder:text-slate-400"
              type="search"
              placeholder="Course, Topic, Creator"
            />
            <Button className="shrink-0 bg-[#D4FB20] px-8 py-8 rounded-full text-[16px] font-medium text-black hover:bg-[#D4FB20]/90">
              Search
            </Button>
          </Field>
        </div>
      </div>
    </div>
  );
}
