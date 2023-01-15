import * as icons from '@ant-design/icons';
import React from 'react';
import { CSSProperties } from 'react';

interface DynamicIconProps {
  name: string;
  style?: CSSProperties | undefined;
}

const DynamicIcon = (props: DynamicIconProps) => {
  const { name, style } = props;
  const antIcon: { [key: string]: any } = icons;
  if (antIcon[name] === undefined || antIcon[name] === null) {
    return null;
  }
  return React.createElement(antIcon[name], { style });
};

export default DynamicIcon;
