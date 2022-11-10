import { Form, message } from 'antd';
import React, { Component, RefObject, useEffect, useState } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import PrivilegeFormUI from '../component/FormUI';

const PrivilegeAdd: React.FC = () => {
  const [form] = Form.useForm();

  const [privilegeList, setPrivilegeList] = useState<PrivilegeListItemType[]>([]);

  useEffect(() => {
    getPrivilegeList();
  }, []);

  /**
   * 获取权限列表
   */
  const getPrivilegeList = () => {
    PrivilegeService.privilegeList().then(privilegeList => {
      setPrivilegeList(privilegeList.list);
    });
  };

  /**
   * 保存权限
   */
  const onFinishCallback = (values: PrivilegeInfoType) => {
    console.log('onFinishCallback', values);
    PrivilegeService.privilegeAdd(values)
      .then(() => {
        message.success('保存成功', 2, () => {
          window.location.href = `/privilege/list`;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="pdt24">
      <PrivilegeFormUI
        formInstance={form}
        onFinishCallback={onFinishCallback}
        privilegeList={privilegeList}
      />
    </div>
  );
};

export default PrivilegeAdd;
