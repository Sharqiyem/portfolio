'use client';
import { achievementsList } from '@/lib/data';
import { Achievement } from '@/lib/types';
import React from 'react';

import dynamic from 'next/dynamic';
const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false,
});

export const Achievements = () => {
  return (
    <div className="xl:gap-16 mb-20">
      <div className="border-[#33353F] border rounded-md py-4 grid grid-cols-2 md:grid-cols-4 gap-2 ">
        {achievementsList.map((achievement: Achievement, index: number) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center mx-4 my-4">
              <h2 className="text-white text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-white text-4xl font-bold"
                  transitions={(index) => ({
                    type: 'spring',
                    duration: index + 0.3,
                    massa: 1,
                  })}
                />
                {achievement.postfix}
              </h2>
              <p className="text-[#ADB7BE] text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
