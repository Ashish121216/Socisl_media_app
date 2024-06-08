/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from '@/components/ui/input';
import GridPostsLists from '@/components/ui/shared/GridPostsLists';
import SearchResults from '@/components/ui/shared/SearchResults';
import Loader from '@/components/ui/shared/loader';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import { useState } from 'react'

const Explore = () => {
  const {data:posts} = useGetPosts();
  const [Searchvalue, setSearchvalue] = useState('');
  const debounce = useDebounce(Searchvalue,500);
  const {data : searchPosts, isFetching: isSearchPostsFetching} = useSearchPosts(debounce);

  if(!posts){
    return(
      <div className="w-full h-full flex justify-center align-center">
        <Loader></Loader>
      </div>
    )
  }
  const shouldShowSearchReasults = Searchvalue !== ""
  const shouldShowPosts = !shouldShowSearchReasults && posts.pages.every((item) =>  item.documents.length === 0)
  console.log("Shouldhsowposts", shouldShowPosts);
  console.log("shouldshowsearchresults",shouldShowSearchReasults);
  return (
     <div className="flex flex-1 flex-col m-5 p-4 gap-3 rounded-lg">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex flex-1 w-full m-3 gap-2 px-3 rounded-lg bg-dark-3">
          <img
          alt='Search'
          src='/assets/icons/search.svg'
          width={24}
          height={24}
          />
          <Input
          type='text'
          className='explore-search'
          value={Searchvalue}
          onChange={(e) => setSearchvalue(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex-between m-2 p-2">
        <h2 className='h2-bold md:h3-bold'>Popular's Today</h2>
        <div className="flex-center bg-dark-3 p-2 rounded-lg">
          <p className='small-medium m-2 md:base-medium'>All</p>
          <img
          src="/assets/icons/filter.svg"
          alt='filter'
          width={24}
          height={24}
        />
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-5">
        {
          shouldShowSearchReasults ? (
            <SearchResults posts = {searchPosts?.documents} isfetching={isSearchPostsFetching} />
          ):
          shouldShowPosts ? (
             <div className="w-full h3-bold md:h2-bold">End Of posts</div>
          ):
          (
            <GridPostsLists posts={posts.pages[0].documents} type='explore' />
          )
        }
      </div>
    </div>
  )
}

export default Explore
