interface SkeletonProps {
  className?: string;
  rounded?: string;
}
const Skeleton: React.FC<SkeletonProps> = ({ className, rounded }) => {
  return (
    <div
      className={`skeleton dark:opacity-50 ${
        rounded ? "" : "rounded-lg"
      } ${className}`}></div>
  );
};

export default Skeleton;
