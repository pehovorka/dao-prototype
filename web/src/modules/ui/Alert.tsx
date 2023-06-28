interface AlertProps {
  message: React.ReactNode;
  type: "error" | "success" | "info" | "warning";
  actions?: React.ReactNode;
  noWrap?: boolean;
}
export const Alert = ({
  message,
  type,
  actions,
  noWrap = false,
}: AlertProps) => {
  const className = getAlertClassName(type, noWrap);
  const icon = getIcon(type);
  return (
    <div className={className}>
      <div>
        {icon}
        <span>{message}</span>
      </div>
      {actions && <>{actions}</>}
    </div>
  );
};

const getAlertClassName = (type: AlertProps["type"], noWrap: boolean) => {
  switch (type) {
    case "error":
      return `alert alert-error shadow-lg ${!noWrap && "flex-wrap"}`;
    case "info":
      return `alert alert-info shadow-lg ${!noWrap && "flex-wrap"}`;
    case "success":
      return `alert alert-success shadow-lg ${!noWrap && "flex-wrap"}`;
    case "warning":
      return `alert alert-warning shadow-lg ${!noWrap && "flex-wrap"}`;
  }
};

const getIcon = (type: AlertProps["type"]) => {
  switch (type) {
    case "error":
      return <ErrorIcon />;
    case "info":
      return <InfoIcon />;
    case "success":
      return <SuccessIcon />;
    case "warning":
      return <WarningIcon />;
  }
};

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-current flex-shrink-0 w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current flex-shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const WarningIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className ? className : "stroke-current flex-shrink-0 h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current flex-shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
