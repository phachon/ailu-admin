import { Button, Popconfirm, Table, TablePaginationConfig } from 'antd';
import { RoleInfoType } from '../../../store/types/roleType';
import { CloseSquareOutlined, FormOutlined } from '@ant-design/icons';

interface RoleListUIProps {
  listLoading: boolean;
  roleList: RoleInfoType[];
  pagination: TablePaginationConfig;
  listChangeCallback: (pageConfig: TablePaginationConfig, filters: any, sorter: any) => void;
  editClickCallback: (roleInfo: RoleInfoType) => void;
  deleteCallback: (roleInfo: RoleInfoType) => void;
}

/**
 * 角色列表 UI 组件
 * @param props
 * @returns
 */
const RoleListUI = (props: RoleListUIProps) => {
  return (
    <div className="panel-body">
      <Table
        rowKey={'role_id'}
        bordered={true}
        dataSource={props.roleList}
        loading={props.listLoading}
        pagination={props.pagination}
        onChange={props.listChangeCallback}
        footer={() => null}
      >
        <Table.Column
          title={'角色ID'}
          dataIndex="role_id"
          width={80}
          key={'role_id'}
          align={'center'}
        />
        <Table.Column title={'角色名'} dataIndex="name" key={'name'} width={250} />
        <Table.Column title={'备注'} dataIndex="remark" key={'remark'} />
        <Table.Column
          title={'修改时间'}
          dataIndex="update_time"
          key={'update_time'}
          width={220}
          align={'center'}
        />
        <Table.Column
          title={'操作'}
          width={160}
          key={'action'}
          align={'center'}
          render={(roleInfo: RoleInfoType) => (
            <div>
              <Button
                className="button-link"
                type="link"
                icon={<FormOutlined />}
                onClick={() => props.editClickCallback(roleInfo)}
              >
                <span className="button-text">修改</span>
              </Button>
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={() => props.deleteCallback(roleInfo)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="link" icon={<CloseSquareOutlined />} className="button-link">
                  <span className="button-text">删除</span>
                </Button>
              </Popconfirm>
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default RoleListUI;
