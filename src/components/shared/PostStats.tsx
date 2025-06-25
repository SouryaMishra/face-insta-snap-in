import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import type { IUser } from "@/types";
import type { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

interface IPostStatsProps {
  post: Models.Document;
  userId: IUser["id"];
}
const PostStats = ({ post, userId }: IPostStatsProps) => {
  const [likes, setLikes] = useState<string[]>(() =>
    post.likes.map((user: Models.Document) => user.$id)
  );
  const [isSaved, setIsSaved] = useState(false);

  const { mutateAsync: likePost, isPending: isLikingPost } = useLikePost();
  const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost();
  const { mutateAsync: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavedPost();

  const { data: currentUser, isPending: isGettingCurrentUser } =
    useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => setIsSaved(Boolean(savedPostRecord)), [savedPostRecord]);

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLikingPost) return;

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) newLikes = newLikes.filter((id) => id !== userId);
    else newLikes.push(userId);
    setLikes(newLikes);
    await likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSavingPost || isDeletingPost) return;

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post.$id, userId });
    }
  };

  if (isGettingCurrentUser) return <Loader />;
  return (
    <div className={`flex justify-between items-center z-20`}>
      <div className="flex gap-2 mr-5">
        <button disabled={isLikingPost} onClick={(e) => handleLikePost(e)}>
          <img
            src={`${
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }`}
            alt="like"
            width={20}
            height={20}
          />
        </button>
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={(e) => handleSavePost(e)}
          disabled={isSavingPost || isDeletingPost}
        >
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="share"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default PostStats;
