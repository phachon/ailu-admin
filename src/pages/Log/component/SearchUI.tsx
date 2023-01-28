import { Button, Form, Input, Select } from 'antd';
import { LogKeywords } from '../../../store/types/logType';

interface LogSearchUIProps {
  searchChangeCallback: (values: LogKeywords) => void;
  searchResetCallback: () => void;
}

/**
 * 日志搜索 UI 组件
 * @param props
 * @returns
 */
const LogSearchUI = (props: LogSearchUIProps) => {
  const [form] = Form.useForm();
  return (
    <div className="panel-body pdr0">
      <Form
        layout={'inline'}
        style={{ justifyContent: 'end' }}
        onFinish={props.searchChangeCallback}
        form={form}
      >
        <Form.Item name="level" label="级别" initialValue={0}>
          <Select>
            <Select.Option value={0}>全部</Select.Option>
            <Select.Option value={1}>Trace</Select.Option>
            <Select.Option value={2}>Debug</Select.Option>
            <Select.Option value={3}>Info</Select.Option>
            <Select.Option value={4}>Warn</Select.Option>
            <Select.Option value={5}>Error</Select.Option>
            <Select.Option value={6}>Fatal</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="account_id"
          label="账号ID"
          rules={[
            {
              type: 'integer',
              transform: value => {
                return value ? Number(value) : 0;
              },
            },
          ]}
        >
          <Input placeholder="请输入账号ID" />
        </Form.Item>

        <Form.Item name="message" label="日志内容" style={{ width: 300 }}>
          <Input placeholder="请输入日志内容" />
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

export default LogSearchUI;
