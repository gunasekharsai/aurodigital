const CardBody = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={`h-full w-full relative ${className}`}>
        {children}
      </div>
    );
  };
  
  export default CardBody;
  