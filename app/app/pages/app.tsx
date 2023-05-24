const home = () => {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>

              <Image src={logoWithText} alt="logoWithText" height={30} />
            </a>
          </div>
          <div className=" lg:flex lg:flex-1 lg:justify-end">
            <Link href="/home">
              <div className="text-sm font-semibold leading-6 text-gray-900">
                Log in
                <span aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default home;
