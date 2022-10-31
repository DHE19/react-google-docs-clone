import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


interface Props{
    open: boolean;
    setOpen: (close?:boolean) => void;
    title: string;
    setTitle: (title:string) => void;
    addData: () => void;

}

const style ={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    color:'black',
    boxShadow: 24,
    p:4,
}
const ModalDocs:React.FC<Props> = ({open, setOpen, title, setTitle,addData}) => {
    const handleClose = () => setOpen(false);
    
    
    return (
        <div>
            <Modal
                open={open}
                onClose = {handleClose}
                aria-labelledby = "modal-modal-title"
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <input type="text"
                        placeholder='Add The Title'
                        className='add-input' 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        value = {title}
                        />
                    <div className="button-container">
                        <button 
                        className="add-docs"
                        onClick={addData}>
                            Add
                        </button>
                    </div>
                </Box>

            </Modal>
                
        </div>
    )
}

export default ModalDocs
