import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({
  name,
  image,
  description,
  href,
  tags,
}: {
  name: string;
  image: string;
  description: string;
  href: string;
  tags: string[];
}) => {
  return (
    <Link
      target="_blank"
      href={href}
      className="group w-full h-full p-6 rounded-lg bg-gray-800 text-white shadow-lg hover:shadow-2xl  duration-300 ease-in-out transition-all  hover:bg-indigo-300 hover:text-black"
    >
      {/* Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image
          alt={name}
          src={image}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="mt-4 text-2xl font-semibold ">{name}</h3>
      <p className="mt-2 text-sm ">{description}</p>
      <div className="mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-700 text-sm group-hover:bg-gray-600 group-hover:text-white rounded-full px-3 py-1 mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default ProjectCard;
