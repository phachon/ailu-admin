import React from 'react';
import { AccountService } from '../../../services/Account';
import { message } from 'antd';
import AccountFormUI from '../component/FormUI';
import { AccountInfoType } from '../../../store/types/accountType';

const AccountAdd: React.FC = () => {
  /**
   * 添加账号操作
   * @param accountInfo
   */
  const addOnFinishCallback = (accountInfo: AccountInfoType) => {
    AccountService.accountAdd(accountInfo)
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
      <AccountFormUI onFinishCallback={addOnFinishCallback} />
    </div>
  );
};

export default AccountAdd;
