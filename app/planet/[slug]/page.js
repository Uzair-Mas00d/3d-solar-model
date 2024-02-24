"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Planet({ params }) {
  const { slug } = params;
  const [planets, setPlanets] = useState([
    {
      name: "sun",
      title: "Star",
      rotation: "Rotation period is about 24 to 25 days",
      orbitalPeriod: "No Orbital period",
      mass: " 1.989x10^30 kg",
      fact: "Sun is about 99.86% of the total mass of our solar system",
    },
    {
      name: "mercury",
      title: "Planet",
      rotation: "Rotation period is about 58.65 days",
      orbitalPeriod: "Orbital period is about 88 days",
      mass: "0.330x10^24 kg",
      fact: "Mercury has extreme temperature variations",
    },
    {
      name: "venus",
      title: "Planet",
      rotation: "Rotation period is about 243 days",
      orbitalPeriod: "Orbital period is about 255 days",
      mass: "4.87x10^24 kg",
      fact: "Venus has a thick atmosphere primarily composed of carbon dioxide",
    },
    {
      name: "earth",
      title: "Planet",
      rotation: "Rotation period is about 24 hours",
      orbitalPeriod: "Orbital period is about 365 days",
      mass: " 5.97x10^24 kg",
      fact: "Earth is the only known celestial body to support life",
    },
    {
      name: "mars",
      title: "Planet",
      rotation: "Rotation period is about 24.6 hours",
      orbitalPeriod: "Orbital period is about 687 days",
      mass: "0.642x10^24 kg",
      fact: "Mars is often called the 'Red Planet' due to the iron oxide ",
    },
    {
      name: "jupiter",
      title: "Planet",
      rotation: "Rotation period is about 9.9 hours",
      orbitalPeriod: "Orbital period is about 11.8 days",
      mass: " 1.898x10^27 kg",
      fact: "Jupiter is the largest planet in our solar system",
    },
    {
      name: "saturn",
      title: "Planet",
      rotation: "rotation period is about 10.7 hours",
      orbitalPeriod: "Orbital period is about 29.4 days",
      mass: "5.68x10^26 kg",
      fact: "Saturn is known for its stunning ring system",
    },
    {
      name: "uranus",
      title: "Planet",
      rotation: "rotation period is about 17.2 hours",
      orbitalPeriod: "Orbital period is about 84 days",
      mass: "8.68x10^25 kg",
      fact: "Uranus is unique among the planets in our solar system because of its extreme tilt",
    },
    {
      name: "neptune",
      title: "Planet",
      rotation: "rotation period is about 16.1 hours",
      orbitalPeriod: "Orbital period is about 164.7 days",
      mass: "1.02 x 10^26 kg",
      fact: "Neptune has strong winds and is known for its dark storm systems",
    },
  ]);
  const planet = planets.filter((planet) => planet.name === slug);

  return (
    <>
      <Link href={"/"} className="absolute top-2 left-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 fill-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
          />
        </svg>
      </Link>
      <div className="mt-8 grid max-lg:gap-2 sm:grid-cols-2">
        <div className="mb-8 lg:w-[36rem] flex justify-center">
          <Image
            src={`/Texture/planetsImages/${slug}.png`}
            priority={true}
            alt={planet?.[0].name}
            width={500}
            height={500}
          />
        </div>

        <div className="p-4 shadow-lg">
          <h1 className="text-2xl font-semibold text-center pb-2">
            {planet?.[0].name.toLocaleUpperCase()}{" "}
            <span className="text-lg text-gray-400">{planet?.[0].title}</span>
          </h1>
          <p className="text-lg font-medium pb-2 ">
            Rotation:{" "}
            <span className="text-base text-gray-700">
              {planet?.[0].rotation}
            </span>
          </p>
          <p className="text-lg font-medium pb-2 ">
            Orbital Period:{" "}
            <span className="text-base text-gray-700">
              {planet?.[0].orbitalPeriod}
            </span>
          </p>
          <p className="text-lg font-medium pb-2 ">
            Mass:{" "}
            <span className="text-base text-gray-700">{planet?.[0].mass}</span>
          </p>
          <p className="text-lg font-medium pb-2 ">
            Fact:{" "}
            <span className="text-base text-gray-700">{planet?.[0].fact}</span>
          </p>
        </div>
      </div>
    </>
  );
}
