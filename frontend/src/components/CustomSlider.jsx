import { useRef, useState, useEffect } from "react";
import "./CustomSlider.css";
import PropTypes from "prop-types";

const CustomSlider = ({ value, max, onChange, direction = "horizontal" }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateValue = (e) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    let newValue;

    if (direction === "vertical") {
    //   const offsetY = rect.bottom - e.clientY; // Position relative to the bottom
    const offsetY = e.clientY - rect.top;
      newValue = Math.min(Math.max((offsetY / rect.height) * max, 0), max);
    } else {
      const offsetX = e.clientX - rect.left; // Position relative to the left
      newValue = Math.min(Math.max((offsetX / rect.width) * max, 0), max);
    }

    return newValue;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const newValue = calculateValue(e);
    onChange(newValue);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newValue = calculateValue(e);
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      id="range-slider"
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "relative",
        ...(direction === "vertical"
          ? { height: "100px", width: "6px" }
          : { height: "6px", width: "100%" }),
      }}
    >
      <div
        className="range-slider__range"
        style={{
          ...(direction === "vertical"
            ? {
                height: `${(value / max) * 100}%`,
                width: "100%",
                bottom: 0,
              }
            : {
                width: `${(value / max) * 100}%`,
                height: "100%",
                
              }),
        }}
      />
      <div
        className="range-slider__thumb"
        style={{
          ...(direction === "vertical"
            ? {
                top: `${(value / max) * 100}%`,
                left: "50%",
                transform: "translateX(-50%)",
              }
            : {
                left: `${(value / max) * 100}%`,
                top: "50%",
                transform: "translateY(-50%)",
              }),
        }}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
};

export default CustomSlider;
