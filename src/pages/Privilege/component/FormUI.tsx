import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormInstance,
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
import { PrivilegeListItemType } from '../../../store/types/privilegeType';
import { DefaultOptionType } from 'antd/lib/select';

// icon 列表
const iconList = Object.keys(icons).filter(iconItem => {
  const k = iconItem as keyof typeof icons;
  if (k.indexOf('Outlined') > 0 && typeof icons[k] === 'object') {
    return true;
  }
});

/**
 * 过滤控制器类型的权限
 * @param privilegeList 权限列表
 * @return 返回需要的权限列表
 */
const filterControllerType = (privilegeList: PrivilegeListItemType[]): PrivilegeListItemType[] => {
  if (!privilegeList || privilegeList.length == 0) return privilegeList;
  let realPrivilegeList = privilegeList
    .filter(filterItem => {
      if (filterItem.privilege_info.privilege_type !== 3) {
        return true;
      }
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
  parentOptions: DefaultOptionType[],
  privilegeType: number
): DefaultOptionType[] => {
  privilegeList.forEach(privilege => {
    let parentOption: DefaultOptionType = {
      label: privilege.privilege_info.name,
      value: Number(privilege.privilege_info.privilege_id),
      children: getParentTypeOptions(privilege.child_privileges, [], privilegeType),
    };
    if (privilegeType == 3) {
      // parentOption.disabled = privilege.privilege_info.privilege_type === 1 ? true : false;
    }
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
  if (privilegeType == 2 || privilegeType == 3) {
    const parentPrivileges = filterControllerType(privilegeList);
    parentOptions = getParentTypeOptions(parentPrivileges, parentOptions, privilegeType);
  }
  return parentOptions;
};

/**
 * 下拉框选择后回调
 * @param value 选择的值
 * @param selectedOptions
 */
const selectOnChange = (value: any, selectedOptions: any) => {
  // return value[value.length - 1];
  console.log(value);
};

// PrivilegeFormUIProps 权限表单UI组件依赖
interface PrivilegeFormUIProps {
  formInstance: FormInstance<any>;
  onFinishCallback: (values: any) => void;
  formLayout?: {
    labelCol: { span: number };
    wrapperCol: { span: number };
  };
  isEdit?: boolean;
  privilegeList: PrivilegeListItemType[];
}

/**
 * 权限表单 UI 组件
 * @param props 组件依赖数据
 * @returns 组件
 */
const PrivilegeFormUI = (props: PrivilegeFormUIProps) => {
  let layoutForm = props.isEdit ? EditLayoutForm : LayoutForm;
  if (props.formLayout) {
    layoutForm = props.formLayout;
  }

  const privilegeList = props.privilegeList;
  const privilegeType = Form.useWatch('privilege_type', props.formInstance);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [optionChangeSelect, setOptionChangeSelect] = useState<boolean>(false);

  useEffect(() => {
    const parentOptions = getParentOptions(privilegeList, privilegeType);
    setOptions(parentOptions);
    if (privilegeType === 2) {
      setOptionChangeSelect(true); // 菜单的上级可以选择导航和菜单
    } else {
      setOptionChangeSelect(false); // 控制器的上级只能选择菜单
    }
    // 需要重置下拉框的默认值
    props.formInstance.setFieldsValue({
      parent_ids: [],
    });
    console.log('useEffect:', privilegeType, parentOptions);
  }, [privilegeType]);

  return (
    <div className="panel-body">
      <Form
        {...layoutForm}
        name="basic"
        form={props.formInstance}
        onFinish={props.onFinishCallback}
      >
        <Form.Item noStyle label="权限ID" name="privilege_id"></Form.Item>

        <Form.Item
          label="权限名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入权限名称!',
            },
          ]}
        >
          <Input placeholder="请输入权限名称" />
        </Form.Item>

        <Form.Item
          label="权限类型"
          name="privilege_type"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={1}
        >
          <Radio.Group name="privilege_type">
            <Radio value={1}>导航</Radio>
            <Radio value={2}>菜单</Radio>
            <Radio value={3}>
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

        {privilegeType === 2 || privilegeType === 3 ? (
          <Form.Item
            label="上级权限"
            name="parent_ids"
            rules={[
              {
                required: true,
                message: '请选择上级权限!',
              },
            ]}
          >
            <Cascader
              options={options}
              changeOnSelect={optionChangeSelect}
              onChange={selectOnChange}
              allowClear={true}
              placeholder="请选择上级权限"
            />
          </Form.Item>
        ) : null}

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
          name="display_switch"
          valuePropName="checked"
          initialValue={true}
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
