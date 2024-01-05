import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

const UpdateProcess = (props) => {
    const { fileData, showImportModal } = props;
    const progressBar = useRef();
    const warningRef = useRef();
    const [uploadingRecords, setUploadingRecords] = useState(false);
    const [isUploadingComplete, setIsUploadingComplete] = useState(false);
    const [didUploadFailed, setUploadFailed] = useState(false)

    const updateRecords = async () => {
        if(!uploadingRecords){
            setUploadingRecords(true);
            var formdata = new FormData();
            formdata.append("file", fileData, "SamagraBotData.csv");
            formdata.append("generateEmbeddings", "true");

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BFF_URL}/translationdictionary/upload`, requestOptions)
            if(response.status != 201 ){
                setUploadFailed(true)
                progressBar.current.style.width = '100%'
                progressBar.current.style.background = 'linear-gradient(90deg, #E53935, #F44336, #FFCDD2, #F44336, #E53935)'
            } else {
                progressBar.current.style.width = `100%`;
                setUploadingRecords(false);
                setIsUploadingComplete(true);
            }
        }
    }

    useEffect(() => {
        if(!uploadingRecords)
        updateRecords()
    }, [])

    return (
        <div className={styles.container}>
            {!uploadingRecords && !isUploadingComplete && <div> Starting update ...</div>}
            {uploadingRecords && <div>Uploading records ...</div>}
            {isUploadingComplete && <div style={{color:didUploadFailed?"red":"black"}}>{didUploadFailed? "Upload Failed": "Upload Complete"}</div>}
            <div className={styles.progressContainer}><div className={styles.progressBar} style={uploadingRecords ? {} : { animation: 'none' }} ref={progressBar}></div></div>
            {uploadingRecords && <p style={{ color: 'red', padding: '1rem 0rem', fontWeight: 600 }} className='animate__animated animate__slow animate__flash' ref={warningRef}>Do not refresh this page!</p>}
            <div className={styles.btnContainer}>
                <div className={!isUploadingComplete ? styles.disabled : ''} onClick={() => { if (isUploadingComplete) { showImportModal(false); window.location.reload()} }}>{didUploadFailed?"Try Again":"Done"}</div>
            </div>
        </div >

    );
}

export default UpdateProcess;