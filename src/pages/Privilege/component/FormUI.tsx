import React, { Fragment, useEffect, useState } from "react";
import {
  Button, Form, FormInstance, Input,
  Select, Radio, InputNumber, Tooltip,
  Typography, Space, Switch
} from "antd";
import { EditLayoutForm, LayoutForm } from "../../../config/layout";
import { QuestionCircleOutlined } from "@ant-design/icons";
import * as icons from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { PrivilegeListItemType } from "../../../store/types/privilegeType";
import { DefaultOptionType } from "antd/lib/select";

interface PrivilegeFormUIProps {
  formInstance: FormInstance<any>
  onFinishCallback: (values: any) => void
  formLayout?: {
    labelCol: { span: number }
    wrapperCol: { span: number },
  }
  isEdit?: boolean
  privilegeList: PrivilegeListItemType[]
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
  let layoutForm = props.isEdit ? EditLayoutForm : LayoutForm
  if (props.formLayout) {
    layoutForm = props.formLayout
  }
  const privilegeList = props.privilegeList

  const privilegeType = Form.useWatch('privilege_type', props.formInstance)
  const [options, setOptions] = useState<DefaultOptionType[]>([])

  useEffect(() => {
    updateParentOptions(privilegeType)
  }, [privilegeType])


  /**
   * 过滤控制器类型的权限
   * @param privilegeList 权限列表
   * @return 返回需要的权限列表
   */
  const filterControllerType = (privilegeList: PrivilegeListItemType[]): PrivilegeListItemType[] => {
    if (!privilegeList || privilegeList.length == 0) return privilegeList;
    let realPrivilegeList = privilegeList.filter(filterItem => {
      if (filterItem.privilege_info.privilege_type !== 3) {
        return true;
      }
    }).map(privilegeListItem => {
      let privilegeItem = {
        ...privilegeListItem,
        child_privileges: filterControllerType(privilegeListItem.child_privileges)
      }
      return privilegeItem;
    })
    return realPrivilegeList;
  }

  /**
   * 根据菜单权限下拉框 Options
   * @param privilegeList 权限列表
   * @return Option 下拉数据
   */
  const getMenuTypeOptions = (privilegeList: PrivilegeListItemType[], parentOptions: DefaultOptionType[], level: number): DefaultOptionType[] => {
    privilegeList.forEach((privilege) => {
      let sep = "-".repeat(level);
      parentOptions.push({
        label: <span>{ sep}{privilege.privilege_info.name}</span>,
        value: Number(privilege.privilege_info.privilege_id),
      })
      if (privilege.child_privileges) {
        getMenuTypeOptions(privilege.child_privileges, parentOptions, level)
      }
    })
    return parentOptions
  }

  /**
   * 根据菜单权限下拉框 Options
   * @param privilegeList 权限列表
   * @return Option 下拉数据
   */
   const getControllerTypeOptions = (privilegeList: PrivilegeListItemType[], parentOptions: DefaultOptionType[], level: number): DefaultOptionType[] => {
    privilegeList.forEach((privilege) => {
      let sep = "-".repeat(level)
      parentOptions.push({
        label: <span>{sep}{ privilege.privilege_info.name}</span>,
        value: Number(privilege.privilege_info.privilege_id),
        disabled: privilege.privilege_info.privilege_type === 1 ? true : false,
      })
      if (privilege.child_privileges) {
        getControllerTypeOptions(privilege.child_privileges, parentOptions, level)
      }
    })
    return parentOptions
  }

  /**
   * 更新上级权限
   * @param privilegeType 权限类型
   * @returns 
   */
  const updateParentOptions = (privilegeType: number) => {
    let parentOptions: DefaultOptionType[] = []
    let defParentId: number = 0
    // 菜单的权限的父级只能是导航或菜单
    if (privilegeType == 2) {
      const parentPrivileges = filterControllerType(privilegeList)
      parentOptions = getMenuTypeOptions(parentPrivileges, parentOptions, 0)
    }
    // 控制器的父级权限只能是菜单
    if (privilegeType == 3) {
      // privilegeList.map(privilege => {
      //   if (privilege.privilege_info.privilege_type == 1) {
      //     parentOptions.push({
      //       label: privilege.privilege_info.name,
      //       value: Number(privilege.privilege_info.privilege_id),
      //       disabled: true
      //     })
      //     privilege.child_privileges?.map(menuPrivilege => {
      //       parentOptions.push({
      //         label: <span>&nbsp;&nbsp;&nbsp;&nbsp;{ menuPrivilege.privilege_info.name}</span>,
      //         value: Number(menuPrivilege.privilege_info.privilege_id)
      //       })
      //       defParentId = defParentId != 0 ? defParentId : Number(menuPrivilege.privilege_info.privilege_id)
      //     })
      //   }
      // })
      const parentPrivileges = filterControllerType(privilegeList)
      parentOptions = getControllerTypeOptions(parentPrivileges, parentOptions, 0)
    }
    setOptions(parentOptions)
    defParentId = parentOptions.length > 0 ? Number(parentOptions[0].value) : Number(0);
    // 需要重置下拉框的默认值
    props.formInstance.setFieldsValue({
      parent_id: defParentId
    })
  }

  return (
    <div className="panel-body">
      <Form {...layoutForm}
        name="basic"
        form={props.formInstance}
        onFinish={props.onFinishCallback}
      >
        <Form.Item noStyle
          label="权限ID"
          name="privilege_id"
        >
        </Form.Item>

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

        {
          privilegeType === 2 || privilegeType === 3 ? (
            <Form.Item
            label="父级权限"
            name="parent_id"
            rules={[
              {
                required: true,
                message: '请选择上级权限!',
              },
            ]}
            >
              <Select options={options}></Select>
            </Form.Item>
          ) : null
        }

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
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            defaultChecked
          />
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
    </div >
  )
}

export default PrivilegeFormUI