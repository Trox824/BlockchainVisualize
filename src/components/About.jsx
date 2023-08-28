import AgePic from "./age.jpg";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200 shadow-xl rounded-xl mt-10">
        <div className="hero-content flex-col lg:flex-row">
          <img src={AgePic} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Pham Tien Son</h1>
            <p className="py-6 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              enim, fuga sed quod iusto provident ipsa cum similique aperiam
              porro debitis voluptatem ipsam, soluta alias, ab sint quaerat
              molestias et! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Quod aliquam distinctio laudantium, iure nemo delectus iste
              reiciendis nobis ullam perferendis animi exercitationem quisquam,
              placeat, dolore id dignissimos rerum. Sunt, non!
            </p>

            <button className="btn btn-primary">
              <Link to="/Home">Start</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
