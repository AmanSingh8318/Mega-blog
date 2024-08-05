import { Client, Databases, ID, Query, Storage } from 'appwrite';
import conf from '../conf/conf';

export class Service{

 client=new Client();
 databases;
 bucket;
 constructor(){
    this.client
        .setEndpoint(conf. appwrite_url)
        .setProject(conf.appWriteProjectId);
        this.databases= new Databases(this.client) ;
        this.bucket= new Storage(this.client);
 }

    async createPost({title,slug,content,featuredImage,status,userId}){

          try {
              await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
               title,
               content,
               featuredImage,
               status,
               userId,    
                })

              
          } catch (error) {
            throw error;
            
          }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try {

            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
         try {
              return this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
              )
              return true;
         } catch (error) {
             throw error;
         }
         return false;
    }

    async getPost(slug){
            try {
                return await this.databases.getDocument(
                    conf.appWriteDatabaseId,
                    conf.appWriteCollectionId,
                    slug
                )
            } catch (error) {
                throw error;
            }
    }

    //get indivdual post read the query from the documentation
    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
        }
        return false
    }

    // file uploading methods 

    async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    conf.appWriteBucketId,
                    ID.unique(),
                    file
                )
            } catch (error) {
                throw error;
            }
            return false;
    }

            async deleteFile(fileId){
                try {
                    return await this.bucket.deleteFile(
                        conf.appWriteBucketId,
                        fileId
                    )
                    return true
                } catch (error) {
                    throw error;
                }
            }

            async getFilepreview(fileId){
                try {
                    this.bucket.getFilePreview(
                        conf.appWriteBucketId,
                        fileId,
                    )
                } catch (error) {
                    throw error;
                }
            }
}

const service =new Service();
export default  service;