import { Descriptions, Tag } from 'antd';
import { AccountDetailInfoType } from '../../../store/types/accountType';

interface AccountDetailUIProps {
  accountDetail?: AccountDetailInfoType;
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

/**
 * 账号详情 UI 组件
 */
const AccountDetailUI = (props: AccountDetailUIProps) => {
  const accountInfo = props.accountDetail?.account_info;
  const accountRoles = props.accountDetail?.account_roles;
  return (
    <div>
      <Descriptions bordered size="small">
        <Descriptions.Item label="账号ID" span={12}>
          {accountInfo?.account_id.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="账号名" span={12}>
          {accountInfo?.name.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="昵称" span={12}>
          {accountInfo?.given_name.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱" span={12}>
          {accountInfo?.email.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="电话" span={12}>
          {accountInfo?.phone.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="手机" span={12}>
          {accountInfo?.mobile.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="角色" span={12}>
          {accountRoles?.map(role => {
            return <Tag color="blue">{role.name}</Tag>;
          })}
        </Descriptions.Item>
        <Descriptions.Item label="状态" span={12}>
          {getStatusTag(accountInfo?.status)}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间" span={12}>
          {accountInfo?.create_time.toString()}
        </Descriptions.Item>
        <Descriptions.Item label="修改时间" span={12}>
          {accountInfo?.update_time.toString()}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default AccountDetailUI;
