import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../textarea"
import FileUploader from "../shared/FileUploader"
import { Postvalidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useEditPost } from "@/lib/react-query/queriesAndMutations"
import Loader from "../shared/loader"


type PostForm = {
  post ?: Models.Document;
  action :"create" | "edit"
} 

const PostForm = ({post , action}:PostForm) => {
const {mutateAsync : createPost ,isPending: isLoadingCreate} = useCreatePost();
const {mutateAsync : editPost ,isPending: isLoadingedit} = useEditPost();
const {user} = useUserContext();
const navigate = useNavigate();
const {toast} = useToast();
  console.log(post); ``
  const form = useForm<z.infer<typeof Postvalidation>>({
    resolver: zodResolver(Postvalidation),
    defaultValues: {
      caption : post ? post.caption:"",
      file:[],
      location: post ? post.location:"",
      tags : post ? post.tags.join(','):"",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof Postvalidation>) {
    if(action === "create"){
      const newPost = await createPost({
        userId: user.id,
        ...values
      })
      if(!newPost){
        toast({
          title:"please try again"
        })
      }
      navigate("/");
    }
    if(post && action === "edit"){
      const updatedPost = await editPost({
        postId : post?.$id,
        imageId : post?.imageId,
        imageUrl:post?.imageUrl,
        ...values,
      })
      if(!updatedPost){
        toast({
          title:"please try again"
        })
    }
    navigate(`/post-details/${post?.$id}`);
  }
}
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
              <FileUploader
              fieldChange = {field.onChange}
              mediaUrl = {post?.imageUrl}
              />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
            <Input type="text" 
            className="shad-input"
            {...field}
            />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add tags(Separated by comma ",")</FormLabel>
            <FormControl>
            <Input type="text" 
            className="shad-input" 
            placeholder="Art ,js,nextjs"
            {...field} />
            </FormControl>
            <FormMessage className="shad-form_message" />
          </FormItem>
        )}
      />
      <div className="flex gap-4 justify-end items-center">
      <Button
      type="button"
      className="shad-button_dark_4">Cancel</Button>
      <Button 
      type="submit"
      className="shad-button_primary whitespace-nowrap"
      disabled={isLoadingCreate || isLoadingedit}>
      {isLoadingCreate || isLoadingedit && <Loader/>}
      {action} Post</Button>
      </div>
    </form>
  </Form>
)
}

export default PostForm
