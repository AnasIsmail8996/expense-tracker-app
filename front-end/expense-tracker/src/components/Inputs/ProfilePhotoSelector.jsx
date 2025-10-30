import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash} from "react-icons/lu"
const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef=useRef(null);

    const[previewURl, setPreviewURL]=useState(null);

    const handleImageChange=(event)=>{
const file= event.target.files[0];

if(file){
setImage(file)

const preview= URL.createObjectURL(file)
setPreviewURL(preview)
}
    }


    const handleRevomeImage= ()=>{
        setImage(null)
        setPreviewURL(null)
    }

    const onChooseFile=()=>{
        inputRef.current.click();

    }
        
  return (
    <>
    <div className='flex justify-center mb-5'>
        <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />
        {!image ?( <div className='w-20 h-20 flex items-center justify-center
         bg-purple-300 rounded-full  relative'> <LuUser className='text-4xl text-primary'/>   
        <button type='button' className='w-8 h-8 flex justify-center items-center bg-primary text-white rounded-full absolute  -bottom-1 -right-1' onClick={onChooseFile}  ><LuUpload className=''/></button>
        </div> ) :(
            <div className='relative'>
                <img src={previewURl} alt="Profile Photo"  className='w-20 h-20 rounded-full object-cover'/>
                <button className='w-8 h-8 flex justify-center items-center bg-red-500 rounded-full absolute -bottom-1 -right-1'  type='button' onClick={handleRevomeImage}><LuTrash/>  </button>
            </div>
        )}
    </div>
    </>
  )
}

export default ProfilePhotoSelector;