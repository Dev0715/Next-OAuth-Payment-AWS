const AdminPanel = () => {
  return (
    <div>
      <a href="/" className="logo-box">
        <div className="logo-light">
          <img
            src="assets/images/logo-light.png"
            className="logo-lg h-6"
            alt="Light logo"
          />
          <img
            src="assets/images/logo-sm.png"
            className="logo-sm"
            alt="Small logo"
          />
        </div>

        {/* <div className="logo-dark">
              <img src="assets/images/logo-dark.png" className="logo-lg h-6" alt="Dark logo">
              <img src="assets/images/logo-sm.png" className="logo-sm" alt="Small logo">
          </div> */}
      </a>

      <button
        id="button-hover-toggle"
        className="absolute top-5 end-2 rounded-full p-1.5"
      >
        <span className="sr-only">Menu Toggle Button</span>
        <i className="mgc_round_line text-xl"></i>
      </button>
    </div>
  );
};

export default AdminPanel;
