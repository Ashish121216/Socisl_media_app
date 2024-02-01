import PostCard from '@/components/ui/shared/PostCard'
import { useParams } from 'react-router-dom'
import  { useGetPostById }  from '@/lib/react-query/queriesAndMutations'
import Loader from '@/components/ui/shared/loader'
const PostDetails = () => {
  const {id} = useParams();
  if(!id) throw Error;
  const {data : post , isFetching : ispostsloading} = useGetPostById(id);
  if(!post){
    return(
      <div className="flex w-full h-full items-center">
      <Loader/>
    </div>
    )
  }
  return (
    <div>
      <div className="flex flex-1 w-full justify-center m-2">
      {
            ispostsloading && !post ? (
              <Loader />
            ):(
                <PostCard post = {post} />

                )
              }
      </div>
    </div>
  )
}

export default PostDetails
