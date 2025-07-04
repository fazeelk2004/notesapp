import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import apiNotes from '../lib/axios';
import { toast } from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const NoteDetailPage = () => {
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await apiNotes.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        if ( error.response?.status === 429) {
          toast.error("Slow Down!. Please Try Again Later.", {
            duration: 5000,
            icon: "🚨",
          });
        } else {
          toast.error('Error Fetching Note');
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/note/edit/${id}`);
  };


  const handleDelete = async (e,id) => {
    try{
      await apiNotes.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed To Delete Note");
      console.log("Error Deleting Note:", error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">  
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={() => setShowModal(true)} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h1 className="text-2xl font-bold mb-4 text-primary">Note Details</h1>
              <h2 class="card-title">{note.title}</h2>
              <p className='text-ellipsis'></p>
              <p>{note.content}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary" onClick={(e) => handleEdit(e, note._id)}>Edit Note!</button>
              </div>
            </div>
          </div>
          <ConfirmDeleteModal
            open={showModal}
            onCancel={() => setShowModal(false)}
            onDelete={e => handleDelete(e, note._id)}
          />
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage