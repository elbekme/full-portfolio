import { Link} from 'react-router-dom';
import '../pages/notFound.css';

const NotFoundPage = () => {
  return (<section className="page_404">
  <div className="container">
    <div className="row"> 
    <div className="col-sm-12 ">
    <div className="col-sm-10 col-sm-offset-1  text-center">
    <div className="four_zero_four_bg">
      <h1 class="text-center ">404</h1>
    
    
    </div>
    
    <div className="contant_box_404">
    <h3 class="h2">
    Look like you're lost
    </h3>
    
    <p>the page you are looking for not avaible!</p>
    
    <Link to="/" className="go-home">Go to Home</Link>
  </div>
    </div>
    </div>
    </div>
  </div>
</section>
  )
}

export default NotFoundPage