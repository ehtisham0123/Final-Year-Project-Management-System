import FileViewer from "react-file-viewer";
import { useState, useEffect } from "react";
import Spinner from "../../Spinner.png";
import { useParams } from "react-router-dom";

function AssignmentViewer() {
  const [loading, setLoading] = useState(false);
  let { id, file, file_type } = useParams();
  return (
    <div id="content" className="mx-3">
      <div className="container">
        <h3 className="card-title text-center my-3">Assignment Details</h3>
        {loading ? (
          <div className="loading">
            <img src={Spinner} className="loader" alt="loader" />
            <h2>Loading</h2>
          </div>
        ) : (
          <div className="card">
            <div className="card-body h-100 view_assignment">
              <FileViewer
                fileType={file_type}
                filePath={`/uploads/${file}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignmentViewer;
