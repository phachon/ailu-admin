import React, { useEffect, useState } from 'react';
import { AccountService } from '../../../services/Account';
import { message } from 'antd';
import AccountFormUI from '../component/FormUI';
import { AccountAddInfoType, AccountInfoType } from '../../../store/types/accountType';
import { RoleInfoType } from '../../../store/types/roleType';

const AccountAdd: React.FC = () => {
  const [roleList, setRoleList] = useState<RoleInfoType[]>([]);

  useEffect(() => {
    getRoleList();
  }, []);

  /**
   * 获取角色列表
   */
  const getRoleList = () => {
    AccountService.getAddAccountInfo()
      .then((accountAddInfo: AccountAddInfoType) => {
        setRoleList(accountAddInfo?.roles);
      })
      .catch(e => {
        console.log('获取添加账号信息 err:', e);
      });
  };

  /**
   * 添加账号保存
   * @param accountInfo
   */
  const addOnFinishCallback = (accountInfo: AccountInfoType) => {
    AccountService.saveAccount(accountInfo)
      .then(() => {
        message.success('保存成功', 2, () => {
          window.location.href = `/account/list`;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
   * 返回组件
   */
  return (
    <div className="pdt24">
      <AccountFormUI roleList={roleList} onFinishCallback={addOnFinishCallback} />
    </div>
  );
};

export default AccountAdd;
