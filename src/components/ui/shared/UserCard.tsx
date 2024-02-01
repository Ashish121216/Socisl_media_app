import { Models } from "appwrite";
import { Link } from "react-router-dom";

type userCardProps = {
  user : Models.Document
}
const UserCard = ({user} : userCardProps) => {
    console.log(user);
  return (
    <div>
      <div className=" flex flex-col justify-center items-center text-center object-center w-56 h-32 bg-dark-3 rounded-lg m-3 p-5">
        <Link to={`/profile/${user.$id}`}>
        <img src={(user.imageUrl) ? user.imageUrl :"/assets/icons/profile-placeholder.svg"}
        width={36}
        height={36}
        className="rounded-full ml-auto mr-auto mb-2 mt-2"
        />
            <div className="w-full text-center bg-gray-50 mt-5 mb-5 h-px"></div>
        <p className="small-regular sm:tiny-regular">@{user.username}</p>
        <p className="small-regular sm:tiny-regular">{user.name}</p>
        </Link>
      </div>
    </div>
  )
}

export default UserCard
