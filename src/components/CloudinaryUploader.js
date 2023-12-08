import React, { useEffect } from 'react';

const CloudinaryUploader = () => {
  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    const upload = async () => {
      document.getElementById('uploading').style.visibility = 'visible';
      const uploader = document.getElementById('uploader');
      const file = await readFile(uploader.files[0]);

      try {
        const response = await fetch(
          `${document.location.origin}/.netlify/functions/upload`,
          {
            method: 'POST',
            body: file,
          }
        );
        const data = await response.json();
        if (data.error) {
          const div = document.getElementById('result');
          div.innerHTML = `<div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p class="font-bold">No GPS data</p>
            <p>${data.message}</p>
          </div>`;
        } else {
          document.getElementById('uploading').style.visibility = 'hidden';
          const div = document.getElementById('result');
          div.innerHTML = '';
          const img = document.createElement('img');
          img.src = data.url;
          div.appendChild(img);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    const uploader = document.getElementById('uploader');
    uploader.addEventListener('change', upload);

    return () => {
      uploader.removeEventListener('change', upload);
    };
  }, []);

  return (
    <div className="bg-red-200">
      <main className="flex h-screen justify-center items-center text-white">
        <div className="text-center bg-red-700 p-10 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold">Cloudinary & Netlify GeoMagic (🪄)</h1>
          <p className="text-xl p-2">Select an image that contains GPS EXIF metadata.</p>
          <div>
            <label
              className="
                mx-auto
                w-64
                text-black
                items-center
                p-4
                m-5
                bg-white
                rounded-lg
                shadow-2xl
                tracking-wide
                uppercase
                border border-yellow-500
                cursor-pointer
                hover:bg-yellow-200
                flex flex-col
              "
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <span className="mt-2 text-base text-black leading-normal">Select an image</span>
              <input type="file" id="uploader" className="hidden" />
            </label>
          </div>
          <p id="uploading">Working ...</p>
          <div id="result"></div>
          <p className="pt-5 text-xl">
            Demo by
            <a href="https://tpiros.dev" className="underline"> Tamas Piros </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CloudinaryUploader;
