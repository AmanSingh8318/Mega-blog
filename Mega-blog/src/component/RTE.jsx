import { Editor } from "@tinymce/tinymce-react";
import React from 'react';
import { Controller } from 'react-hook-form';
function RTE({
            children,
            label,
            control,
            defaultValue=""
        }) {
        return (
            <div className='w-full'> 
            <label  className='inline-block mb-1 pl-1'></label>
                {label}
                <Controller
                name={m=name || "content"}
                control={control}
                render={({field:{onChange}})=>(
                    <Editor
                     initialValue={defaultValue}
                     init={{
                        height:500,
                         menubar:true,
                         plugins:[
                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                           'searchreplace wordcount visualblocks visualchars code fullscreen anchr searchreplace',
                           'visualblocks code fulscrren insertdatetime media table code help wordcount',
                         ],
                        
                         content_css: [
                            '//fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Material+Icons',
                            '//www.tinymce.com/css/codepen.min.css'
                   ] }}
                   onEditorChange={onchange}
                    />
                )}
                
                />
           </div>
        )
        }

export default RTE;
