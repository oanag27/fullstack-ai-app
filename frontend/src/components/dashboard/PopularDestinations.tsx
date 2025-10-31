import { UNSPLASH_ACCESS_KEY } from "config";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface DestinationImagesProps {
  destination?: string;
}
const PopularDestinations: React.FC<DestinationImagesProps> = ({
  destination,
}) => {
  const imagesList = [
    "images/landing-page/landing-page-1.jpeg",
    "images/landing-page/landing-page-2.jpeg",
    "images/landing-page/landing-page-3.jpeg",
    "images/landing-page/landing-page-4.jpeg",
    "images/landing-page/landing-page-5.jpeg",
    "images/landing-page/landing-page-1.jpeg",
    "images/landing-page/landing-page-2.jpeg",
    "images/landing-page/landing-page-3.jpeg",
    "images/landing-page/landing-page-4.jpeg",
    "images/landing-page/landing-page-5.jpeg",
  ];
  const [imagesToShow, setImagesToShow] = useState<string[]>(imagesList);
  useEffect(() => {
    if (!destination) {
      setImagesToShow(imagesList);
      return;
    }

    const fetchUnsplashImages = async (query: string) => {
      try {
        const accessKey = UNSPLASH_ACCESS_KEY;
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            query
          )}&per_page=10&client_id=${accessKey}`
        );
        const payload = await res.json();
        const urls = payload.results.map((img: any) => img.urls.regular);
        setImagesToShow(urls.length ? urls : imagesList);
      } catch (err) {
        console.error("Error fetching Unsplash images", err);
        setImagesToShow(imagesList);
      }
    };

    fetchUnsplashImages(destination);
  }, [destination]);

  return (
    <div className="bg-black p-3">
      <Carousel
        useKeyboardArrows={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        infiniteLoop
        autoPlay
        centerMode={true}
        centerSlidePercentage={33.33}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
      >
        {imagesToShow.map((src, index) => (
          <div
            key={index}
            style={{
              margin: "0 10px",
              width: "90%",
              height: "600px",
              display: "inline-block",
            }}
          >
            <img
              src={src}
              alt={""}
              onError={(e) => {
                e.currentTarget.src = imagesList[0];
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PopularDestinations;
