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
const RoleTypeTagUI = (roleType: number) => {
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
 * 角色名标签UI组件
 * @param roleInfo 角色信息
 * @returns
 */
const RoleNameTagUI = (roleInfo: RoleInfoType, style?: CSSProperties | undefined) => {
  switch (roleInfo.role_type) {
    case RoleTypeCustomRole:
      return (
        <Tag color="blue" style={style}>
          {roleInfo.name}
        </Tag>
      );
    case RoleTypeAccountDefaultRole:
      return (
        <Tag color="red" style={style}>
          {roleInfo.name}
        </Tag>
      );
    default:
      return (
        <Tag color="cyan" style={style}>
          {roleInfo.name}
        </Tag>
      );
  }
};

export default {
  RoleTypeTagUI,
  RoleNameTagUI,
};
