function About() {
  return (
    <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
              <h3>Our Development <span> Team</span></h3>
              <div className="line"></div>
            </div>
          </div>
        </div>
      <div className="row mt-5">  
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>    
            <div className="advisor_thumb"><img src="/uploads/profile.png" alt="Maam Sidra Zubair" className="w-100" />     
            </div>
            <div className="single_advisor_details_info">
              <h6>Sidra Zubair</h6>
              <p className="designation">Supervisor</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s" >
            <div className="advisor_thumb">
            <img src="/ehtisham.jpg" alt="Maam Kinza Jadoon" className="w-100" />
            </div>   
            <div className="single_advisor_details_info">
              <h6>Ehtisham Jadoon</h6>
              <p className="designation">Full Stack Developer</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s">        
            <div className="advisor_thumb"><img src="/badshah.jpg" alt="Syed Abdullah Badshah" className="w-100" />       
           </div>
            <div className="single_advisor_details_info">
              <h6>Syed Abdullah</h6>
              <p className="designation">SQA Engineer</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.5s">
            <div className="advisor_thumb">
            <img className="w-100 h-100" src="/ali_husnain.jpg" alt="Ali Husnain Raza" />
              </div>
            <div className="single_advisor_details_info">
              <h6>Ali Husnain Raza</h6>
              <p className="designation">Tester</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;



