import React, { useState, useContext } from 'react';
import { BuilderContext } from '../App'

const Upload = () => {
    const ctx = useContext(BuilderContext)
    const [imageDataUrl, setImageDataUrl] = useState('');
    //console.log(imageDataUrl);
    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageDataUrl(reader.result);
        };
        reader.onerror = () => {
            console.log('error');
        };
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submitting');
        try {
            const res = await fetch('/.netlify/functions/uploadImage',
                {
                    method: 'POST',
                    body: imageDataUrl,
                }
            );

            const data = await res.json();
            const { imgId, url } = data
            console.log(imgId, url);
            ctx.handleImageUrl(url)
            console.log(data);
            setImageDataUrl('');
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                    <input
                        className='bg-gray-200 mt-6 hover:bg-gray-700 text-white py-2 px-4 rounded'
                        type='file' onChange={handleChange} />
                    {/* <span>+</span> */}
                </label>

                <button type='submit'
                    className='bg-gray-400 mt-6 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                    disabled={!imageDataUrl}>
                    {' '}
                    Upload Image
                </button>
            </form>
            {imageDataUrl && (
                <img className="height-50 w-50" src={imageDataUrl} alt="aircloud_gallery" />
            )}
        </div>
    );
};

export default Upload;
