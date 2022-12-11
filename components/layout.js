import Link from "next/link";
import { useRouter } from "next/router";
import SidebarStyle from "../styles/sidebar.module.css";
import { useEffect } from "react";
import Head from "next/head";

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      href: "/",
      title: "홈",
    },
    {
      href: "/make-game",
      title: "게임 제작",
    },
    {
      href: "/manage-game",
      title: "게임 관리",
    },
    {
      href: "/participating-now",
      title: "참가중인 게임",
    },
  ];

  return (
    <div>
      <div className="h-28">
        {/* // Navbar start {`${Buttonstyle.btnred} ${"w-1/3"}`}*/}
        <nav
          id="navbar"
          className="fixed top-0 z-40 flex w-full flex-row justify-end bg-gray-700 px-4 sm:justify-between"
        >
          {/* {`${Buttonstyle.btnred} ${"w-1/3"}`} */}
          <ul
            className={`${
              SidebarStyle.breadcrumb
            } ${"breadcrumb hidden flex-row items-center py-4 text-lg text-white sm:flex"}`}
          >
            <li className="inline">
              <a href="./">Main</a>
            </li>
            <li className="opacity-60 inline">
              <span>E-sports DApp Platform</span>
            </li>
          </ul>
          <button
            className={`${
              SidebarStyle.breadcrumb
            } ${"breadcrumb hidden flex-row items-center py-4 text-lg text-white sm:flex float-right"}`}
          >
            <span>
              <Link href="/sign-registration">
                <a>Registration</a>
              </Link>
            </span>
          </button>
          {/* <button
            id="btnSidebarToggler"
            type="button"
            className="py-4 text-2xl text-white hover:text-gray-200"
          >
            <svg
              id="navClosed"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              id="navOpen"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="hidden h-8 w-8"
            >
              <path
                strokeLinecap="round"
                
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button> */}
        </nav>

        {/* // Navbar end // Sidebar start */}
        <div id="containerSidebar" className="z-40 w-3/4">
          <div className="navbar-menu z-40">
            <nav
              // id="sidebar"
              className={`${
                SidebarStyle.sidebar
              } ${"fixed left-0 bottom-0 flex w-3/4 h-full -translate-x-full flex-col overflow-y-auto bg-gray-700 pt-40 pb-8 sm:max-w-xs lg:w-80"}`}
            >
              {/* <!-- one category / navigation group --> */}
              <div className="px-4 pb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                  Main
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  <li>
                    <a
                      className="active flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="./"
                    >
                      <span className="select-none">HomePage</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="./make-game"
                    >
                      <span className="select-none">Make-Game</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- navigation group end--> */}
              {/* 
            <!-- example copies start --> */}
              <div className="px-4 pb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                  Legal
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="./manage-game"
                    >
                      <span className="select-none">Manage-Game</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="./participating-now"
                    >
                      <span className="select-none">Participating-Now</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="#imprint"
                    >
                      <span className="select-none">Certificate</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="px-4 pb-6">
                <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
                  Others
                </h3>
                <ul className="mb-8 text-sm font-medium">
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="#ex1"
                    >
                      <span className="select-none">...</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
                      href="#ex2"
                    >
                      <span className="select-none">...</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* <!-- example copies end --> */}
            </nav>
          </div>
          <div className="mx-auto lg:ml-80"></div>
        </div>
        {/* Sidebar end */}
      </div>

      <main className="flex-1">{children}</main>
      {/* // ↑추가한 부분
      <div className="min-h-screen flex flex-col">
        {/* <div className="bg-purple-400 sticky top-0 h-14 flex justify-between items-center font-semibold uppercase"> */}
      {/* <p></p>
        <header className=" ">E-sports dApp Platform</header>
        <div> */}
      {/*
          <button classNameName="flex justify-end bg-purple-500">
            <div>
              <Link href="/sign-login">
                <a>login</a>
              </Link>
            </div>
          </button>*/}
      {/* <button classNameName="flex justify-end bg-purple-500">
            <div>
              <Link href="/sign-registration">
                <a>registration</a>
              </Link>
            </div>
          </button>
        </div> */}
      {/* </div> */}
      {/* <div classNameName="flex flex-col md:flex-row flex-1">
          <aside classNameName="bg-purple-200 w-full md:w-60">
            <nav>
              <ul>
                {menuItems.map(({ href, title }) => (
                  <li classNameName="m-2" key={title}>
                    <Link href={href}>
                      <a
                        classNameName={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer ${
                          router.asPath === href && "bg-fuchsia-600 text-red"
                        }`}
                      >
                        {title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main classNameName="flex-1">{children}</main>
        </div> */}
      {/* </div> */}
    </div>
  );
}
