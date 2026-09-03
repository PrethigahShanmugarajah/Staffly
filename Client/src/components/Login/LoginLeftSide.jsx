const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-teal-950 relative overflow-hidden border-r border-gray-200">
      <div className="absolute -top-30 -left-30 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
        <h1 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight">
          Employee <br /> Management System
        </h1>

        <p className="text-gray-400 text-lg max-w-md leading-relaxed text-justify">
          Simplify employee management, track performance, manage attendance,
          and keep your team organized with Staffly. Everything you need to
          manage your workforce efficiently in one simple and convenient
          platform.
        </p>
      </div>
    </div>
  );
};

export default LoginLeftSide;
