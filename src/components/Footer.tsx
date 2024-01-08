import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className="flex flex-col gap-10 px-4 sm:w-[60%] m-auto justify-center pt-4 sm:pt-20">
      <p className="text-4xl font-bold font-playfair">
        Oh. In my spare time I read books, play games, watch sports and work on
        side projects.
      </p>
      <div className="flex flex-row gap-4">
        <a
          className="text-2xl"
          target="_blank"
          href="https://github.com/nabinkatwal7"
        >
          <FaGithub />
        </a>
        <a
          className="text-2xl"
          target="_blank"
          href="https://facebook.com/profile.php?id=1000093649403272"
        >
          <FaFacebook />
        </a>
        <a
          className="text-2xl"
          target="_blank"
          href="https://instagram.com/nabinkatwal7"
        >
          <FaInstagram />
        </a>
        <a
          className="text-2xl"
          target="_blank"
          href="https://twitter.com/badcodelearner"
        >
          <FaXTwitter />
        </a>
        <a
          className="text-base"
          target="_blank"
          href="mailto:mediocampistaa@gmail.com"
        >
          or email me
        </a>
      </div>
    </div>
  );
};

export default Footer;
