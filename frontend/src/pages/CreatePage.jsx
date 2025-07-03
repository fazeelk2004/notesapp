import { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import apiNotes from '../lib/axios';

const CreatePage = () => {

  const [userTitle, setUserTitle] = useState("");
  const [userContent, setUserContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userTitle.trim()) {
      toast.error("Title Is Required");
      return;
    }
    if(!userContent.trim()) {
      toast.error("Content Is Required");
      return;
    }

    setLoading(true);
    try{
      await apiNotes.post("/notes", {
        userTitle,
        userContent
      })
      toast.success("Note Created Successfully");
      navigate("/")
    }catch(error) {
      if (error.response?.status === 429) {
        toast.error("Slow Down!. Please Try Again Later.", {
          duration: 5000,
          icon: "🚨",
        });
      } else {
        toast.error("Failed To Create Note");
      }
      console.log("Error Creating Note:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input 
                    type="text" 
                    value={userTitle} 
                    onChange={(e) => setUserTitle(e.target.value)} 
                    className="input input-bordered" 
                    placeholder="Enter Note Title" />
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea 
                    value={userContent} 
                    onChange={(e) => setUserContent(e.target.value)} 
                    className="textarea textarea-bordered h-32" 
                    placeholder="Enter Note Content..." />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary " disabled={loading} >
                    {loading ? "Creating..." : "Create Note"}
                  </button >
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CreatePage