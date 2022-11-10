import { Card, Empty, List, Tabs, Tree } from 'antd';
import DynamicIcon from '../../../components/DynamicIcon/DynamicIcon';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  DownOutlined,
  LockOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import { DataNode } from 'antd/lib/tree';
import { useEffect, useState } from 'react';

const menuGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
};

// const treeData: DataNode[] = [
//     {
//         title: '个人信息',
//         key: '0-0',
//         icon: <UnorderedListOutlined />,
//         children: [
//             {
//                 title: '个人信息保存',
//                 key: '0-0-0',
//                 switcherIcon: <LockOutlined />
//             }
//       ],
//     },
//     {
//       title: '修改密码',
//       key: '0-1',
//       icon: <UnorderedListOutlined />,
//       children: [
//         { title: '修改密码保存', key: '0-1-0-0', switcherIcon: '' }
//       ],
//     }
//   ];

// PrivilegeListTreeUIProps 树形UI
interface PrivilegeListTreeUIProps {
  privilegeList: PrivilegeListItemType[];
  editClickCallback: (privilegeInfo: PrivilegeInfoType) => void;
}

const PrivilegeListTreeUI = (props: PrivilegeListTreeUIProps) => {
  const privilegeList = props.privilegeList;
  const [treeData, setTreeData] = useState<DataNode[]>([]);

  useEffect(() => {
    const listTreeData = getListTreeData(privilegeList, []);
    console.log(listTreeData);
    setTreeData(listTreeData);
  }, []);

  const getListTreeData = (
    privilegeList: PrivilegeListItemType[],
    listTreeData: DataNode[]
  ): DataNode[] => {
    privilegeList.forEach(privilegeItem => {
      let treeData: DataNode = {
        title: privilegeItem.privilege_info.name,
        key:
          String(privilegeItem.privilege_info.parent_id) +
          '-' +
          String(privilegeItem.privilege_info.privilege_id),
        icon: <DynamicIcon name={privilegeItem.privilege_info.icon} />,
        children: getListTreeData(privilegeItem.child_privileges, []),
      };
      listTreeData.push(treeData);
    });
    return listTreeData;
  };

  if (privilegeList.length == 0) {
    return <Empty></Empty>;
  }
  return (
    <div className="panel-body">
      <Tabs type="card" style={{ marginTop: 10 }}>
        {privilegeList?.map((privilegeListItem: PrivilegeListItemType) => (
          <Tabs.TabPane
            key={privilegeListItem.privilege_info.privilege_id.toString()}
            tab={
              <span>
                <DynamicIcon
                  name={privilegeListItem.privilege_info.icon}
                  style={{ marginRight: '6px' }}
                />
                {privilegeListItem.privilege_info.name}
                <a onClick={() => props.editClickCallback(privilegeListItem.privilege_info)}>
                  <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                </a>
              </span>
            }
          >
            <List
              grid={menuGrid}
              dataSource={privilegeListItem.child_privileges}
              renderItem={menuPrivilegeItem => (
                <List.Item key={menuPrivilegeItem.privilege_info?.privilege_id.toString()}>
                  <Card
                    size={'small'}
                    title={
                      <span>
                        <DynamicIcon
                          name={menuPrivilegeItem.privilege_info?.icon}
                          style={{ marginRight: '6px' }}
                        />
                        {menuPrivilegeItem.privilege_info?.name}
                      </span>
                    }
                    type="inner"
                    bodyStyle={{ padding: 0 }}
                    extra={
                      <span>
                        <a
                          onClick={() => props.editClickCallback(menuPrivilegeItem.privilege_info)}
                        >
                          <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                        </a>
                        <a href="#">
                          <DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                        </a>
                      </span>
                    }
                  >
                    <Tree
                      autoExpandParent
                      showIcon
                      showLine={{ showLeafIcon: false }}
                      switcherIcon={<CaretDownOutlined />}
                      rootStyle={{ padding: 8 }}
                      checkStrictly={true}
                      defaultExpandAll={true}
                      // onExpand={onExpand}
                      // expandedKeys={expandedKeys}
                      // autoExpandParent={autoExpandParent}
                      // onCheck={onCheck}
                      // checkedKeys={checkedKeys}
                      // onSelect={onSelect}
                      // selectedKeys={selectedKeys}
                      treeData={getListTreeData(menuPrivilegeItem.child_privileges, [])}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default PrivilegeListTreeUI;
