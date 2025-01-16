const ArrowReply = ({ size, fill = 'currentColor' }: { size: number; fill?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M9.707 6.707a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L6.414 12H13a6 6 0 0 1 6 6a1 1 0 1 0 2 0a8 8 0 0 0-8-8H6.414z"></path>
    </svg>
  );
};

export default ArrowReply;
