import { useEffect, useRef, useState } from "react";
import ModalDocs from "./Modal"
import {useNavigate} from 'react-router-dom'
import {Firestore, addDoc, collection, onSnapshot,QuerySnapshot,CollectionReference} from 'firebase/firestore'
import { IDoc } from "../type";



interface Props{
    database: Firestore;
}


const Docs:React.FC<Props> = ({database}) => {
    //values
        //get the value from the input
    const [title, setTitle] = useState<string>('');
    // get the value from the buttom 'add' from modal
    const [open, setOpen] = useState<boolean>(false);
    //get and set de values from firestore
    const [docsData, setDocsData] = useState<IDoc[]>([]);
    //get the collections based on the database, and the name of the collection 
    //(we make a casting with CollectionReference and our interface)
    const collectionRef = collection(database, 'docsData') as CollectionReference<IDoc>;

    let navigate = useNavigate();

    //handlers
    const handleOpen = (open?:boolean) => setOpen(open ?? true);
    const handleTitle = (titutlo:string) => setTitle(titutlo);
    const isMounted = useRef<boolean>();

    const getData = () =>{

        onSnapshot(collectionRef, 
        (data:QuerySnapshot) => {
            const results = data.docs.map (d =>({...d.data(), id: d.id}) as IDoc)  ;
            setDocsData(results);
        });
    }


    const getID = (id:string) => navigate(`/editDocs/${id}`)
    

    
    const handleClose = () => {}
    //handle a promise
    const addData = () => {
        addDoc(collectionRef, {
            title,
            body:'',
            id:''
        }).then(() => {
            alert('Data Added');
            handleClose();
        }).catch(() =>{
            alert('Cannot add data');
        })
    }
    
    useEffect(() => {
        if(isMounted.current) return;

        isMounted.current = true;
        getData();
    }, [])

    return (
        <div className="docs-main">
            <h1>Docs Clone</h1>

            <button className="add-docs"
                onClick={ () => handleOpen()}>
                Add a Document
            </button>


            <ModalDocs
                open={open}
                setOpen={handleOpen}
                title ={title}
                setTitle ={handleTitle}
                addData={addData}
                />

                <div className="grid-main">
                    {docsData.map((doc,i) => (
                        <div key={i} 
                        className='grid-child'
                        onClick={() => getID(doc.id)}>
                            <h3 style={{margin:'0px'}}>{doc.title}</h3> 
                            <p dangerouslySetInnerHTML={{__html:doc.body?.split(' ').reduce((preWord,word,i) => i < 10 ? `${preWord} ${word}` : preWord ,'')}}/>
                         </div>
                    ))}
                </div>
        </div>
    )
}

export default Docs
