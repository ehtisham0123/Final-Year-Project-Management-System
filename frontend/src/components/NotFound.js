import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="container">
        <h1 className="my-5">OOPS Page Not Found  err 404 
          <Link className="ml-3" to={`/`}>
             Home
          </Link>
        </h1>
      </div>
    </>
  );
}
export default NotFound;



