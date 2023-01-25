import { useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";

function Home() {
  const token = reactLocalStorage.get("token");
  const [response, setResponse] = useState([]);
  useEffect(() => {
    let getUserData = async () => {
      await axios
        .get(`http://localhost:5000/`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          if (response.data) {
            setResponse(response.data.result[0]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserData();
  }, []);
  return (
    <div className="container ml-4">
      <div className="row py-2">
        <div className="col-6 text-center">
          <div className="row">
            <div className="col-3">
              <div
                className="card home-border home-bg"
                style={{width: "155px", height: "155px"}}
              >
                <div className="card-body home-body home-body-border ">
                  <h4 className="card-title text-uppercase m-0 fixed ">
                    {response.projects}  
                       
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-6">
              <h3 className="h5  home-serv homeserv-border">    
                 PROJECTS
                </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-md-center py-2">
        <div className="col-6 text-center">
          <div className="row">
            <div className="col-3">
              <div
                className="card home-border home-bg"
                style={{width: "155px", height: "155px"}}
              >
                <div className="card-body home-body home-body-border ">
                  <h4 className="card-title text-uppercase m-0  ">
                        {response.teachers} 
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-6">
              <h3 className="h5 home-serv homeserv-border">
                TEACHERS
              
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-md-end py-2 ">
        <div className="col-6 text-center">
          <div className="row">
            <div className="col-3">
              <div
                className="card home-border home-bg"
                style={{width: "155px", height: "155px"}}
              >
                <div className="card-body home-body home-body-border ">
                  <h4 className="card-title text-uppercase m-0  ">
                    {response.students}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-6">
              <h3 className="h5 home-serv homeserv-border">
                  STUDENTS
              </h3>
            </div>
          </div>
        </div>
      </div> 
    </div>
 
    
  );
}

export default Home;



