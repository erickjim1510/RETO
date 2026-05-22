import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cuervo from '../pages/imgs/cuervo.jpg'
import starwars from '../pages/imgs/starwars.jpg'
import avengers from '../pages/imgs/avengers_animated.png'
import forrestgump from '../pages/imgs/forrestgump.jpg'
import './Cartelera.css';
import { useNavigate, Link} from "react-router-dom";


function Cartelera() {
    const navigate = useNavigate();
    return (
        <div className="card-container">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={cuervo} />
                <Card.Body>
                    <Card.Title>El Cuervo</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate('/sala')}>
                        Horarios
                    </Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={starwars} />
                <Card.Body>
                    <Card.Title>Star Wars</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate('/sala')}>
                        Horarios
                    </Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={avengers} />
                <Card.Body>
                    <Card.Title>Avengers</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate('/sala')}>
                        Horarios
                    </Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={forrestgump} />
                <Card.Body>
                    <Card.Title>Forrest Gump</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate('/sala')}>
                        Horarios
                    </Button>
                </Card.Body>
            </Card>
        </div>
      );
        
}

export default Cartelera;