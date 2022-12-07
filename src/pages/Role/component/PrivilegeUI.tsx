import { Card, Checkbox, Empty, List, Tabs, Tree } from 'antd';
import DynamicIcon from '../../../components/DynamicIcon/DynamicIcon';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import { CaretDownOutlined } from '@ant-design/icons';
import { DataNode } from 'antd/lib/tree';
import { useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const menuGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
};

// PrivilegeUIProps
interface PrivilegeUIProps {
  privilegeList: PrivilegeListItemType[];
  onFinishCallback: (values: any) => void;
}

/**
 * 获取 treeData 的key
 * @param privilegeInfo
 * @returns
 */
const getTreeDataKey = (privilegeInfo: PrivilegeInfoType): string => {
  // const parentIds = privilegeInfo.parent_ids != '' ? privilegeInfo.parent_ids : '0';
  // return parentIds.replaceAll(',', '-') + '-' + String(privilegeInfo.privilege_id);
  return privilegeInfo.privilege_id.toString();
};

/**
 * 获取 treeData 数据
 * @param privilegeList 权限列表
 * @returns treeData 数据
 */
const getListTreeData = (privilegeList: PrivilegeListItemType[]): DataNode[] => {
  let listTreeData: DataNode[] = [];
  privilegeList.forEach(privilegeItem => {
    let treeData: DataNode = {
      title: <span>{privilegeItem.privilege_info.name}</span>,
      key: getTreeDataKey(privilegeItem.privilege_info),
      icon: <DynamicIcon name={privilegeItem.privilege_info.icon} />,
      // selectable: false,
      children: getListTreeData(privilegeItem.child_privileges),
    };
    listTreeData.push(treeData);
  });
  // console.log(listTreeData);
  return listTreeData;
};

/**
 * 获取多个权限的 keys
 * @param privilegeList
 * @returns
 */
const getTreeDataKeys = (privilegeList: PrivilegeListItemType[]): React.Key[] => {
  let keys: React.Key[] = [];
  if (privilegeList.length == 0) {
    return keys;
  }
  privilegeList.forEach(privilegeItem => {
    keys.push(getTreeDataKey(privilegeItem.privilege_info));
    let childKeys = getTreeDataKeys(privilegeItem.child_privileges);
    keys.push(...childKeys);
  });
  return keys;
};

/**
 * 权限列表 UI 组件
 * @param props
 * @returns 组件
 */
const PrivilegeUI = (props: PrivilegeUIProps) => {
  const [menuTreeCheckedKeys, setMenuTreeCheckedKeys] = useState<React.Key[]>([]);

  const privilegeList = props.privilegeList;
  if (privilegeList.length == 0) {
    return <Empty></Empty>;
  }

  /**
   * 菜单树点击回调
   * @param checkedKeysValue
   * @param info
   */
  const menuTreeOnCheckCallback = (checkedKeysValue: React.Key[] | any, info: any) => {
    // todo
  };

  /**
   * 一级菜单选择回调
   * @param menuPrivilegeItem
   * @param e
   */
  const menuCheckOnChange = (menuPrivilegeItem: PrivilegeListItemType, e: CheckboxChangeEvent) => {
    // todo
  };

  /**
   * 导航选择回调
   * @param navPrivilegeItem
   * @param e
   */
  const navCheckOnChange = (navPrivilegeItem: PrivilegeListItemType, e: CheckboxChangeEvent) => {
    // todo
  };

  return (
    <Tabs type="card">
      {privilegeList?.map((privilegeListItem: PrivilegeListItemType) => (
        <Tabs.TabPane
          key={privilegeListItem.privilege_info.privilege_id.toString()}
          tab={
            <span>
              <Checkbox onChange={e => navCheckOnChange(privilegeListItem, e)}>
                <DynamicIcon
                  name={privilegeListItem.privilege_info.icon}
                  style={{ marginRight: '6px' }}
                />
                {privilegeListItem.privilege_info.name}
              </Checkbox>
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
                      <Checkbox onChange={e => menuCheckOnChange(menuPrivilegeItem, e)}>
                        <DynamicIcon
                          name={menuPrivilegeItem.privilege_info?.icon}
                          style={{ marginRight: '6px' }}
                        />
                        {menuPrivilegeItem.privilege_info?.name}
                      </Checkbox>
                    </span>
                  }
                  type="inner"
                  bodyStyle={{ padding: 0 }}
                >
                  <Tree
                    key={menuPrivilegeItem.privilege_info.privilege_id.toString()}
                    checkable
                    autoExpandParent
                    showIcon
                    showLine={{ showLeafIcon: false }}
                    switcherIcon={<CaretDownOutlined />}
                    rootStyle={{ padding: 8 }}
                    treeData={getListTreeData(menuPrivilegeItem.child_privileges)}
                    onCheck={menuTreeOnCheckCallback}
                    checkedKeys={menuTreeCheckedKeys}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default PrivilegeUI;
