import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import { MdPublish } from 'react-icons/md';
import UpdateProcess from './UpdateProcess';

const ImportCsvModal = (props) => {
    const { showImportModal, state } = props;
    const [fileData, setFileData] = useState();
    const [startUpdate, setStartUpdate] = useState(false);
    const [confirmUpdate, setConfirmUpdate] = useState(false);

    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        setFileData(file);
    }

    const formatCSVFile = () => {
        setConfirmUpdate(true)
    }

    const handleUserUpdates = () => {
        setStartUpdate(true)
    }

    const getSecondOption = () => {
        if (!fileData) {
            return <>
                <p style={{ color: 'red', fontWeight: 600, textAlign: 'center' }}>An error occured while uploading file</p>
                <div>
                    <div onClick={() => setFileData(null)}>Try Again</div>
                </div>
            </>
        }
        formatCSVFile()
    }

    return (ReactDOM.createPortal(
        <div className={styles.modalContainer}>
            <div className={styles.modalContent + " animate__animated animate__backInUp"}>
                {/* <UpdateProcess /> */}
                {!startUpdate && !confirmUpdate && <div className={styles.fileUpload}>
                    {!fileData && <p>Please upload a file (📄) to continue.</p>}
                    {!fileData && <div>
                        <div onClick={() => showImportModal(false)}>Cancel</div>
                        <label className={styles.customFileUpload}>
                            <input type="file" accept=".csv" onChange={handleCsvUpload} />
                            Upload <MdPublish style={{ height: 20, width: 20, marginBottom: "-0.2rem" }} />
                        </label>
                    </div>}
                    {fileData &&
                        <div className={styles.confirmUpdate + " animate__animated animate__fadeInDown"}>
                            {getSecondOption()}
                        </div>
                    }
                </div>}
                {!startUpdate && confirmUpdate && <div className={styles.confirmUpdate + " animate__animated animate__fadeInDown"}>
                    <p style={{ color: 'red' }}>Uploading data cannot be stopped once it's started. Continue?</p>
                    <div>
                        <div style={{padding: "0.7rem 2rem"}} onClick={() => showImportModal(false)}>Cancel</div>
                        <div onClick={() => handleUserUpdates()}>Continue</div>
                    </div>
                </div>}
                {startUpdate && <UpdateProcess {...{ fileData, showImportModal }} />}
            </div>
        </div >, document.body)
    );
}

export default ImportCsvModal;