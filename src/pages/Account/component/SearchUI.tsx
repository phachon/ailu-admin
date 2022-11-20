import { Button, Form, Input, Select } from 'antd';
import { AccountSearchType } from '../../../store/types/accountType';

interface AccountSearchUIProps {
  searchChangeCallback: (values: AccountSearchType) => void;
  searchResetCallback: () => void;
}

/**
 * 账号搜索 UI 组件
 * @param props 账号搜索 UI 组件依赖 props
 * @returns UI 组件
 */
const AccountSearchUI = (props: AccountSearchUIProps) => {
  const [form] = Form.useForm();

  return (
    <div className="panel-body pdr0">
      <Form
        layout={'inline'}
        style={{ justifyContent: 'end' }}
        onFinish={props.searchChangeCallback}
        form={form}
      >
        <Form.Item name="status" label="状态" initialValue={''}>
          <Select>
            <Select.Option value={''}>全部</Select.Option>
            <Select.Option value={'0'}>正常</Select.Option>
            <Select.Option value={'-1'}>禁用</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="account_name" label="账号名" style={{ width: 260 }} initialValue={''}>
          <Input placeholder="请输入账号名" />
        </Form.Item>

        <Form.Item name="given_name" label="昵称" style={{ width: 260 }} initialValue={''}>
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item>
          <Button type="default" htmlType="reset" onClick={props.searchResetCallback}>
            重置
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountSearchUI;
