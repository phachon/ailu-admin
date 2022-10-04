import React, { RefObject } from "react";
import { Button, Form, FormInstance, Input, Select, Radio, InputNumber, Tooltip, Typography, Space, RadioChangeEvent, Switch } from "antd";
import { LayoutForm } from "../../../config/layout";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { PrivilegeListItemType } from "../../../store/types/privilegeType";

interface PrivilegeFormUIProps {
  formRef: RefObject<FormInstance>
  onFinishCallback: (values: any) => void
  hiddenRoleIdInput?: boolean
  formLayout?: {
    labelCol: { span: number }
    wrapperCol: { span: number },
  }
  privilegeList?: PrivilegeListItemType[]
}

// icon 列表
const iconList = Object.keys(icons).filter(
  (item) => {
    const k = item as keyof typeof icons;
    if (k.indexOf("Outlined") > 0 && typeof (icons[k]) === "object") {
      return true
    }
  }
)

const PrivilegeFormUI = (props: PrivilegeFormUIProps) => {
  const layoutForm = props.formLayout ? props.formLayout : LayoutForm
  return (
    <div className="panel-body">
      <Form {...layoutForm}
        name="basic"
        ref={props.formRef}
        onFinish={props.onFinishCallback}
      >
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
          initialValue={"nav"}
        >
          <Radio.Group
            name="privilege_type"
          >
            <Radio value={"nav"}>导航</Radio>
            <Radio value={"menu"}>菜单</Radio>
            <Radio value={"controller"}>
              <Space> 控制器
                <Tooltip title="有操作行为的权限统称为控制器">
                  <Typography.Link>
                    <QuestionCircleOutlined />
                  </Typography.Link>
                </Tooltip>
              </Space>
            </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.privilege_type !== currentValues.privilege_type}
        >
          {({ getFieldValue }) =>
            getFieldValue('privilege_type') === 'menu' || getFieldValue('privilege_type') === 'controller' ? (
              <Form.Item
                label="所属导航"
                name="parent_nav_id"
                rules={[
                  {
                    required: true,
                    message: '请选择所属导航!',
                  },
                ]}
              >
                <Select>
                  {
                    props.privilegeList?.map((privilegeListItem) => (
                      <Select.Option value={privilegeListItem.privilege_info.privilege_id}>
                        {privilegeListItem.privilege_info.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={
            (prevValues, currentValues) =>
              prevValues.privilege_type !== currentValues.privilege_type ||
              prevValues.parent_nav_id !== currentValues.parent_nav_id
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('privilege_type') === 'controller' ? (
              <Form.Item
                label="上级菜单"
                name="parent_menu_id"
                rules={[
                  {
                    required: true,
                    message: '请选择上级菜单!',
                  },
                ]}
              // initialValue={3}
              >
                <Select>
                  {
                    props.privilegeList?.map((privilegeListItem) => {
                      if (getFieldValue('parent_nav_id') == privilegeListItem.privilege_info.privilege_id) {
                        return (
                          privilegeListItem.child_privileges?.map((menuPrivilege) => (
                            <Select.Option value={menuPrivilege.privilege_info?.privilege_id}>
                              {menuPrivilege.privilege_info?.name}
                            </Select.Option>
                          ))
                        )
                      }
                    })
                  }
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          label="页面路由"
          name="page_router"
          initialValue={""}
        >
          <Input placeholder="页面跳转路由：/user/info" />
        </Form.Item>

        <Form.Item
          label="控制接口"
          name="api_path"
          initialValue={""}
        >
          <Input placeholder="对应后端接口：/user/info" />
        </Form.Item>

        <Form.Item
          label="Icon图标"
          name="icon"
          initialValue={""}
        >
          <Select
            placeholder="选择icon图标"
            showSearch
            allowClear
            style={{ width: '100%' }}
          >
            {iconList.map(iconItem => {
              const k = iconItem as keyof typeof icons;
              return <Select.Option value={iconItem} key={iconItem}>
                <Icon component={icons[k] as React.ForwardRefExoticComponent<any>} style={{ marginRight: '8px' }} />
                {iconItem}
              </Select.Option>
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

        <Form.Item
          label="排序数字"
          name="sequence"
          initialValue={1}
        >
          <Space>
            <InputNumber min={1} max={1000} width="200" defaultValue={1} />
            <Tooltip title="1 ~ 1000，数字越小，显示越靠前">
              <Typography.Link>
                <QuestionCircleOutlined />
              </Typography.Link>
            </Tooltip>
          </Space>
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: layoutForm.labelCol.span }}
        >
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default PrivilegeFormUI