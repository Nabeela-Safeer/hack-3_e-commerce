import React from "react";
import Link from "next/link"

const Footer = () => {
  return (
    <div>
      <div className="mx-auto bg-teal-900">
        {/* top */}

        <div className="flex xl:justify-between xl:flex-row flex-col mt-10 p-12">

          {/* left */}
          <div className="flex flex-col gap-5 w-[292px]">
            <Link
              href={"/"}
              className="flex title-font font-semibold items-center text-gray-900 mb-4 md:mb-0"
            >
              <h1 className="ml-3 text-3xl text-white">
                Home<span className="text-teal-400">Decour</span>
              </h1>
            </Link>
            <p className="text-base font-medium text-white">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>

          {/* right */}
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 mt-10 xl:mt-0">
            {/* first div */}
            <div>
              <Link href={"/about"}><h1 className="text-xl font-bold text-teal-400">About</h1></Link>
              <ul className="flex flex-col gap-5 text-base text-white">
                <li>How it works</li>
                <li>Featured</li>
                <li>Partnership</li>
                <li>Bussiness Relation</li>
              </ul>
            </div>

            {/* second div */}

            <div>
              <h1 className="text-xl font-bold text-teal-400">Community</h1>
              <ul className="flex flex-col gap-5 text-base text-white">
                <li>Events</li>
                <li>Blog</li>
                <li>Podcast</li>
                <li>Invite a friend</li>
              </ul>
            </div>

            {/* third div */}

            <div>
              <h1 className="text-xl font-bold text-teal-400">Social</h1>
              <ul className="flex flex-col gap-5 text-base text-white">
                <li>Discord</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="flex xl:justify-between xl:p-12 p-10 border-t-4 text-xs flex-col-reverse gap-10">
          <div>
            <h1 className="xl:text-2xl font-semibold text-teal-400">
              ©2022 MORENT. All rights reserved
            </h1>
          </div>
          <div className="xl:text-2xl font-semibold flex gap-10 text-white">
            <h1>Privacy & Policy</h1>
            <h1>Terms & Condition</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
