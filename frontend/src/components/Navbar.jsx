import { Link, useLocation } from 'react-router'; // <-- use react-router-dom
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to ="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter hover:text-[#2a643e] transition-colors duration-200">
              ThinkBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            {location.pathname !== "/create" && ( // <-- condition here
              <Link to="/create" className="btn btn-primary">
                <PlusIcon className='size-5' />
                <span>New Note</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
    
  )
}

export default Navbar