import { Models } from 'appwrite'
import Loader from './loader'
import GridPostsLists from './GridPostsLists'

type SearchResultsProps = {
    isfetching : boolean
    posts : Models.Document[] | undefined
}

const SearchResults = (props : SearchResultsProps) => {
    if(props.isfetching){
        <div className="w-full h-full">
            <Loader/>
        </div>
    }
  return (
    <div className='flex felx-wrap gap-5'>
      <GridPostsLists posts={props.posts} type='explore' />
    </div>
  )
}

export default SearchResults
