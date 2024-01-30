require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async (event) => {
    // Capture the file from the event body
    const file = event.body;

    try {
        // Upload the file captured to cloudinary
        const { public_id, secure_url } = await cloudinary.uploader.upload(file,
        );
        const record = {
            imgId: public_id,
            url: secure_url,
            username: 'Cris',
        };
        return {
            statusCode: 200,
            body: JSON.stringify(record),
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ err: 'Failed to upload image' }),
        };
    }
};

