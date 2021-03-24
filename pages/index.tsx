import Image from 'next/image';
import { useState } from 'react';
import { Carousel } from '../packages/carousel/src';

const images = [
  'hyvIttJtKPI',
  'BZh-WSt9doE',
  '6mze64HRU2Q',
  'b650UcXvYUk',
  'xb0wLfZH9Zo',
  'bsZ-dG3ZMMo',
  'Fk6Hj4-FFWw',
];

const IndexPage = () => {
  const [formStep, setFormStep] = useState<number>(0);
  return (
    <main>
      <h1>Image carousel</h1>
      <div className="carousel-container">
        <Carousel
          start={3}
          onStart={() => console.log('Slide show has started!')}
          onApproach={(slideNo, total) => console.log(`Approaching the end! ${total - slideNo - 1} slide left!`)}
          onEnd={(slideNo) => console.log(`The last slide number ${slideNo + 1}!`)}
          onChange={(from, to) => console.log(`Navigating from slide ${from + 1} to the slide ${to + 1}...`)}
        >
          {
            images.map((imageId: string) => (
              <Image src={`https://source.unsplash.com/${imageId}/960x600`} width={960} height={600} key={imageId} />
            ))
          }
        </Carousel>
      </div>
      <h1>Stepper form</h1>
      <div className="carousel-container">
        <Carousel
          start={formStep}
          showArrows={false}
          allowSwipe={false}
          allowDotClick={false}
        >
          <div className="form-body">
            <div className="form-field">
              <label htmlFor="userEmailField">Enter your email</label>
              <input type="email" name="email" id="userEmailField" autoComplete="off" />
            </div>
            <div className="form-cta">
              <div />
              <button type="button" onClick={() => setFormStep(1)}>Next</button>
            </div>
          </div>
          <div className="form-body">
            <div className="form-field">
              <label htmlFor="userPasswordField">Enter your password</label>
              <input type="password" name="password" id="userPasswordField" />
            </div>
            <div className="form-cta">
              <button type="button" onClick={() => setFormStep(0)} style={{ justifySelf: 'start' }}>Go back</button>
              <button type="button">Submit</button>
            </div>
          </div>
        </Carousel>
      </div>
    </main>
  );
};

export default IndexPage;
