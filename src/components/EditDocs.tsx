import {Firestore, collection,CollectionReference,doc,updateDoc, onSnapshot} from 'firebase/firestore'
import ReactQuill from "react-quill";
import {useParams} from'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react';
import { IDoc } from '../type';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props{
    database: Firestore;
}

const EditDocs:React.FC<Props> = ({database}) => {
    //used to save the current document opened and use it data to update it
    const [docsDesc, setDocsDesc] = useState<IDoc>({id:'',title:'',body:''});
    // it used to show de UI to write a basic document 
    const getQuillData = (value:string) => setDocsDesc({...docsDesc,body:value});
    //reference our docsData's collection
    const collectionRef = collection(database, 'docsData') as CollectionReference<IDoc>
  
    const getData = () =>{
        //get the reference of the document that we want
        const document = doc(collectionRef, params.id);
        //set the reference and in the call back return our document, and set on DocsDesc
        onSnapshot(document, doc => setDocsDesc(doc.data() ?? {id:'',title:'',body:''}));

        console.log(docsDesc);
        
    }

    let params = useParams();
    const isMounted = useRef<boolean>();
    useEffect( () =>{
        if(isMounted.current) return;

        isMounted.current = true;
        getData();
    },[]);
    
    
    useEffect(() =>{
        //it's called each 1 second
        const updateDocsData = setTimeout (() =>{
            //search the docuemnt by id
            const document = doc(collectionRef,params.id);
            //set de current docuemnt with the new data
            updateDoc(document,{
                ...docsDesc
            })
            .then(() => toast.success('Documento Guardado',{autoClose:2000}))
            .catch(() => toast.error('Erro al guardar el documento',{autoClose: 2000}))
        },1000);

        return () => clearTimeout(updateDocsData);
    },[docsDesc])
    return (
        <div className='editDocs-main'>
            <ToastContainer/>
            <h1>{docsDesc.title}</h1>
            EditDocs
            <div className="editDocs-inner">
                <ReactQuill
                className='react-quill'
                value={docsDesc.body}
                onChange={getQuillData}
                />
            </div>
        </div>
    )
}

export default EditDocs

