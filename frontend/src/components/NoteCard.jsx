import { Link, useNavigate } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';
import apiNotes from '../lib/axios';
import toast  from 'react-hot-toast';
import { useState } from 'react';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      await apiNotes.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      toast.success("Note Deleted Successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed To Delete Note");
      console.log("Error Deleting Note:", error);
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/note/edit/${id}`);
  };

  return (
    <>
      <Link to={`/note/${note._id}`} className='card bg-base-100 hover:border-[#00FF9D] transition-all duration-200 border-t-4 border-solid border-[#1b362c]'>
        <div className='card-body'>
          <h3 className='card-title text-base-content'>{note.title}</h3>
          <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
          <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>
              Created At:&nbsp;
              {formatDate(new Date(note.createdAt))}
            </span>
            <span className='text-sm text-base-content/60'>
              Updated At:&nbsp;
              {formatDate(new Date(note.updatedAt))}
            </span>
            <div className='flex items-center gap-1 justify-items-end'>
              <PenSquareIcon className='size-4 text-gray-500 hover:text-white transition-colors duration-200 mx-2' onClick={(e) => handleEdit(e, note._id)} />
              <Trash2Icon
                className='size-4 text-red-400 hover:text-red-800 transition-colors duration-200 mx-2'
                onClick={e => { e.preventDefault(); setShowModal(true); }}
              />
            </div>
          </div>
        </div>
      </Link>

      <ConfirmDeleteModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onDelete={e => handleDelete(e, note._id)}
      />
    </>
  );
};

export default NoteCard;