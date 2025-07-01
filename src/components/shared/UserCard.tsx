import type { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

interface IUserCardProps {
  user: Models.Document;
  currentUserId: string;
}

const UserCard = ({ user, currentUserId }: IUserCardProps) => {
  return (
    <article className="user-card min-h-52">
      <Link to={`/profile/${user.$id}`} className="flex-center flex-col">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14 mb-4"
        />
        <div className="flex-center flex-col gap-1">
          <p className="base-semibold text-light-1 text-center line-clamp-1 font-bold">
            {user.name}
            {user.$id === currentUserId ? " ( You )" : ""}
          </p>
          <p className="small-regular text-light-2 text-center line-clamp-1">@{user.username}</p>
        </div>
      </Link>
      {user.$id !== currentUserId && (
        <Button type="button" size="sm" className="shad-button_primary px-5">
          Follow
        </Button>
      )}
    </article>
  );
};

export default UserCard;
