import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import type { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Button } from "../ui/Button";
import Loader from "./Loader";
import { useUserContext } from "@/contexts/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSidebar = () => {
  const { mutateAsync: signOut, isPending, isSuccess } = useSignOutAccount();
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const isLoading = false;

  if (isSuccess) return <Navigate to="/sign-in" />;

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => {
          if (isPending) return;
          signOut();
        }}
        disabled={isPending}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
