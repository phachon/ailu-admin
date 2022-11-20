import { Button, Form, Input } from 'antd';
import { EditLayoutForm, LayoutForm } from '../../../config/layout';
import { RoleInfoType } from '../../../store/types/roleType';

interface RoleFormUIProps {
  roleInfo?: RoleInfoType;
  onFinishCallback: (values: any) => void;
  formLayout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
}

/**
 * 角色表单 UI 组件
 * @param props
 * @returns
 */
const RoleFormUI = (props: RoleFormUIProps) => {
  const [form] = Form.useForm();
  const isEdit = props.roleInfo ? true : false;
  let layoutForm = isEdit ? EditLayoutForm : LayoutForm;
  if (props.formLayout) {
    layoutForm = props.formLayout;
  }

  if (props.roleInfo) {
    form.setFieldsValue(props.roleInfo);
  }

  return (
    <div className="panel-body">
      <Form name="basic" {...layoutForm} form={form} onFinish={props.onFinishCallback}>
        {isEdit && (
          <Form.Item label="角色ID" name="role_id" rules={[{ required: true }]}>
            <Input disabled placeholder="请输入角色ID" />
          </Form.Item>
        )}

        <Form.Item
          label="角色名"
          name="name"
          rules={[{ required: true, message: '请输入角色名!' }]}
        >
          <Input placeholder="请输入角色名" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: layoutForm.labelCol.span }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RoleFormUI;
