import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";
import SearchResults from "./SearchResults";
import GridPostList from "./GridPostList";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/shared/Loader";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === divRef.current && entry.isIntersecting) fetchNextPage();
      }
    });

    if (divRef.current) observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item && item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>

        <div className="flex-between w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular Today</h3>

          <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img src="/assets/icons/filter.svg" width={20} height={20} alt="filter" />
          </div>
        </div>
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {shouldShowSearchResults ? (
            <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} />
          ) : shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
          ) : (
            posts.pages.map(
              (item, index: number) => item && <GridPostList key={`page-${index}`} posts={item.documents} />
            )
          )}
        </div>
      </div>
      {hasNextPage && !searchValue && (
        <div ref={divRef} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
