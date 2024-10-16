'use client';
import React, { useState, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectTag } from './ProjectTag';
import { motion, useInView } from 'framer-motion';
import { projectsData } from '@/lib/data';

export const Projects = () => {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-24">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2">My Projects</h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-4 mb-4">
        <ProjectTag onClick={handleTagChange} name="All" isSelected={tag === 'All'} />
        <ProjectTag onClick={handleTagChange} name="Web" isSelected={tag === 'Web'} />
        <ProjectTag onClick={handleTagChange} name="Mobile" isSelected={tag === 'Mobile'} />
      </div>
      <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard {...project} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};
