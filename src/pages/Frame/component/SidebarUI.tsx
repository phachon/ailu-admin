import { Layout, Menu, MenuProps } from 'antd';

interface FrameSidebarUIProps {
  menuItems: MenuProps['items'];
  menuClickCallback?: (e: any) => void;
}

const FrameSidebarUI = (props: FrameSidebarUIProps) => {
  return (
    <Layout.Sider
      collapsible
      collapsedWidth="48px"
      width="208px"
      className="admin-sidebar"
      theme="light"
    >
      <Menu
        mode="inline"
        className="admin-sidebar-menu"
        style={{
          height: `${document.body.offsetHeight - 96}px`,
        }}
        items={props.menuItems}
        onClick={props.menuClickCallback}
      />
    </Layout.Sider>
  );
};

export default FrameSidebarUI;
