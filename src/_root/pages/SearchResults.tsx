import Loader from "@/components/shared/Loader";
import GridPostList from "./GridPostList";
import type { Models } from "appwrite";

interface ISearchResultProps {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined;
}

const SearchResults = ({ isSearchFetching, searchedPosts }: ISearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  }

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
};

export default SearchResults;
