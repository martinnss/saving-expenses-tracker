import React,{useState, useEffect, useRef} from 'react'
import useAddTransactions from '../Hooks/useAddTransactions.jsx'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'
import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import GmailAuthTest from './GmailAuthTest';
import { GoogleOAuthProvider } from '@react-oauth/google';
import formatDate from '../functions/formatDate.js';

import useReadPdf from '../Hooks/useReadPdf.jsx'


import '../Styles/FileUpload.css'

let count =0

const FileUpload = ({ openPopup })=> {

    const userInfo = useGetUserInfo()
    const [updatedCacheFlag, setUpdatedCacheFlag] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [jsonTransactions, setJsonTransactions] = useState("")
    const [hasPassword, setHasPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('Selecciona un archivo');
    const [bank, setBank] = useState("");

    const [isExpandedGmail, setExpandedGmail] = useState(true);
    const [isExpandedPdf, setExpandedPdf] = useState(false);

    const toggleRolloutGmail = () => {
        setExpandedGmail(!isExpandedGmail);
    };
    const toggleRolloutPdf = () => {
        setExpandedPdf(!isExpandedPdf);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const pdfBlob = URL.createObjectURL(file)

        setSelectedFile(pdfBlob);
        setNombreArchivo(file.name || 'Selecciona un archivo');
    };

    //read and category the pdf
    const transactionsWithCategories = useReadPdf({
        pdfUrl: selectedFile ? selectedFile : '',
        bank: bank,
        pdfPassword:password,
        setJsonTransactions: setJsonTransactions,
        jsonTransactions:jsonTransactions
    });


    
    //add the transactions to firestore
    const { jsonData } = useAddTransactions({
        updatedCacheFlag: updatedCacheFlag,
        setUpdatedCacheFlag: setUpdatedCacheFlag,
        jsonInput: transactionsWithCategories
    });

    const inputArchivoRef = useRef(null);
    const manejarClickBoton = () => {
        inputArchivoRef.current.click(); // Simula el clic en el input de archivo
      };

    const handleChooseBank = (event) => {
        setBank(event.target.value);
    };
    


    
    const { expenses } = useGetExpenses({
        startDateFilter: null,
        endDateFilter: null,
        dataUpToDate: updatedCacheFlag
    });

    const latestExpenses = expenses.slice(0, 5);

    // popup pdf
    useEffect(() => {
        if (selectedFile !== null){
            openPopup();
        }

        if (transactionsWithCategories && transactionsWithCategories.length > 0) {
          openPopup();
        }
      }, [transactionsWithCategories,selectedFile]);

    // popup mail


    return (
        <div className="content">
            <div className="fileupload-header">
                <div className="fileupload-header-content">
                    <span className="page-title">Dashboard</span>
                    <span className="back-button">
                    <div class="icon-container">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="back-icon"
                        >
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </div>
                    <span className="back-text">Obtener mis Gastos</span>
                    </span>
                </div>
            </div>
            <div className="main-content">
                <h1 className='fileupload-title'>Obtener mis Gastos</h1>
                <div className='file-upload-options'>
                <div className="file-upload-container">
                    <div className={`file-upload ${isExpandedGmail ? 'expanded' : ''}`}>
                        <div className ="file-upload-subtitle" onClick={toggleRolloutGmail}>
                            <h3 >Trae tus Compras desde Gmail</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={`icon ${isExpandedGmail ? 'hide' : ''}`} id="plus">
                                <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={`icon ${isExpandedGmail ? '' : 'hide'}`}>
                                    <path d="M38 26H10v-4h28v4z" transform="translate(-10 -15)" ></path>
                            </svg>
                        </div>
                        {isExpandedGmail && (
                        <>
                            <p style={{ marginBottom: '0.8rem' }}>Proceso automatizado para ver tus gastos. <br />Solo para Banco de Chile y Santander (No te pedimos contraseñas)</p>
                            <p style={{ fontSize: '10px', fontStyle: 'italic', marginTop: '0rem', marginBottom: '0.8rem' }}>*Solo aplica para usuarios que tienen conectadas las notificaciones de compras en sus correos</p>
                            <p style={{ marginBottom: '0.8rem' }}><strong>¿Cómo funciona?</strong></p>
                            <p>
                            <ol>
                                <li>Conecta tu cuenta de Gmail con Walleton</li>
                                <li>Déjanos el resto a nosotros😎</li>
                            </ol>
                            </p>
                            <div>
                            {/* Contenido adicional aquí */}
                            <GoogleOAuthProvider clientId="640576926117-qrjdh5uc3j0h998cd04f1rot4k1hff97.apps.googleusercontent.com">
                                <GmailAuthTest triggerPopup={openPopup} />
                            </GoogleOAuthProvider>
                            </div>
                        </>
                        )}
                    </div>
                    </div>

                    <div  className="file-upload-container">
                        <div className={`file-upload ${isExpandedPdf ? 'expanded' : ''}`}>
                            <div className ="file-upload-subtitle" onClick={toggleRolloutPdf}>
                                <h3 >Ingresa tu Estado de Cuenta</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={`icon ${isExpandedPdf ? 'hide' : ''}`} id="plus">
                                    <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class={`icon ${isExpandedPdf ? '' : 'hide'}`}>
                                    <path d="M38 26H10v-4h28v4z" transform="translate(-10 -15)"  ></path>
                                </svg>
                            </div>
                            {isExpandedPdf && (
                                <>
                                    <p>Sube el PDF de tu TC para comenzar a ahorrar</p>
                                    <div className='file-upload-box'>
                                        <strong><p>Selecciona tu banco</p></strong>
                                        <select value={bank} onChange={handleChooseBank}>
                                            <option value="santander">Banco Santander</option>
                                            <option value="bancodechile">Banco de Chile</option>
                                        </select>
                                    </div>
                                    <div className='file-upload-box'>
                                        <div className="has-password">
                                            <strong><p>¿Tu archivo tiene contraseña?</p></strong>
                                            <input
                                                type="checkbox"
                                                checked={hasPassword}
                                                onChange={() => setHasPassword(!hasPassword)}
                                            />
                                        </div>
                                        {hasPassword && (
                                            <div className='file-upload-innerbox'>
                                            <strong><p>Contraseña del archivo</p></strong>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Contraseña"
                                            />
                                            </div>
                                        )}
                                    </div>                  


                                    <div className='seleccionar-archivos-file-container'>
                                        <button className='seleccionar-archivos-file' onClick={manejarClickBoton}>Seleccionar Archivo</button>  
                                    </div>
                                    <input
                                        type="file"
                                        ref={inputArchivoRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <p>{nombreArchivo}</p>
                                    
                                </>
                            )}
                        </div>
                    </div>


                </div>
                
                <div className="expenses-table-div">
                    <table className="expenses-table">
                        <caption className="table-caption">
                            Gastos Recientes
                        </caption>
                        <thead>
                            <tr className="table-row">
                            <th className="table-header">Fecha</th>
                            <th className="table-header">Descripción</th>
                            <th className="table-header">Monto</th>
                            <th className="table-header">Categoría</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                latestExpenses.map((expense) => {
                                    if (expense.uid === userInfo.uid) {
                                      return (
                                        <tr key={expense.transaction_id} className='table-row'>
                                          <td className='table-data'>{formatDate(expense.date.toLocaleString())}</td>
                                          <td className='table-data'>{expense.seller}</td>
                                          <td className='table-data'>{expense.amount.toLocaleString('es-CL', {
                                                                        style: 'currency',
                                                                        currency: 'CLP',
                                                                        })}
                                        </td>
                                          <td className='table-data'>{expense.category}</td>
                                        </tr>
                                      );
                                    } else {
                                      return null; // Omitir las filas que no cumplen con la condición
                                    }
                                  }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FileUpload