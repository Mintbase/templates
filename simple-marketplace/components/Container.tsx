import React from 'react';

interface ContainerProps {
  children:React.ReactNode
}
export function Container({ children }: ContainerProps):JSX.Element {
  return <div className="mx-24 md:mx-64">{children}</div>;
}
