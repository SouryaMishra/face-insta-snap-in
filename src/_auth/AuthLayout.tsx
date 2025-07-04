import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const cookieFallback = localStorage.getItem("cookieFallback");
  const isNotAuthenticated = cookieFallback === "[]" || cookieFallback == null;

  return isNotAuthenticated ? (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default AuthLayout;
