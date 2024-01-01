import React from 'react';
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="absolute top-0 flex flex-row gap-10 justify-between content-center items-center bg-barca-blue p-4 w-full" >
            <div>
                <p className="text-white text-3xl font-montserrat" >Title</p>
            </div>
            <div className="flex flex-row justify-evenly gap-10" >
                <Link className="text-white text-xl hover:text-barca-gold" href="/">Home</Link>
                <Link className="text-white text-xl hover:text-barca-gold"  href="/">About</Link>
                <Link className="text-white text-xl hover:text-barca-gold"  href="/">Skills</Link>
                <Link className="text-white text-xl hover:text-barca-gold" href="/">Projects</Link>
                <Link className="text-white text-xl hover:text-barca-gold" href="/">Hobbies</Link>
                <Link className="text-white text-xl hover:text-barca-gold" href="/contact">Get in touch</Link>
            </div>
        </div>
    );
};

export default Navbar;
