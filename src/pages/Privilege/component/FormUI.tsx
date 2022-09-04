import React, { RefObject } from "react";
import { Button, Form, FormInstance, Input, Select, Radio, InputNumber, Tooltip, Typography, Space, RadioChangeEvent } from "antd";
import { LayoutForm } from "../../../config/layout";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'

interface PrivilegeFormUIProps {
  formRef: RefObject<FormInstance>
  onFinishCallback: (values: any) => void
  hiddenRoleIdInput?: boolean
  formLayout?: {
    labelCol: { span: number }
    wrapperCol: { span: number },
  }
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
  const navSelect = true
  const menuSeelct = true
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
        >
          <Radio.Group
            name="privilege_type"
            defaultValue={"nav"}
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
                name="given_name"
                rules={[
                  {
                    required: true,
                    message: '请选择所属导航!',
                  },
                ]}
                initialValue={"system"}
              >
                <Select>
                  <Select.Option value={"system"}>系统</Select.Option>
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.privilege_type !== currentValues.privilege_type}
        >
          {({ getFieldValue }) =>
            getFieldValue('privilege_type') === 'controller' ? (
              <Form.Item
                label="上级菜单"
                name="given_name"
                rules={[
                  {
                    required: true,
                    message: '请选择上级菜单!',
                  },
                ]}
                initialValue={"system"}
              >
                <Select>
                  <Select.Option value={"system"}>用户管理</Select.Option>
                </Select>
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          label="路由Path"
          name="router_path"
        >
          <Input placeholder="页面跳转路由：/user/info" />
        </Form.Item>

        <Form.Item
          label="接口Path"
          name="api_path"
        >
          <Input placeholder="对应后端接口：/user/info" />
        </Form.Item>

        <Form.Item
          label="Icon图标"
          name="icon"
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
          label="排序数字"
          name="weight"
          initialValue="1"
        >
          <Space>
            <InputNumber min={1} max={1000} width="200" />
            <Tooltip title="数字越小，显示越靠前">
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