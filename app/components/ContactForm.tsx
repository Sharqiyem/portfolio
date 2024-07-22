'use client';
import React, { SyntheticEvent, useRef, useState } from 'react';
import GithubIcon from '../../public/icons/github-icon.svg';
import LinkedinIcon from '../../public/icons/linkedin-icon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { SocialLinks } from '@/lib/data';

export const ContactForm = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/send';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    // const resData = await response.json();

    if (response.status === 200) {
      console.log('Message sent.');
      setEmailSubmitted(true);
      formRef?.current?.reset();
    }
  };

  return (
    <section id="contact" className="grid md:grid-cols-2   py-24 gap-4 relative">
      <div className="z-10">
        <h5 className="text-4xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          I am currently seeking new opportunities and welcome inquiries. Whether you have a question or simply wish to
          say hello, I will make every effort to respond promptly.
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href={SocialLinks.github} target="_blank">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href={SocialLinks.linkedin} target="_blank">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div>
        <form ref={formRef} className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="email@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="subject" className="text-white block text-sm mb-2 font-medium">
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Just saying hello"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Let's talk about..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
          >
            Send Message
          </button>
        </form>

        {emailSubmitted ? <p className="text-green-500 text-sm mt-2">Email sent successfully!</p> : null}
      </div>
    </section>
  );
};
