/* eslint-disable react/display-name */
import React, { LegacyRef } from 'react';
import Link from 'next/link';

const MyButton = React.forwardRef(
  ({ onClick, href, title }: NavLinkProps, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={ref}
        className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0  hover:text-primary-500"
      >
        {title}
      </a>
    );
  },
);

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
}

export const NavLink = ({ href, title, onClick }: NavLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <MyButton href={href} title={title} onClick={onClick} />
    </Link>
  );
};
