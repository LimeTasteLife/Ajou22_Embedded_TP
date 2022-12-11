<div className="min-h-screen flex flex-col">
  <div className="bg-purple-400 sticky top-0 h-14 flex justify-between items-center font-semibold uppercase">
    {' '}
    <p></p>
    <header className=" ">E-sports dApp Platform</header>
    <div>
      <button classNameName="flex justify-end bg-purple-500">
        <div>
          <Link href="/sign-login">
            <a>login</a>
          </Link>
        </div>
      </button>
      <button classNameName="flex justify-end bg-purple-500">
        <div>
          <Link href="/sign-registration">
            <a>registration</a>
          </Link>
        </div>
      </button>
    </div>
  </div>
  <div classNameName="flex flex-col md:flex-row flex-1">
    <aside classNameName="bg-purple-200 w-full md:w-60">
      <nav>
        <ul>
          {menuItems.map(({ href, title }) => (
            <li classNameName="m-2" key={title}>
              <Link href={href}>
                <a
                  classNameName={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer ${
                    router.asPath === href && 'bg-fuchsia-600 text-red'
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
  </div>
</div>;
