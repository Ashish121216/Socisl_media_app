import {
 useQuery,
 useMutation,
 useQueryClient,
 useInfiniteQuery,
} from "@tanstack/react-query"
import { createPost, createUserAccount, deletesavePost, getCurrentUser, getrecentposts, liked, save, signInAccount, signOutAccount } from "../appwrite/api"
import { INewPost, INewUser } from "@/types"
import { QUERY_KEYS } from "./querykey"


export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user:INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user:{
            email:string ; 
            password:string;}) => signInAccount(user)
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
          });
        },
      });
    };

export const usegetrecentposts = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:getrecentposts
    })
}

export const uselikedpost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn  :({postId,likesArray} :{postId:string, likesArray:
            string[]}) => liked(postId , likesArray),
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POST_BY_ID,data?.$id]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}

export const usesavespost = () =>{
    const queryClient = useQueryClient();
    console.log("we are in queries")
    return useMutation({
        mutationFn  :({postId,userId} :{postId:string, userId:
            string}) => save(postId , userId),
            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}

export const usedeletesavedpost = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn  :({savedRecordId} :{savedRecordId:string}) =>deletesavePost(savedRecordId),
            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn:getCurrentUser
    })
}