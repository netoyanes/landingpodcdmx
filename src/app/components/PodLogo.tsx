import isotypeImage from '../../imports/eeee.png';

interface PodLogoProps {
  className?: string;
  color?: string;
  size?: number;
}

export default function PodLogo({ className = '', color = '#0D0D0D', size = 100 }: PodLogoProps) {
  return (
    <img
      src={isotypeImage}
      alt="POD Isotype"
      width={size}
      height={size}
      className={className}
      style={{
        filter: color === '#0D0D0D'
          ? 'brightness(0) saturate(100%) invert(3%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(103%) contrast(103%)'
          : color === '#EFEFE0'
          ? 'brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(326%) hue-rotate(24deg) brightness(102%) contrast(93%)'
          : 'none',
      }}
    />
  );
}
