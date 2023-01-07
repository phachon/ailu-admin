import { Tag } from 'antd';
import { CSSProperties } from 'react';
import {
  RoleInfoType,
  RoleTypeAccountDefaultRole,
  RoleTypeCustomRole,
} from '../../../store/types/roleType';

/**
 * 角色类型标签UI组件
 * @param roleType
 * @returns
 */
export const RoleTypeTagUI = (roleType: number) => {
  switch (roleType) {
    case RoleTypeCustomRole:
      return <Tag color="blue">自定义</Tag>;
    case RoleTypeAccountDefaultRole:
      return <Tag color="red">默认</Tag>;
    default:
      return <Tag color="cyan">未知</Tag>;
  }
};

/**
 * 选择角色外显UI组件
 * @param roleInfo 角色信息
 * @returns
 */
export const SelectRoleLabelUI = (roleInfo: RoleInfoType, style?: CSSProperties | undefined) => {
  switch (roleInfo.role_type) {
    case RoleTypeCustomRole:
      return '自定义：' + roleInfo.name;
    case RoleTypeAccountDefaultRole:
      return '默认：' + roleInfo.name;
    default:
      return '未知：' + roleInfo.name;
  }
};
