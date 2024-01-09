import React,{useState, useEffect, useRef} from 'react'
import useAddTransactions from '../Hooks/useAddTransactions.jsx'
import useGetExpenses from '../Hooks/useGetExpenses.jsx'
import { useGetUserInfo } from "../Hooks/useGetUserInfo";

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
    
    function cambiarTextoInputFile() {
        // Crear un nuevo elemento de entrada de archivo
        var nuevoInputFile = document.createElement('input');
        nuevoInputFile.type = 'file';
      
        // Reemplazar el antiguo elemento con el nuevo
        document.getElementById('inputFile').parentNode.replaceChild(nuevoInputFile, document.getElementById('inputFile'));
      
        // Actualizar el id para futuras referencias
        nuevoInputFile.id = 'inputFile';
      
        // Simular un clic en el nuevo elemento
        nuevoInputFile.click();
      }

    const handleChooseBank = (event) => {
        setBank(event.target.value);
    };
    


    
    const { expenses, updateExpenseType } = useGetExpenses({
        startDateFilter: null,
        endDateFilter: null,
        dataUpToDate: updatedCacheFlag
    });

    const latestExpenses = expenses.slice(0, 5);

    useEffect(() => {
        if (selectedFile !== null){
            openPopup();
        }

        if (transactionsWithCategories && transactionsWithCategories.length > 0) {
          openPopup();
        }
      }, [transactionsWithCategories,selectedFile]);

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
                        <span className="back-text">File Upload</span>
                    </span>
                </div>
            </div>
            <div className="main-content">
                <h1 className='fileupload-title'>File Upload</h1>
                <div  className="file-upload-container">
                    <div className="file-upload">
                        <h3>Ingresa tu Estado de Cuenta</h3>
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



                        <button onClick={manejarClickBoton}>Seleccionar Archivo</button>
                        <input
                            type="file"
                            ref={inputArchivoRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <p>{nombreArchivo}</p>
                        
                    </div>
                </div>
                <div className="expenses-table">
                    <table className="expenses-table">
                        <caption className="table-caption">
                            Recent Expenses
                        </caption>
                        <thead>
                            <tr className="table-row">
                            <th className="table-header">Date</th>
                            <th className="table-header">Description</th>
                            <th className="table-header">Amount</th>
                            <th className="table-header">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                latestExpenses.map((expense) => {
                                    if (expense.uid === userInfo.uid) {
                                      return (
                                        <tr key={expense.transaction_id} className='table-row'>
                                          <td className='table-data'>{expense.date.toString()}</td>
                                          <td className='table-data'>{expense.seller}</td>
                                          <td className='table-data'>{expense.amount}</td>
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