import Image from "next/image";

const stats = [
  { value: "12k", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16+", label: "Creators" },
];

const benefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export function Professional() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      {/* Soft lime wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(212,251,32,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[480px] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(212,251,32,0.16),transparent_70%)]"
      />

      <div className="mx-auto flex max-w-[1020px] flex-col sm:px-6 sm:gap-10 lg:px-8 ">
        {/* Row 1 — text left, image right */}
        <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-5">
          <div className="max-w-xl">
            <h2 className="font-poppins text-3xl font-semibold leading-tight tracking-[-0.01em] text-gray-900 sm:text-4xl">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="font-satoshi mt-5 text-base font-normal text-gray-500 sm:text-[18px]">
              Explore our curated selection of courses tailored to enhance your
              capabilities and accelerate your career journey. Whether you are
              looking to sharpen specific skills, gain industry expertise, or
              embark on a new career path entirely, we have the resources you
              need.
            </p>

            <dl className="mt-5 grid max-w-lg grid-cols-3 gap-6 text-blue-600">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="font-poppins block text-3xl font-semibold text-gray-900 sm:text-4xl">
                      {stat.value}
                    </span>
                    <span className="font-satoshi mt-1 block text-sm text-gray-500">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-5/5  pt-5">
            <Image
              src="/professional-right.png"
              alt="A Bytespace creator teaching an online course"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className=""
            />
          </div>
        </div>

        {/* Row 2 — image left, text right */}
        <div className="grid items-center gap-5 lg:grid-cols-2 justify-end lg:gap-10">
          <div className="relative aspect-4/5  ">
            <Image
              src="/professional-left.png"
              alt="A Bytespace professional working on course material"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="   "
            />
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <h2 className="font-poppins text-3xl font-semibold leading-tight tracking-[-0.01em] text-gray-900 sm:text-4xl">
              Create &amp; Manage Courses Easily.
            </h2>
            <p className="font-satoshi mt-2 text-base font-normal text-gray-500 sm:text-[18px]">
              ByteSpace supports individuals or entities in the creation,
              publication, and administration of educational courses.
            </p>

            <ul className="mt-5 flex flex-col gap-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#002fff]">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-3.5 text-white"
                      strokeWidth={3.5}
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  <span className="font-satoshi text-base font-medium text-gray-900 sm:text-[17px]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
