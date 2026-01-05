import React from "react";
import clsx from "clsx";

export interface NoticeProps {
  message: string;
}

export default function Notice({ message }: NoticeProps): React.ReactNode {
  return <div className={clsx("notice-container")}>{message}</div>;
}
