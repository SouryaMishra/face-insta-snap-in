import Loader from "@/components/shared/Loader";
import GridPostList from "./GridPostList";
import { useGetCurrentUser, useGetPostByIds } from "@/lib/react-query/queriesAndMutations";
import type { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savedPostIds = currentUser?.save?.map(({ post }: { post: Models.Document }) => post.$id);

  const { data: savedPosts, isPending } = useGetPostByIds(savedPostIds);

  const renderSavedPosts = () => {
    if (!currentUser || isPending) return <Loader />;
    if (!savedPosts) return <p className="text-light-4">No available posts</p>;
    if (savedPosts && savedPosts.total === 0) return <p className="text-light-4">No available posts</p>;
    return (
      <ul className="w-full flex justify-center max-w-5xl gap-9">
        <GridPostList posts={savedPosts.documents} showStats={true} />
      </ul>
    );
  };

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img src="/assets/icons/save.svg" width={36} height={36} alt="edit" className="invert-white" />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {renderSavedPosts()}
    </div>
  );
};

export default Saved;
