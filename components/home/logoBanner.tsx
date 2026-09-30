import Image from "next/image";

const frames = [
  "/Frame.png",
  "/Frame (1).png",
  "/Frame (2).png",
  "/Frame (3).png",
  "/Frame (4).png",
];

export function LogoBanner() {
  return (
    <section className="w-full bg-[#F5F5F6]">
      <div className="mx-auto flex w-full max-w-8xl flex-wrap items-center justify-evenly gap-x-none gap-y-5 px-6 py-10">
        {frames.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={336}
            height={82}
            className="h-[130px] w-[180px] select-none object-contain opacity-80"
            loading="eager"
          />
        ))}
      </div>
    </section>
  );
}

export default LogoBanner;
