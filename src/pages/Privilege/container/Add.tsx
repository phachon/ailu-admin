import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { PrivilegeService } from '../../../services/Privilege';
import { PrivilegeInfoType, PrivilegeListItemType } from '../../../store/types/privilegeType';
import PrivilegeFormUI from '../component/FormUI';

const PrivilegeAdd: React.FC = () => {
  const [privilegeList, setPrivilegeList] = useState<PrivilegeListItemType[]>([]);

  useEffect(() => {
    getAddPrivilegeInfo();
  }, []);

  /**
   * 获取添加权限需要信息
   */
  const getAddPrivilegeInfo = () => {
    PrivilegeService.getAddPrivilegeInfo().then(privilegeList => {
      setPrivilegeList(privilegeList.list);
    });
  };

  /**
   * 保存权限
   */
  const onFinishCallback = (values: PrivilegeInfoType) => {
    console.log('onFinishCallback', values);
    PrivilegeService.savePrivilege(values)
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
      <PrivilegeFormUI onFinishCallback={onFinishCallback} privilegeList={privilegeList} />
    </div>
  );
};

export default PrivilegeAdd;
