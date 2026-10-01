import Image from "next/image";

interface ExploreCategory {
  label: string;
  image: string;
  href: string;
}

const categories: ExploreCategory[] = [
  { label: "Design", image: "/explore-1.png", href: "/courses" },
  { label: "Development", image: "/explore-2.png", href: "/courses" },
  { label: "IT & Software", image: "/explore-3.png", href: "/courses" },
  { label: "Business", image: "/explore-4.png", href: "/courses" },
  { label: "Marketing", image: "/explore-5.png", href: "/courses" },
  { label: "Photography", image: "/explore-6.png", href: "/courses" },
];

export function Explore() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-6xl text-center sm:mb-14">
          <h2 className="font-poppins text-3xl font-semibold leading-tight tracking-[-0.01em] text-gray-900 sm:text-4xl">
            Explore Diverse Learning Paths at Bytespace.
          </h2>
          <p className="font-satoshi mt-5 text-base font-normal text-gray-500 sm:text-[18px]">
            At Bytespace, we believe in empowering individuals through
            knowledge. Our diverse range of courses spans various fields,
            ensuring there&rsquo;s something for everyone. Unleash your
            potential and explore our carefully curated categories.
          </p>
        </div>

        {/* Category Badges */}
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 sm:justify-center sm:gap-8 sm:overflow-visible">
          {categories.map((category) => (
            <li
              key={category.label}
              className="shrink-0 snap-start border border-gray-300 px-7 py-6 mx-5 rounded-2xl transition-transform duration-200 hover:scale-105 sm:shrink-auto sm:snap-none">
              <a
                href={category.href}
                className="group flex w-28 flex-col items-center gap-4 text-center sm:w-32">
                <Image
                  src={category.image}
                  alt={category.label}
                  width={120}
                  height={120}
                  className="h-24 w-24 rounded-full border border-gray-200 transition-transform duration-200 ease-out group-hover:scale-105 sm:h-30 sm:w-30"
                />
                <span className="font-satoshi text-sm font-medium text-gray-900 transition-colors duration-200 group-hover:text-black">
                  {category.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
