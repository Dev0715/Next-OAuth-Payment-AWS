export const Hero = () => (
  <div
    className="relative pt-16 pb-32 flex content-center items-center justify-center"
    style={{
      minHeight: "75vh"
    }}
  >
    <div
      className="absolute top-0 w-full h-full bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://bandzoogle.com/files/5203/bzblog-16-website-templates-for-musicians-and-bands-main.jpg')"
      }}
    >
      <span
        id="blackOverlay"
        className="w-full h-full absolute opacity-75 bg-black"
      ></span>
    </div>
    <div className="container relative mx-auto">
      <div className="items-center flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
          <h1 className="text-white font-semibold text-5xl leading-snug">
            Unlock Your Creative Potential With Us!
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Transform your concepts into reality with premium digital assets and
            expert services
          </p>
        </div>
      </div>
    </div>
    <div
      className="top-auto -bottom-px left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
      style={{ height: "70px" }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className="text-gray-300 fill-current"
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
  </div>
);
