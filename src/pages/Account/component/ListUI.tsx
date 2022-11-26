import { Button, Popconfirm, Table, TablePaginationConfig, Tag } from 'antd';
import { AccountInfoType } from '../../../store/types/accountType';
import {
  CheckSquareOutlined,
  CloseSquareOutlined,
  FormOutlined,
  SelectOutlined,
} from '@ant-design/icons';

interface AccountListUIProps {
  listLoading: boolean;
  accountList: AccountInfoType[];
  pagination: TablePaginationConfig;
  listChangeCallback: (pageConfig: TablePaginationConfig, filters: any, sorter: any) => void;
  detailClickCallback: (accountInfo: AccountInfoType) => void;
  editClickCallback: (accountInfo: AccountInfoType) => void;
  updateStatusCallback: (accountInfo: AccountInfoType, status: number) => void;
}

const getStatusTag = (status?: number) => {
  if (status === 0) {
    return <Tag color="green">正常</Tag>;
  } else if (status === -1) {
    return <Tag color="error">禁用</Tag>;
  } else {
    return <Tag color="warning">未知</Tag>;
  }
};

const AccountListUI = (props: AccountListUIProps) => {
  return (
    <div className="panel-body">
      <Table
        rowKey={'account_id'}
        bordered={true}
        dataSource={props.accountList}
        loading={props.listLoading}
        pagination={props.pagination}
        onChange={props.listChangeCallback}
        footer={() => ''}
      >
        <Table.Column
          title={'账号ID'}
          dataIndex="account_id"
          width={80}
          key={'account_id'}
          align={'center'}
        />
        <Table.Column title={'账号名'} dataIndex="name" key={'name'} />
        <Table.Column title={'昵称'} dataIndex="given_name" key={'given_name'} />
        <Table.Column title={'电话号'} dataIndex="phone" key={'phone'} />
        <Table.Column title={'手机号'} dataIndex="mobile" key={'mobile'} />
        <Table.Column
          title={'状态'}
          dataIndex="status"
          width={70}
          key={'status'}
          align={'center'}
          render={getStatusTag}
        />
        <Table.Column
          title={'操作'}
          width={200}
          key={'action'}
          align={'center'}
          render={(accountInfo: AccountInfoType) => (
            <span>
              <Button
                className="button-link"
                icon={<SelectOutlined />}
                type="link"
                size="small"
                onClick={() => props.detailClickCallback(accountInfo)}
              >
                <span className="button-text">详情</span>
              </Button>
              <Button
                className="button-link"
                icon={<FormOutlined />}
                type="link"
                size="small"
                onClick={() => props.editClickCallback(accountInfo)}
              >
                <span className="button-text">修改</span>
              </Button>
              {accountInfo.status === 0 && (
                <Popconfirm
                  title="确定要禁用吗?"
                  onConfirm={() => {
                    props.updateStatusCallback(accountInfo, -1);
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    className="button-link"
                    icon={<CloseSquareOutlined />}
                    type="link"
                    size="small"
                  >
                    <span className="button-text">禁用</span>
                  </Button>
                </Popconfirm>
              )}
              {accountInfo.status === -1 && (
                <Popconfirm
                  title="确定要恢复吗?"
                  onConfirm={() => {
                    props.updateStatusCallback(accountInfo, 0);
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <Button
                    className="button-link"
                    icon={<CheckSquareOutlined />}
                    type="link"
                    size="small"
                  >
                    <span className="button-text">恢复</span>
                  </Button>
                </Popconfirm>
              )}
            </span>
          )}
        />
      </Table>
    </div>
  );
};

export default AccountListUI;
