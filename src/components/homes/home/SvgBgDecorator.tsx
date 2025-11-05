interface SvgBgDecoratorProps {
  side?: 'left' | 'right';
  size?: string;
  opacity?: number;
}

const SvgBgDecorator = ({ side = 'right', size = '50%', opacity = 0.15 }: SvgBgDecoratorProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        [side]: 0,
        top: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundImage: 'url(/bg-logo/Asset%203.svg)',
        backgroundSize: size,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `center ${side}`,
        width: '100%',
        height: '100%',
        opacity: opacity
      }}
    >
    </div>
  );
};

export default SvgBgDecorator;
