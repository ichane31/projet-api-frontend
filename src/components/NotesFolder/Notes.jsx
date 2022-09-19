import React , {useEffect , useState , useRef} from 'react';
import { getItemFromStorage } from '../../helpers/helper';
import NoteForm from './NoteForm';
import Note from './Note';
import {GetNoteByProjet , PostNote , PutNote , DelNote } from '../../services/NoteService';
import { Toast } from 'primereact/toast';

const Notes = ({projetId , token , currentUserId ,image}) => {

    // const token = getItemFromStorage('token');
    
    const [notes , setNotes ] = useState([]);
    const [activeNote , setActiveNote] = useState(null);
    const toast = useRef(null);

    const addNote = async ( value  ) =>  {
        var data = new FormData();
        data.append('note', value);
        let requestOptions = {
            method: 'POST',
            body: data,
            headers:{"Authorization": "Bearer " +token},
            redirect:'follow'
        };
        
        try{
            let res = await PostNote(projetId ,requestOptions);
            if(res.ok) {
                let d = await res.json();
                setNotes([d , ...notes]);
                setActiveNote(null);
                toast.current.show({ severity: 'success', summary: 'Created!', detail: "Note has been Created Successfully", life: 3000 });
            }
            else {
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0]?.message;
            }
        }
        catch (err) {
            console.log("err : " , err );
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        }
        
    }

    const updateNote = async (noteId , value) => {
        var data = new FormData();
        data.append('note',value);
         let requestOptions = {
             method: 'PUT',
             body: data,
             headers:{"Authorization": "Bearer " +token},
             redirect: 'follow'
         };

         try {
            
            let res = await PutNote(noteId, requestOptions )
            if (res.ok){
                let d = await res.json();
                toast.current.show({ severity: 'success', summary: 'modifié avec succès!', detail: "Mis à jour avec succés", life: 3000 });
                
                const updatedNotes = notes.map((note) => {
                    if(note.id === noteId) {
                        return {... notes , value : value};
                    }
                    return notes;
                });
                setNotes(updatedNotes);
                setActiveNote(null);
            }
            else{
                if(Array.isArray(res) && res.length === 0) return "error";
                let r =  res.json()
                throw r[0]?.message;
            }
        }
        catch (err){
            console.log("err: ", err);
            toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
        } 
    }

    const deleteNote = async (id) => {
        if(window.confirm('Ete vous sur de vouloir supprimer cette note?')) {
            try{
                let res = await DelNote(id ,token)
                if (!res.ok){
                    if(Array.isArray(res) && res.length === 0) return "error";
                    let r = await res.json()
                    throw r[0]?.message;
                }
                else{
                    toast.current.show({ severity: 'success', summary: 'Réussi', detail: 'Note supprimé avec succès', life: 3000 });
                    const updatedNotes = notes.filter(note => note.id !==id);
                    setNotes(updatedNotes);
                }
            }
            catch (err){
                toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 3000 });
            } }
    }

    useEffect(() => {
        GetNoteByProjet(projetId).then((data) => {
          setNotes(data);
        });
      }, []);

      
  return (
    <>
    <Toast ref={toast} />
    <div className="comments">
        <div className="comment-form-title">Attribuer une note</div>
        <NoteForm
          submitLabel="Attribuer"
          handleSubmit={addNote}
          image={image}
           />
        <div className="comment-container">
            {notes.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  activeNote={activeNote}
                  setActiveNote={setActiveNote}
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  currentUserId={currentUserId} 
                  image={image} />    
            ))}
        </div>
      
    </div>
    </>
  )
}

export default Notes
