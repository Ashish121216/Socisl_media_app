import GridPostsLists from '@/components/ui/shared/GridPostsLists';
import Loader from '@/components/ui/shared/loader';
import { useUserContext } from '@/context/AuthContext'
import { useSavedPosts } from '@/lib/react-query/queriesAndMutations';

const Saved = () => {
  const {user} = useUserContext();
  const {data :posts} = useSavedPosts(user.id);
  console.log(posts);
  if(!posts) {
    <div className="w-full h-full">
      <Loader/>
    </div>
  }
  return (
    <div className="saved-container">
      <div className="h3-bold md:h2-bold">Saved Posts</div>

      <GridPostsLists posts={posts?.documents} type="saved"/>
    </div>
  )
}

export default Saved
