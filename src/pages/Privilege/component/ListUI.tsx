import { Popconfirm, Space, Tabs, Button, Card, List, Table, Typography, Empty } from 'antd';
import { AndroidOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import DynamicIcon from '../../../components/DynamicIcon/DynamicIcon';

interface PrivilegeListUIProps {
  privilegeList: PrivilegeListItemType[];
  editClickCallback: (privilegeInfo: PrivilegeInfoType) => void;
}

const menuGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 6,
  xxl: 4,
};

const PrivilegeListUI = (props: PrivilegeListUIProps) => {
  if (props.privilegeList.length == 0) {
    return <Empty></Empty>;
  }
  const privilegeList = props.privilegeList;
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
                    <List
                      size="small"
                      dataSource={menuPrivilegeItem.child_privileges}
                      renderItem={privilegeInfoItem => (
                        <List.Item
                          key={privilegeInfoItem.privilege_info.privilege_id.toString()}
                          extra={
                            <span>
                              <a
                                onClick={() =>
                                  props.editClickCallback(privilegeInfoItem.privilege_info)
                                }
                              >
                                <EditOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                              </a>
                              <a href="#">
                                <DeleteOutlined style={{ marginLeft: 6, marginRight: 0 }} />
                              </a>
                            </span>
                          }
                        >
                          {privilegeInfoItem.privilege_info.name}
                        </List.Item>
                      )}
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

export default PrivilegeListUI;
