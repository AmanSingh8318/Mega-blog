import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import service from '../../appwrite/config'
import { Button, RTE } from '../index'
function Postform(post) {
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);
    const {register,handleSubmit,watch,setValue,control,
        getValues}=useForm(
        {
            defaultValues:{
                title:post?.title || "",
                content:post?.content || "",
                slug:post?.slug||"",
                status:post?.status ||"active"
            }
        }
    );
                const submit=async(data)=>{
                    if (post) {
                        // if any post is avilable then upload it
                       const file =data.image[0]? service.uploadFile(data.image[0]):null
                            // if file is availabe then delete it
                       if (file) {
                        service.deleteFile(post.featuredImage)
                            // need to updated
                        const dbPost= await service.updatePost(
                            post.$id,{
                                    ...data,
                                    featuredImage:file ?file.$id : undefined
                        })
                        if (dbPost) {
                            navigate(`/post${dbPost.$id}`)
                        }
                       }
                    }
                    // in else case if the post is not available in this
                    // case user wants to create the new post
                    else {
                        // for new post upload the file
                        const dbpost=data.image[0]?service.uploadFile(data.image[0]):null
                        
              if (file) {
                // if file is available take the file id from the file.$id
                const fileid=file.$id;
                // after file is uploaded assign the file id to the post.featuredImage
                    service.featuredImage=fileid

                    // now create the new post 
              const dbpost=  await service.createPost({
                  ...data,
                  userId:userData.$id
                })
                // after creating the post succesfully navigate it
                if(dbpost){
                  navigate(`/post/${dbpost.$id}`)
                  alert("Post created successfully")
                }
              }
                    }
                }
                const slugTransfrom=useCallback((value)=>{
                    if(value && typeof value ==="String")
                    {
                      return value.toLowerCase().replace(/\s+/g, "-")
                      return ""
                    }
                  },[])
          
                  React.useEffect(()=>{
                    const subscriptiion=watch((value,{name})=>{
                        if (name==="title") {
                          setValue('slug',slugTransfrom(value.title,{
                            shouldValidate:true
                          }))
                        }
                    })
                    return (()=>{
                      subscriptiion.unsubscribe();
                    })
                  },[watch,slugTransfrom,setValue])
                  return (
                    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                        <div className="w-2/3 px-2">
                            <Input
                                label="Title :"
                                placeholder="Title"
                                className="mb-4"
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Slug :"
                                placeholder="Slug"
                                className="mb-4"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />
                            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                        </div>
                        <div className="w-1/3 px-2">
                            <Input
                                label="Featured Image :"
                                type="file"
                                className="mb-4"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                            />
                            {post && (
                                <div className="w-full mb-4">
                                    <img
                                        src={appwriteService.getFilePreview(post.featuredImage)}
                                        alt={post.title}
                                        className="rounded-lg"
                                    />
                                </div>
                            )}
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className="mb-4"
                                {...register("status", { required: true })}
                            />
                            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                                {post ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </form>
                );
            }

export default Postform
