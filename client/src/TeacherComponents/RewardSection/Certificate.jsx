import React, { useState, useCallback, useRef } from "react";
import { toPng } from 'html-to-image';
import './certificate.css';
import certificateTemplate from './certificate.png';

const Certificate = () => {
    const ref = useRef(null);
    const [name, setName] = useState('');

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'my-certificate.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);
    return (
        <div className="container">
            <input className="name-input" type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
           
            <div className="certificate-container" ref={ref}>
                <img src={certificateTemplate} alt="Certificate Template" className="certificate-image" />
                <div className="name-container text-">{name}</div>
            </div>
            
            <button className="download-button" onClick={onButtonClick}>Download Certificate</button>
        </div>
    );
}

export default Certificate;
