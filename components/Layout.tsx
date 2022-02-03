import { FC, ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  UserCircleIcon,
  HomeIcon,
  CalendarIcon,
  MenuIcon,
} from "@heroicons/react/solid";

type Props = {
  children: ReactNode;
};

const MENU = [
  {
    icon: <HomeIcon className="text-black-400 mr-3 h-7 w-7" />,
    title: "Beranda",
    url: "/",
  },
  {
    icon: <UserCircleIcon className="text-black-400 mr-3 h-7 w-7" />,
    title: "Driver Management",
    url: "/driver-management",
  },
  {
    icon: <CalendarIcon className="text-black-400 mr-3 h-7 w-7" />,
    title: "Pickup",
    url: "/pickup",
  },
];

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Shipper</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-screen w-full">
        <div className="flex h-16 w-full justify-between p-4">
          <div className="flex items-center">
            <MenuIcon className="mr-4 h-8 w-8 cursor-pointer text-gray-500 lg:hidden" />
            <img
              src="https://shipper.id/bos//assets/img/auth/login/shipper1@2x.png"
              className="h-auto w-32"
            />
          </div>
          <div className="flex items-center">
            <div className="mr-2 hidden lg:block">
              Hello, <span className="text-red-500">Shipper User</span>
            </div>
            <UserCircleIcon className="h-9 w-9 cursor-pointer text-gray-300" />
          </div>
        </div>
        <div className="flex h-full w-full">
          <div className="hidden h-full w-1/5 pt-7 lg:block">
            <ul className="flex flex-col">
              {MENU.map((item) => (
                <li
                  key={item.url}
                  className={`mb-4 p-3 ${
                    router.pathname === item.url
                      ? "border-l-4 border-red-500 pl-2 text-red-500"
                      : ""
                  }`}
                >
                  <Link href={item.url}>
                    <div className="flex cursor-pointer items-center">
                      {item.icon}
                      <div>{item.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full w-full w-full bg-slate-50 p-7 pb-16 lg:w-4/5">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
