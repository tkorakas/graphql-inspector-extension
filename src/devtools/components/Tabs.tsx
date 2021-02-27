import React, { Children, cloneElement, useState } from "react";

interface TabListProps {
  active?: number;
  setActive?: (number) => void;
}

export const TabList: React.FC<TabListProps> = ({
  children,
  active,
  setActive,
}) => {
  const transformedChildren = Children.map(children, (child, index) => {
    if (!React.isValidElement<TabProps>(child)) {
      return child
    }
    if (child.type === Tab) {
      return cloneElement(child, {
        isActive: active === index,
        setActive: () => setActive(index),
      });
    }
    return child;
  });
  return <div className="tabList">{transformedChildren}</div>;
};

interface TabProps {
  setActive?: () => void;
  isActive?: boolean;
}

export const Tab: React.FC<TabProps> = ({ children, setActive, isActive }) => (
  <div className={`tab ${isActive ? "active" : ""}`} onClick={setActive}>
    {children}
  </div>
);

interface TabPanelsProps {
  active?: number;
}

export const TabPanels: React.FC<TabPanelsProps> = ({ children, active }) => (
  <>{children[active]}</>
);

export const TabPanel: React.FC = ({ children }) => (
  <div className="tabPanel">{children}</div>
);


const supportedComponents: React.ReactNode[] = [TabPanels, TabList];

export const Tabs: React.FC = ({ children }) => {
  const [active, setActive] = useState(0);
  const transformedChildren = Children.map(children, (child) => {
    if (!React.isValidElement<TabListProps | TabPanelsProps>(child)) {
      return child
    }
    if (supportedComponents.includes(child.type)) {
      return cloneElement(child, { active, setActive });
    }
    return child;
  });
  return <div className="tabs">{transformedChildren}</div>;
};
