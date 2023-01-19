import { Breadcrumb, DropdownProps, MenuProps } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { FrameBreadcrumbItem } from '../../../store/types/adminType';

interface FrameBreadcrumbUIProps {
  items: FrameBreadcrumbItem[];
}

const FrameBreadcrumbUI = (props: FrameBreadcrumbUIProps) => {
  return (
    <div className="admin-breadcrumb">
      <div className="admin-breadcrumb-nav">
        <Breadcrumb style={{ margin: '0 4px' }} separator="/">
          {props.items.map(item => (
            <Breadcrumb.Item key={item.key}>
              <Link to={item.link}>{item.name} </Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    </div>
  );
};

export default FrameBreadcrumbUI;
