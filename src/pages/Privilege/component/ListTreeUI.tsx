import { Card, Empty, List, Tabs, Tree } from "antd";
import DynamicIcon from "../../../components/DynamicIcon/DynamicIcon";
import { PrivilegeInfoType, PrivilegeListItemType } from "../../../store/types/privilegeType";
import {
    EditOutlined, DeleteOutlined,
    UnorderedListOutlined,
    DownOutlined,
    LockOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import { DataNode } from "antd/lib/tree";
import { icons } from "antd/lib/image/PreviewGroup";

const menuGrid = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 6,
    xxl: 4,
}

const treeData: DataNode[] = [
    {
        title: '个人信息',
        key: '0-0',
        icon: <UnorderedListOutlined />,
        children: [
            {
                title: '个人信息保存',
                key: '0-0-0',
                switcherIcon: <LockOutlined />
            }
      ],
    },
    {
      title: '修改密码',
      key: '0-1',
      icon: <UnorderedListOutlined />,
      children: [
        { title: '修改密码保存', key: '0-1-0-0', switcherIcon: '' }
      ],
    }
  ];

// PrivilegeListTreeUIProps 树形UI
interface PrivilegeListTreeUIProps {
    privilegeList: PrivilegeListItemType[]
    editClickCallback: (privilegeInfo: PrivilegeInfoType) => void
}

const PrivilegeListTreeUI = (props: PrivilegeListTreeUIProps) => {
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
                    <a onClick={() => props.editClickCallback(privilegeListItem.privilege_info)}>
                      <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                    </a>
                  </span>
                } >
                  <List
                    grid={menuGrid}
                    dataSource={privilegeListItem.child_privileges}
                    renderItem={menuPrivilegeItem => (
                      <List.Item key={menuPrivilegeItem.privilege_info?.privilege_id.toString()}>
                        <Card
                          size={"small"}
                          title={
                            <span>
                              <DynamicIcon name={menuPrivilegeItem.privilege_info?.icon} style={{ marginRight: '6px' }} />
                              {menuPrivilegeItem.privilege_info?.name}
                            </span>
                          }
                          type="inner"
                          bodyStyle={{ padding: 0 }}
                          extra={
                            <span>
                              <a onClick={() => props.editClickCallback(menuPrivilegeItem.privilege_info)}>
                                <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                              </a>
                              <a href="#"><DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} /></a>
                            </span>
                          }
                        >
                         <Tree
                            checkable
                            autoExpandParent
                            showIcon
                            showLine
                            switcherIcon={<CaretDownOutlined />}
                            rootStyle={{padding: 8}}
                            // onExpand={onExpand}
                            // expandedKeys={expandedKeys}
                            // autoExpandParent={autoExpandParent}
                            // onCheck={onCheck}
                            // checkedKeys={checkedKeys}
                            // onSelect={onSelect}
                            // selectedKeys={selectedKeys}
                            treeData={treeData}
                        />
                        </Card>
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>
              ))
            }
          </Tabs>
        </div >
      )
}

export default PrivilegeListTreeUI;