import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import NeuroSurgeon from '../assets/neurosurgeon.jpeg'
import Orthopedic from '../assets/Orthopedic.jpeg'
import Cardiac from '../assets/Cardiac.jpeg'
import Dermatologist from '../assets/Dermatologist.jpeg'
import ENT from '../assets/ENT.jpeg'

function OurSpecialitiesGallery(props) {


const[speciality, setSpeciality] = useState([])

  useEffect(()=>{
    console.log(props.specialities)

    setSpeciality(props.specialities)

  })
  return (
    <CardGroup>
      <Card className='col-md-4 m-3' key={1}>
        <Card.Img variant="top" src={NeuroSurgeon}  />
        <Card.Body style={{borderRadius:60}} >
          <Card.Title>{speciality[0]}</Card.Title>
          <Card.Text>
          Our Neurosurgeons are involved in preventing, diagnosing and treating disorders of the brain, spine and nerves. We also treat conditions that affect the flow of blood to the brain. As well as performing operations, we often involve in a person's rehabilitation after treatment.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className='col-md-4 m-3' key={1}>
        <Card.Img variant="top" src={Cardiac} />
        <Card.Body>
          <Card.Title>{speciality[1]}</Card.Title>
          <Card.Text>
          S4 hospital's cardiac surgeons are medical doctors who had advanced training in performing surgery on the heart. They belong to different specialties and specialize in types of intricate heart procedures, such as procedures done on children and Senior Citizens.
          </Card.Text>
        </Card.Body>
      </Card>

      
      <Card className='col-md-4 m-3' key={2}>
        <Card.Img variant="top" src={ENT} />
        <Card.Body>
          <Card.Title>{speciality[2]}</Card.Title>
          <Card.Text>
          ENT specialization is one of our strengths at S4 hospitals. As we have become the city's major organization that people put their trust in. Our Ear, Nose and Throat surgeons take pride in what they do and where they belong.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className='col-md-4 m-3' key={3}>
        <Card.Img variant="top" src={Dermatologist} />
        <Card.Body>
          <Card.Title>{speciality[3]}</Card.Title>
          <Card.Text>
          Specialized in conditions involving the skin, hair, and nails. Our expert dermatologists can identify and treat more than 3,000 conditions. These conditions include eczema, psoriasis, and skin cancer, among many others. And prescribe a treatment.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className='col-md-4 m-3' key={3}>
        <Card.Img variant="top" src={Orthopedic} />
        <Card.Body>
          <Card.Title>{speciality[4]}</Card.Title>
          <Card.Text>
          Our medical professionals who are specialised in diagnosing, treating, preventing and rehabilitating musculoskeletal injuries and diseases, both surgically and non-surgically. The musculoskeletal system includes bones, joints, ligaments, tendons, muscles and nerves.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
    
  );
}

export default OurSpecialitiesGallery;