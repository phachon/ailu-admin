import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  InputNumber,
  Tooltip,
  Typography,
  Space,
  Switch,
  Cascader,
} from 'antd';
import { EditLayoutForm, LayoutForm } from '../../../config/layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { PrivilegeListItemType, PrivilegeInfoType } from '../../../store/types/privilegeType';
import { DefaultOptionType } from 'antd/lib/select';

// icon 列表
const iconList = Object.keys(icons).filter(iconItem => {
  const k = iconItem as keyof typeof icons;
  if (k.indexOf('Outlined') > 0 && typeof icons[k] === 'object') {
    return true;
  }
  return false;
});

/**
 * 过滤控制器类型的权限
 * @param privilegeList 权限列表
 * @return 返回需要的权限列表
 */
const filterControllerType = (privilegeList: PrivilegeListItemType[]): PrivilegeListItemType[] => {
  if (!privilegeList || privilegeList.length === 0) return privilegeList;
  let realPrivilegeList = privilegeList
    .filter(filterItem => {
      if (filterItem.privilege_info.privilege_type !== 3) {
        return true;
      }
      return false;
    })
    .map(privilegeListItem => {
      let privilegeItem = {
        ...privilegeListItem,
        child_privileges: filterControllerType(privilegeListItem.child_privileges),
      };
      return privilegeItem;
    });
  return realPrivilegeList;
};

/**
 * 根据菜单权限下拉框 Options
 * @param privilegeList 权限列表
 * @return Option 下拉数据
 */
const getParentTypeOptions = (
  privilegeList: PrivilegeListItemType[],
  privilegeType: number
): DefaultOptionType[] => {
  const parentOptions: DefaultOptionType[] = [];
  privilegeList.forEach(privilege => {
    let parentOption: DefaultOptionType = {
      label: privilege.privilege_info.name,
      value: String(privilege.privilege_info.privilege_id),
      children: getParentTypeOptions(privilege.child_privileges, privilegeType),
    };
    parentOptions.push(parentOption);
  });
  return parentOptions;
};

/**
 * 获取上级权限 Option 数据
 * @param privilegeType 权限类型
 * @returns
 */
const getParentOptions = (
  privilegeList: PrivilegeListItemType[],
  privilegeType: number
): DefaultOptionType[] => {
  let parentOptions: DefaultOptionType[] = [];
  // 菜单的权限的上级只能是导航或菜单
  if (privilegeType === 2 || privilegeType === 3) {
    const parentPrivileges = filterControllerType(privilegeList);
    parentOptions = getParentTypeOptions(parentPrivileges, privilegeType);
  }
  return parentOptions;
};

// PrivilegeFormUIProps 权限表单UI组件依赖
interface PrivilegeFormUIProps {
  privilegeList: PrivilegeListItemType[];
  onFinishCallback: (values: any) => void;
  privilegeInfo?: PrivilegeInfoType;
  formLayout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
}

/**
 * 权限表单 UI 组件
 * @param props 组件依赖数据
 * @returns 组件
 */
const PrivilegeFormUI = (props: PrivilegeFormUIProps) => {
  const [form] = Form.useForm();
  const isEdit = props.privilegeInfo ? true : false;
  let layoutForm = isEdit ? EditLayoutForm : LayoutForm;
  if (props.formLayout) {
    layoutForm = props.formLayout;
  }
  const privilegeList = props.privilegeList;
  if (props.privilegeInfo) {
    form.setFieldsValue(props.privilegeInfo);
  }

  /**
   * 权限类型点击操作
   * @param privilegeType 权限类型
   */
  const privilegeTypeOnChange = (privilegeType: number) => {
    form.setFieldsValue({
      parent_ids: '',
    });
  };

  return (
    <div className="panel-body">
      <Form {...layoutForm} name="basic" form={form} onFinish={props.onFinishCallback}>
        <Form.Item noStyle label="权限ID" name="privilege_id"></Form.Item>

        <Form.Item
          label="权限名称"
          name="name"
          rules={[{ required: true, message: '请输入权限名称!' }]}
        >
          <Input placeholder="请输入权限名称" />
        </Form.Item>

        <Form.Item
          label="权限类型"
          name="privilege_type"
          rules={[{ required: true }]}
          initialValue={1}
        >
          <Radio.Group>
            <Radio value={1} onChange={() => privilegeTypeOnChange(1)}>
              导航
            </Radio>
            <Radio value={2} onChange={() => privilegeTypeOnChange(2)}>
              菜单
            </Radio>
            <Radio value={3} onChange={() => privilegeTypeOnChange(3)}>
              <Space>
                控制器
                <Tooltip title="有接口操作行为的权限统称为控制器">
                  <Typography.Link>
                    <QuestionCircleOutlined />
                  </Typography.Link>
                </Tooltip>
              </Space>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item dependencies={['privilege_type']} noStyle>
          {({ getFieldValue }) => {
            const privilegeType = getFieldValue('privilege_type');
            if (privilegeType === 1) {
              return null;
            }
            return (
              <Form.Item
                label="上级权限"
                name="parent_ids"
                rules={[{ required: true, message: '请选择上级权限!' }]}
                getValueProps={val => {
                  let value = val ? val.split(',') : [];
                  return { value: value };
                }}
                getValueFromEvent={(values: string[]) => {
                  return values.length > 0 ? values.toString() : '';
                }}
                initialValue=""
              >
                <Cascader
                  key={'Cascader' + privilegeType}
                  options={getParentOptions(privilegeList, privilegeType)}
                  changeOnSelect={privilegeType === 2 ? true : false}
                  allowClear={true}
                  placeholder="请选择上级权限"
                />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item label="页面路由" name="page_router" initialValue={''}>
          <Input placeholder="页面跳转路由：/user/info" />
        </Form.Item>

        <Form.Item label="控制接口" name="api_path" initialValue={''}>
          <Input placeholder="对应后端接口：/user/info" />
        </Form.Item>

        <Form.Item label="Icon图标" name="icon" initialValue={''}>
          <Select placeholder="选择icon图标" showSearch allowClear style={{ width: '100%' }}>
            {iconList.map(iconItem => {
              const k = iconItem as keyof typeof icons;
              return (
                <Select.Option value={iconItem} key={iconItem}>
                  <Icon
                    component={icons[k] as React.ForwardRefExoticComponent<any>}
                    style={{ marginRight: '8px' }}
                  />
                  {iconItem}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="是否外显"
          name="is_display"
          valuePropName="checked"
          initialValue={1}
          getValueProps={value => ({ checked: value === 1 ? true : false })}
          getValueFromEvent={value => {
            return value ? 1 : 0;
          }}
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>

        <Form.Item label="排序数字" name="sequence" initialValue={1}>
          <Space>
            <InputNumber min={1} max={1000} width="200" defaultValue={1} />
            <Tooltip title="1 ~ 1000，数字越小，显示越靠前">
              <Typography.Link>
                <QuestionCircleOutlined />
              </Typography.Link>
            </Tooltip>
          </Space>
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

export default PrivilegeFormUI;
