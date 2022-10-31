import {Firestore, collection,CollectionReference,doc,updateDoc, onSnapshot} from 'firebase/firestore'
import ReactQuill from "react-quill";
import {useParams} from'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react';
import { IDoc } from '../type';

interface Props{
    database: Firestore;
}

const EditDocs:React.FC<Props> = ({database}) => {
    const [docsDesc, setDocsDesc] = useState<IDoc>({id:'',title:'',body:''});
    const getQuillData = (value:string) => setDocsDesc({...docsDesc,body:value});
    const collectionRef = collection(database, 'docsData') as CollectionReference<IDoc>
  
    const getData = () =>{
        const document = doc(collectionRef, params.id);
        
        onSnapshot(document, docs => setDocsDesc(docs.data() ?? {id:'',title:'',body:''}));
        
    }

    const isMounted = useRef<boolean>();
    useEffect( () =>{
        if(isMounted.current) return;

        isMounted.current = true;
        getData();
    },[]);
    
    let params = useParams();
    
    useEffect(() =>{
        const updateDocsData = setTimeout (() =>{
            //search the docuemnt by id
            const document = doc(collectionRef,params.id);
            //set de current docuemnt with the new data
            updateDoc(document,{
                ...docsDesc
            })
            .then(() => console.log('Saved'))
            .catch(() => console.log('Cannot Save'))
        },1000);

        return () => clearTimeout(updateDocsData);
    },[docsDesc])
    return (
        <div>
            <h1>{docsDesc.title}</h1>
            EditDocs
            <ReactQuill
            value={docsDesc.body}
            onChange={getQuillData}
            />
        </div>
    )
}

export default EditDocs

