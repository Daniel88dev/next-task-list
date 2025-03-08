import { ReactNode } from "react";

type TaskLayoutProps = {
  children: ReactNode;
  taskModal: ReactNode;
};

const taskLayout = ({ children, taskModal }: TaskLayoutProps) => {
  return (
    <>
      {children}
      {taskModal}
    </>
  );
};

export default taskLayout;
