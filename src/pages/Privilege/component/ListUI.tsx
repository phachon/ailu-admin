import { Popconfirm, Space, Tabs, Button, Card, List, Table, Typography, Empty } from "antd"
import { AndroidOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PrivilegeInfoType, PrivilegeListItemType } from "../../../store/types/privilegeType";
import DynamicIcon from "../../../components/DynamicIcon/DynamicIcon";

interface PrivilegeListUIProps {
  privilegeList: PrivilegeListItemType[]
}

const menuGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
}

// 控制器权限的 UI：List
const PrivilegeItemUI = (itemUIProps: { itemInfos: PrivilegeListItemType[] }) => {
  if (itemUIProps.itemInfos == null) {
    return <Empty></Empty>
  }
  return (
    <List
      size="small"
      dataSource={itemUIProps.itemInfos}
      renderItem={privilegeInfoItem =>
        <List.Item key={privilegeInfoItem.privilege_info.privilege_id.toString()}
          extra={
            <span>
              <a href="#"><EditOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
              <a href="#"><DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
            </span>
          }>{privilegeInfoItem.privilege_info.name}
        </List.Item>
      }
    />
  )
}

// 菜单权限的 UI：Card + List
const PrivilegeMenuUI = (menuUIProps: { menuItem: PrivilegeListItemType }) => {
  if (menuUIProps.menuItem == null) {
    return <Empty></Empty>
  }
  const privilegeInfo = menuUIProps.menuItem.privilege_info
  const controllerInfos = menuUIProps.menuItem.child_privileges
  return (
    <List.Item key={privilegeInfo.privilege_id.toString()}>
      <Card
        size={"small"}
        title={
          <span>
            <DynamicIcon name={privilegeInfo.icon} style={{ marginRight: '6px' }} />
            {privilegeInfo.name}
          </span>
        }
        type="inner"
        bodyStyle={{ padding: 0 }}
        extra={
          <span>
            <a href="#"><EditOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
            <a href="#"><DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
          </span>
        }
      >
        <PrivilegeItemUI itemInfos={controllerInfos} />
      </Card>
    </List.Item>
  )
}

// 整体权限列表 UI
const PrivilegeListUI = (props: PrivilegeListUIProps) => {
  if (props.privilegeList.length == 0) {
    return <Empty></Empty>
  }
  const privilegeList = props.privilegeList
  return (
    <div className="panel-body">
      <Tabs type="card" style={{ marginTop: 10 }}>
        {
          privilegeList?.map((privilegeListItem: PrivilegeListItemType) => (
            <Tabs.TabPane key={privilegeListItem.privilege_info.privilege_id.toString()} tab={
              <span>
                <DynamicIcon name={privilegeListItem.privilege_info.icon} style={{ marginRight: '6px' }} />
                {privilegeListItem.privilege_info.name}
                <a><EditOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
              </span>
            } >
              <List
                grid={menuGrid}
                dataSource={privilegeListItem.child_privileges}
                renderItem={menuInfo => (
                  <PrivilegeMenuUI menuItem={menuInfo} />
                )}
              />
            </Tabs.TabPane>
          ))
        }

      </Tabs>
    </div >
  )
}

export default PrivilegeListUI