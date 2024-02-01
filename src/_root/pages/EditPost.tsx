import PostForm from '@/components/ui/forms/PostForm';
import Loader from '@/components/ui/shared/loader';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const {id} = useParams();
  if(!id) throw Error
  const {data : post} = useGetPostById(id);
  if(!post){
    return(
      <div className="w-full h-full">
        <Loader/>
      </div>
    )
  }
  return (
    <div className='flex flex-1'>
      <div className="common-container">
        <div className='max-w-5xl flex start gap-3 justify-start w-full'>
          <img src="assets/icons/add-post.svg" alt="add" width={36} height={36}/>
          <h2 className='h3-bold md:h2-bold text-left 2-full'>Edit Post</h2>
        </div>
        <PostForm post={post} action='edit' />
      </div>  
    </div>
  )
}

export default EditPost
