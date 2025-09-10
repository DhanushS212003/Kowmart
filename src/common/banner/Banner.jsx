import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./banner.css";

const Banner = ({ banners, titles }) => (
  <div className="banner_section">
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
      transitionTime={1000}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <div
            className="banner_chevron_container left_chevron"
            onClick={onClickHandler}
            title={label}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <div
            className="banner_chevron_container right_chevron"
            onClick={onClickHandler}
            title={label}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        const className = isSelected ? "banner_dots selected" : "banner_dots";

        return (
          <div
            className={className}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            value={index}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${label} ${index + 1}`}
          />
        );
      }}
    >
      {banners.map((banner, index) => (
        <div
          key={index}
          className="banner_container"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <h3 className="banner_title">{titles[index]}</h3>
        </div>
      ))}
    </Carousel>
  </div>
);

export default Banner;
