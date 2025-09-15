"use client";

import avatar1 from "../../../public/testimonials/avatar-1.jpg";
import avatar2 from "../../../public/testimonials/avatar-2.jpg";
import avatar3 from "../../../public/testimonials/avatar-3.jpg";
import avatar4 from "../../../public/testimonials/avatar-4.png";
import avatar5 from "../../../public/testimonials/avatar-5.png";
import avatar6 from "../../../public/testimonials/avatar-6.png";
import avatar7 from "../../../public/testimonials/avatar-7.png";
import avatar8 from "../../../public/testimonials/avatar-8.png";
import avatar9 from "../../../public/testimonials/avatar-9.png";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const testimonials = [
  {
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    imageSrc: avatar1,
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  {
    text: "Our team's productivity has skyrocketed since we started using this tool. ",
    imageSrc: avatar2,
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",
    imageSrc: avatar3,
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",
    imageSrc: avatar4,
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",
    imageSrc: avatar5,
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar6,
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",
    imageSrc: avatar7,
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",
    imageSrc: avatar8,
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",
    imageSrc: avatar9,
    name: "Casey Harper",
    username: "@casey09",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialColumn = (props: {
  duration?: number;
  className?: string;
  testimonials: typeof testimonials;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(
            ({ text, imageSrc, name, username }, index) => (
              <div
                key={index}
                className={
                  "p-10 border border-foreground/5 rounded-3xl shadow-[0_7px_14px_#222] max-w-[85vw] w-full"
                }
              >
                <div>{text}</div>
                <div className={"flex items-center gap-2 mt-5"}>
                  <Image
                    src={imageSrc}
                    alt=""
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                  />

                  <div className={"flex flex-col"}>
                    <div className={"font-medium tracking-tight"}>{name}</div>
                    <div className={"leading-5 tracking-tight"}>{username}</div>
                  </div>
                </div>
              </div>
            ),
          )}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className={"section"}>
      <div className={"container"}>
        <div className={"section-head"}>
          <h2 className={"section-subtitle"}>Testimonials</h2>
          <p className={"section-title"}>What Our Customers Are Says</p>
        </div>

        <div
          className={
            "flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden"
          }
        >
          <TestimonialColumn testimonials={firstColumn} duration={15} />
          <TestimonialColumn
            testimonials={secondColumn}
            className={"hidden md:block"}
            duration={19}
          />
          <TestimonialColumn
            testimonials={thirdColumn}
            className={"hidden lg:block"}
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
