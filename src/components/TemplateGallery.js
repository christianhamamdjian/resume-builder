import React, { useEffect, useContext, useState } from 'react';
// import { Image, Transformation } from 'cloudinary-react';
import template1 from '../templates/Template1.png';
import template2 from '../templates/Template2.png';
import template3 from '../templates/Template3.png';
import template4 from '../templates/Template4.png';
import template5 from '../templates/Template5.png';
import template6 from '../templates/Template6.png';
import template7 from '../templates/Template7.png';
import { BuilderContext } from '../App'

const TemplateGallery = ({ updateTemplate }) => {
    const [images, setImages] = useState([]);

    const templates = [template1, template2, template3, template4, template5, template6, template7]

    useEffect(() => {
        setImages(templates);
    }, []);
    const handleTemplateChange = (e, index) => {
        updateTemplate(e, index)
    }
    return (
        <div style={{ padding: "1rem", overflowX: "auto", overflowY: "hidden", maxWidth: "20rem", height: "auto" }}>
            <div style={{ minWidth: "20rem", display: "flex", gap: "1rem" }}>
                {images.length > 0 &&
                    images.map((image, index) => (
                        <div className='gallery-img' key={index}>
                            <img
                                src={image} onClick={(e) => handleTemplateChange(e, index + 1)}
                                style={{ width: "4rem", height: "auto" }}
                                alt={index} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TemplateGallery;
