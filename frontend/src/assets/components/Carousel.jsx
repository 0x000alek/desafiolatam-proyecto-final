import Carousel from 'react-bootstrap/Carousel'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Slide1 from '../images/slide1.jpg'

const Slide = () => {
    return (
        <Carousel fade controls={false} indicators={false}>
            <Carousel.Item>
                <img className="d-block w-100" src={Slide1} alt="First slide" />
                <Carousel.Caption className='d-flex justify-content-center flex-column shadow-lg'>
                    <h4>Revisa nuestros productos</h4>
                    <h2 className='mb-3'>Los usados y nuevos en un solo lugar!</h2>
                    <div className='text-center'><Link to="/repository"><Button className="btn-secondary">ver productos</Button></Link></div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Slide