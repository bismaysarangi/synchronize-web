import { motion, MotionValue, useTransform } from "framer-motion";
import { useNavigation } from "src/navigation/NavigationContext";
import SlidingButton from "../Button/SlidingButton";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  src: string;
  mobileSrc?: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
  path?: string;
}

const MotionCard: React.FC<CardProps> = ({
  title,
  description,
  src,
  mobileSrc,
  color,
  i,
  progress,
  range,
  targetScale,
  path,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  const { goto } = useNavigation();

  const handleClick = () => {
    if (path) goto(path);
  };

  return (
    <div className="h-screen max-h-[900px] flex items-center justify-center sticky top-0 w-full">
      <motion.div
        className={`flex flex-col-reverse sm:flex-row gap-5 sm:gap-0 relative h-[85vh] sm:h-[600px] overflow-hidden rounded-2xl p-0 sm:p-12 w-full`} // Increased width and height
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        {/* Left Side: Title and Description */}
        <div className="flex flex-col sm:w-1/2 px-6 pb-6 sm:pb-0 sm:pr-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 text-primary-400">
            {title}
          </h2>

          <p className="text-sm md:text-base lg:text-lg">{description}</p>

          <SlidingButton
            buttonProps={{ onClick: handleClick }}
            primaryText="Explore"
            secondaryText="Explore"
            className="mt-5"
          />
        </div>

        {/* Right Side: Image */}
        <div className="relative sm:w-1/2 h-full sm:rounded-2xl overflow-hidden">
          <img
            src={`${src ? src : mobileSrc}`}
            alt={title}
            className="object-cover w-full h-full hidden sm:block"
          />

          <img
            src={`${mobileSrc ? mobileSrc : src}`}
            alt={title}
            className="object-cover w-full h-full block sm:hidden"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MotionCard;
