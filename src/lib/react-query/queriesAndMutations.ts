/* eslint-disable react-hooks/rules-of-hooks */
import {
 useQuery,
 useMutation,
 useQueryClient,
 useInfiniteQuery,
} from "@tanstack/react-query"
import { createPost, createUserAccount, deletesavePost, getCurrentUser, getInfinitePosts, getrecentposts, liked, save, getSavedPosts, searchPosts, signInAccount, signOutAccount, getPostsById, editPost, getAllUser } from "../appwrite/api"
import { INewPost, INewUser, IUpdatePost } from "@/types"
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

export const useEditPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: IUpdatePost) => editPost(post),
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

export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey:[QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn:getInfinitePosts as never,
        initialPageParam: 1,
        getNextPageParam : ( lastpage : any ) => {
            if(lastpage && lastpage.documents.length ===0 ){
                return null;
            }
            else{
                const lastId = lastpage.documents[lastpage.documents.length - 1].$id;
                return lastId;
            }
        }

    })
}

export const useSearchPosts = (SearchTerm : string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_SEARCH_POSTS,SearchTerm],
        queryFn : () => searchPosts(SearchTerm),
        enabled: !!SearchTerm
    })
}

export const useSavedPosts = (id : string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_SAVED_POSTS,id],
        queryFn : () => getSavedPosts(id)
    })
}

export const useGetPostById = (id : string) => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_POST_BY_ID,id],
        queryFn : () => getPostsById(id)
    })
}
export const useGetAllUsers = () => {
    return useQuery({
        queryKey:[QUERY_KEYS.GET_ALL_USERS],
        queryFn:getAllUser
    })
}