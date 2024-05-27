import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ProjectCarouselProps {
  onSlideChange: (index: number) => void;
}

const projectData = [
  {
    title: "Project A",
    video: "/projects/plog.mp4"
  },
  {
    title: "Project B",
    video: "/projects/hopebabelikesmyorb.mp4"
  },
  {
    title: "Project C",
    video: "/projects/videoGFX.mp4"
  }
];

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ onSlideChange }) => {
  const handleSlideChange = (index: number) => {
    onSlideChange(index);
  };

  return (
    <div className="carousel-container flex-1 p-6">
      <Carousel 
        showThumbs={false} 
        onChange={handleSlideChange} 
        infiniteLoop 
        showStatus={false} 
        autoPlay={false}
      >
        {projectData.map((project, index) => (
          <div key={index}>
            <video controls className="carousel-video">
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default React.memo(ProjectCarousel, (prevProps, nextProps) => {
  return prevProps.onSlideChange === nextProps.onSlideChange;
});
