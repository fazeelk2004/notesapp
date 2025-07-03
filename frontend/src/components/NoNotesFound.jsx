import { ShieldAlert } from "lucide-react";
import { Link } from "react-router";

const NoNotesFound = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ShieldAlert className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">No Notes Found!</h3>
            <p className="text-base-content mb-1">
              No Notes Have Been Created Yet.
            </p>
            <span className="text-sm text-base-content/70">
              Please Click&nbsp; 
            </span>
            <Link to="/create" className="text-sm text-[#18A048]">
                Here
            </Link>
            <span className="text-sm text-base-content/70">
                ,&nbsp;Or The New Note Button To Create Your First Note.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoNotesFound;