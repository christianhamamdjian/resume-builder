export const SVGItem = ({ path, url, textColor }) => (
  <a src={url}>
    <svg
      stroke='currentColor'
      // fill='#FFF'
      fill={textColor}
      strokeWidth='0'
      viewBox='0 0 448 512'
      height='24'
      width='24'
    >
      <path d={path} />
    </svg>
  </a>
)
