import { Button, Form, Input } from 'antd';

interface RoleSearchUIProps {
  searchChangeCallback: (values: any) => void;
  searchResetCallback: () => void;
}

/**
 * 角色搜索 UI 组件
 * @param props
 * @returns
 */
const RoleSearchUI = (props: RoleSearchUIProps) => {
  const [form] = Form.useForm();
  return (
    <div className="panel-body pdr0">
      <Form
        layout={'inline'}
        style={{ justifyContent: 'end' }}
        onFinish={props.searchChangeCallback}
        form={form}
      >
        <Form.Item name="role_name" label="角色名" style={{ width: 260 }}>
          <Input placeholder="请输入角色名" />
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

export default RoleSearchUI;
