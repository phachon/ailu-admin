import { Card, Empty, List, Popconfirm, Tabs, Tree } from 'antd';
import DynamicIcon from '../../../components/DynamicIcon/DynamicIcon';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import { EditOutlined, DeleteOutlined, CaretDownOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/lib/tree';

const menuGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
};

// PrivilegeListTreeUIProps 树形UI
interface PrivilegeListTreeUIProps {
  privilegeList: PrivilegeListItemType[];
  editClickCallback: (privilegeInfo: PrivilegeInfoType) => void;
  deleteClickCallback: (privilegeInfo: PrivilegeInfoType) => void;
}

/**
 * 权限列表 tree UI 组件
 * @param props
 * @returns 组件
 */
const PrivilegeListTreeUI = (props: PrivilegeListTreeUIProps) => {
  const privilegeList = props.privilegeList;
  if (privilegeList.length == 0) {
    return <Empty></Empty>;
  }

  /**
   * 获取 treeData 数据
   * @param privilegeList 权限列表
   * @param listTreeData 菜单树数据
   * @returns treeData 数据
   */
  const getListTreeData = (
    privilegeList: PrivilegeListItemType[],
    listTreeData: DataNode[]
  ): DataNode[] => {
    privilegeList.forEach(privilegeItem => {
      let treeData: DataNode = {
        title: (
          <span>
            {privilegeItem.privilege_info.name}
            <a onClick={() => props.editClickCallback(privilegeItem.privilege_info)}>
              <EditOutlined style={{ marginLeft: 6 }} />
            </a>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => {
                props.deleteClickCallback(privilegeItem.privilege_info);
              }}
              okText="确定"
              cancelText="取消"
            >
              <a href="#!">
                <DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} />
              </a>
            </Popconfirm>
          </span>
        ),
        key:
          String(privilegeItem.privilege_info.parent_id) +
          '-' +
          String(privilegeItem.privilege_info.privilege_id),
        icon: <DynamicIcon name={privilegeItem.privilege_info.icon} />,
        selectable: false,
        children: getListTreeData(privilegeItem.child_privileges, []),
      };
      listTreeData.push(treeData);
    });
    return listTreeData;
  };

  /**
   * 获取 tabs 下的内容
   * @param privilegeListItem
   * @returns
   */
  const getTabsContent = (privilegeListItem: PrivilegeListItemType) => {
    return (
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
                    href="#!"
                    onClick={() => props.editClickCallback(menuPrivilegeItem.privilege_info)}
                  >
                    <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                  </a>
                  <Popconfirm
                    title="确定要删除吗?"
                    onConfirm={() => {
                      props.deleteClickCallback(privilegeListItem.privilege_info);
                    }}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a href="#!">
                      <DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                    </a>
                  </Popconfirm>
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
                treeData={getListTreeData(menuPrivilegeItem.child_privileges, [])}
              />
            </Card>
          </List.Item>
        )}
      />
    );
  };

  /**
   * 获取每个 tab item 信息
   * @param privilegeListItem
   * @returns
   */
  const getTabsItem = (privilegeListItem: PrivilegeListItemType) => {
    return {
      key: privilegeListItem.privilege_info.privilege_id.toString(),
      label: (
        <span>
          <DynamicIcon
            name={privilegeListItem.privilege_info.icon}
            style={{ marginRight: '6px' }}
          />
          {privilegeListItem.privilege_info.name}
          <a onClick={() => props.editClickCallback(privilegeListItem.privilege_info)}>
            <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
          </a>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => {
              props.deleteClickCallback(privilegeListItem.privilege_info);
            }}
            okText="确定"
            cancelText="取消"
          >
            <a href="#!">
              <DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} />
            </a>
          </Popconfirm>
        </span>
      ),
      children: getTabsContent(privilegeListItem),
    };
  };

  return (
    <div className="panel-body">
      <Tabs
        type="card"
        style={{ marginTop: 10 }}
        items={privilegeList.map(privilegeListItem => getTabsItem(privilegeListItem))}
      ></Tabs>
    </div>
  );
};

export default PrivilegeListTreeUI;
