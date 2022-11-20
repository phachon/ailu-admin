import React from 'react';
import { message } from 'antd';
import { RoleService } from '../../../services/Role';
import RoleFormUI from '../component/FormUI';

const RoleAdd: React.FC = () => {
  /**
   * 添加操作
   * @param values
   */
  const onFinishCallback = (values: any) => {
    RoleService.roleAdd(values).then(() => {
      message.success('添加成功', 2, () => {
        window.location.href = `/role/list`;
      });
    });
  };

  return (
    <div className="pdt24">
      <RoleFormUI onFinishCallback={onFinishCallback} />
    </div>
  );
};

export default RoleAdd;
