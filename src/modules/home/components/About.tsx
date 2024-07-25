import Image from 'next/image';

export const About = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Image
          width="550"
          height="310"
          alt="Invertebrates"
          src="/placeholder.svg"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            About Entomon Institute of <br /> Invertebrates Zoology
          </h2>
          <p className="text-muted-foreground">
            The Entomon Institute of Invertebrates Zoology is a leading research and educational institution dedicated
            to the study of invertebrate organisms. Established in 1985, the institute has been at the forefront of
            invertebrate research, offering cutting-edge programs and fostering a deep appreciation for the diverse and
            fascinating world of invertebrates.
          </p>
          <p className="text-muted-foreground">
            Our mission is to advance the understanding of invertebrate biology, ecology, and evolution through rigorous
            research, innovative educational programs, and collaborative partnerships with industry and academic
            institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};
