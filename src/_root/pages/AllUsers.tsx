import UserCard from '@/components/ui/shared/UserCard';
import Loader from '@/components/ui/shared/loader';
import { useGetAllUsers } from '@/lib/react-query/queriesAndMutations'

const AllUsers = () => {
  const {data :users} = useGetAllUsers();
  if(!users){
    return(
      <div className="w-full flex items-center">
        <Loader/>
      </div>
    )
  }
  
  return (
    <div className='user-container'>
      <p className='h3-bold md:h2-bold m-2'>All Users</p>
      <div className="user-grid">
      {users.documents.map((user) => {
        console.log(user);
        return(
          <UserCard user = {user}/>
        )
      })}
      </div>
    </div>
  )
}

export default AllUsers
