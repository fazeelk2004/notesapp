import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import apiNotes from '../lib/axios';
import { toast } from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const UpdateNote = () => {
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSave = async () => {
    if(!note.title.trim()) {
      toast.error("Title Is Required!");
      return;
    }
    if(!note.content.trim()) {
      toast.error("Content Is Required!");
      return;
    }
    setSaving(true);
    try {
      await apiNotes.put(`/notes/${id}`, note);
      toast.success("Note Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error Saving Note:", error);
      if (error.response?.status === 429) {
        toast.error("Slow Down!. Please Try Again Later.", {
          duration: 5000,
          icon: "🚨",
        });
      } else {
        toast.error("Failed To Update Note");
      }
    } finally {
      setSaving(false);
    }
  }

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
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
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

export default UpdateNote