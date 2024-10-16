'use client';
import React, { SyntheticEvent, useRef, useState } from 'react';
import GithubIcon from '../../public/icons/github-icon.svg';
import LinkedinIcon from '../../public/icons/linkedin-icon.svg';
import Link from 'next/link';
import Image from 'next/image';
import { SocialLinks } from '@/lib/data';
import { validateEmail } from '@/lib';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

export const ContactForm = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    subject: '',
    email: '',
    message: '',
  });
  // pending state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/get-submissions?page=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FORM_FLOW_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }

    return;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await fetchSubmissions();

    console.log('Sending request to:', process.env.NEXT_PUBLIC_FORM_FLOW_API_URL);
    console.log('Request body:', JSON.stringify(formData));

    if (!formData.subject || !formData.email || !formData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }
    try {
      setIsSubmitting(true);
      console.log('Sending request to:', process.env.NEXT_PUBLIC_FORM_FLOW_API_URL);
      console.log('Request body:', JSON.stringify(formData));

      const response = await fetch(process.env.NEXT_PUBLIC_FORM_FLOW_API_URL!, {
        method: 'POST',
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FORM_FLOW_API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      toast({
        title: 'Message sent!',
        description: "We'll get back to you soon.",
      });
      setFormData({ subject: '', email: '', message: '' });
    } catch (error) {
      console.error('Fetch error:', error);
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: `Failed to send message: ${error.message}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unknown error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
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
              value={formData.email}
              onChange={(e) => handleInputChange('email', e)}
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
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e)}
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
              value={formData.message}
              onChange={(e) => handleInputChange('message', e)}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-5 rounded-lg w-full"
          >
            Send Message
          </button>
        </form>

        {emailSubmitted ? <p className="text-green-500 text-sm mt-2">Email sent successfully!</p> : null}
      </div>
    </section>
  );
};
