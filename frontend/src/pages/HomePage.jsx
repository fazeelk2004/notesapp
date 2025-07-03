import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import RateLimit from '../components/RateLimit'
import NoteCard from '../components/NoteCard';
import apiNotes from '../lib/axios';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await apiNotes.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error Fetching Notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed To Fetch Notes');
          setIsRateLimited(false);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  },[])

  return (
    <div className='min-h-screen'>
      {isRateLimited && <RateLimit />}
      <div className='mx-auto max-w-7xl p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes ...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>   
        )}
      </div>
    </div>
  )
}

export default HomePage