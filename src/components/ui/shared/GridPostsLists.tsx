import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStates from './PostStates'

type GridPostsListProps = {
    posts: Models.Document[] | undefined
    type : "saved" | "explore"
}

const GridPostsLists = (props : GridPostsListProps) => {
    const {user} = useUserContext();
  return (
    <ul className='w-full grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden'>
      {
        props?.posts?.map((post) => {
            if(props.type === "saved"){
                post = post.post;
            }
            return(
                <li key={post.$id}>
                    <div className="flex flex-1 flex-col w-full">
                        <Link to={`/post-details/${post.$id}`} className='w-full h-full'>
                        <img
                            src={post.imageUrl}
                            alt={`image - ${post.$id}`}
                            width={300}
                            height={300}
                        />
                        </Link>
                        <div className="flex mt-1">
                            <Link to={`/profile/${post.creator.$id}`}>
                                <img src={post.creator.imageUrl} 
                                    alt='Profile photo' 
                                    width={24} 
                                    height={24}
                                    className='mt-2 mr-1 rounded-full'/>
                            </Link>
                            <div className="flex flex-col m-1">
                                <p className='small-regular'>{post.creator.name}</p>
                                <p className='small-regular'>{post.creator.email}</p>
                            </div>
                        </div>
                        <PostStates post={post} userId={user.id}/>
                    </div>
                </li>
            )
        })
      }
    </ul>
  )
}

export default GridPostsLists
