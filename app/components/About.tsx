'use client';
import React, { useTransition, useState } from 'react';
import Image from 'next/image';
import { TabButton } from './TabButton';

const Tabs = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className="list-disc pl-2">
        <li>
          <span className="font-semibold">Programming Languages:</span> JavaScript, TypeScript, C#, Java, Swift
        </li>
        <li>
          <span className="font-semibold">Frameworks:</span> React, React Native, Next.js, Node.js, Nest.js, Tailwind
        </li>
        <li>
          <span className="font-semibold">Tools:</span> Git, Redux, Firebase, WebSockets, CICD
        </li>
        <li>
          <span className="font-semibold">Testing:</span> Jest, E2E testing, Detox, Cypress
        </li>
        <li>
          <span className="font-semibold">Mobile Development:</span> Android, iOS
        </li>
        <li>
          <span className="font-semibold">Others:</span> Design Patterns, Scrum, SDLC, OOP, Web3
        </li>
      </ul>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className="list-disc pl-2">
        <li>
          <span className="block font-semibold">
            Saint Petersburg State Electrotechnical University &quot;LETI&quot;
          </span>
          <span>Master&apos;s degree, software development technologies</span>
        </li>
        <li>
          <span className="block font-semibold">
            Saint Petersburg State Electrotechnical University &quot;LETI&quot;
          </span>
          <span>Bachelor&apos;s degree, Computer Science</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <ul className="list-disc pl-2">
        <li>
          <span className="uppercase font-semibold">intuit </span>
          <span>Java Programming</span>
        </li>
        <li>
          <span className="uppercase font-semibold">intuit </span>
          <span>JavaScript Programming</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Languages',
    id: 'Languages',
    content: (
      <ul className="list-disc pl-2">
        <li>
          <span className="font-semibold">Arabic — </span>
          <span>Native</span>
        </li>
        <li>
          <span className="font-semibold">English — </span>
          <span>Upper Intermediate</span>
        </li>
        <li>
          <span className="font-semibold">Russian — </span>
          <span>Proficiency</span>
        </li>
      </ul>
    ),
  },
];

export const About = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8  py-8 xl:gap-16 sm:py-16">
        <Image alt="about me" src="/images/about-image.jpeg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <ul className="text-base lg:text-lg list-disc pl-2">
            <li>
              Experienced and self-motivated software Engineer with a strong track record in software development.
            </li>
            <li>Skilled in developing cutting-edge web and mobile applications.</li>
            <li>Proven ability to lead teams and deliver high-quality results.</li>
            <li>Passionate about creating sleek and functional user interfaces.</li>
            <li>Eager to contribute to projects that make a positive impact.</li>
            <li>
              Adept at leveraging extensive experience to excel in a collaborative and innovative work environment.
            </li>
          </ul>
          <div className="flex sm:flex-row justify-start mt-8 flex-col gap-2">
            {Tabs.map((item) => (
              <TabButton key={item.id} selectTab={() => handleTabChange(item.id)} active={tab === item.id}>
                {item.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-2">{Tabs.find((t) => t.id === tab)?.content}</div>
        </div>
      </div>
    </section>
  );
};
