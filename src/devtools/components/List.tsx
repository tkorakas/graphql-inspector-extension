import React, { Children, cloneElement } from "react";

interface ListItemProps {
  isActive?: boolean;
  setActive?: () => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  isActive,
  setActive,
}) => (
  <li onClick={setActive} className={`listItem ${isActive ? "active" : ""}`}>
    {children}
  </li>
);

interface ListProps {
  active: number;
  setActive: (index: number) => void;
}

export const List: React.FC<ListProps> = ({ children, active, setActive }) => {
  const transformedChildren = Children.map(children, (child, index) => {
    if (!React.isValidElement<ListItemProps>(child)) {
      return child
    }
    if (child.type === ListItem) {
      return cloneElement(child, {
        isActive: active === index,
        setActive: () => setActive(index),
      });
    }

    return child;
  });

  return <ul className="list">{transformedChildren}</ul>;
};
