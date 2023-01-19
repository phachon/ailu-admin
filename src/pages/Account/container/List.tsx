import React, { useEffect, useState } from 'react';
import AccountListUI from '../component/ListUI';
import {
  AccountDetailInfoType,
  AccountEditInfoType,
  AccountInfoType,
  AccountListType,
} from '../../../store/types/accountType';
import { AccountService } from '../../../services/Account';
import { message, Modal, TablePaginationConfig } from 'antd';
import AccountSearchUI from '../component/SearchUI';
import AccountFormUI from '../component/FormUI';
import { initPagination } from '../../../store/states/adminState';
import { RoleInfoType } from '../../../store/types/roleType';
import AccountDetailUI from '../component/DetailUI';

let searchValues = {};

const AccountList: React.FC = () => {
  const [accountList, setAccountList] = useState<AccountInfoType[]>([]);
  const [pagination, setPagination] = useState(initPagination);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editAccountInfo, setEditAccountInfo] = useState<AccountInfoType>();
  const [detailAccountInfo, setDetailAccountInfo] = useState<AccountDetailInfoType>();
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [roleList, setRoleList] = useState<RoleInfoType[]>([]);

  useEffect(() => {
    getAccountList(initPagination, {});
  }, []);

  /**
   * 请求账号列表
   * @param pageConfig 翻页信息
   * @param searchKeywords 搜索信息
   */
  const getAccountList = (pageConfig: TablePaginationConfig, searchKeywords: {}) => {
    searchValues = searchKeywords;
    AccountService.accountList(pageConfig.pageSize, pageConfig.current, searchKeywords)
      .then((res: AccountListType) => {
        setAccountList(res.list);
        setPagination({
          ...initPagination,
          current: res.page_info?.page_num,
          pageSize: res.page_info?.page_size,
          total: res.page_info?.total_num,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
   * 搜索查询操作
   * @param values 搜索表单数据
   */
  const searchChangeCallback = (values: {}) => {
    getAccountList(initPagination, values);
  };

  /**
   * 搜索重置操作
   */
  const searchResetCallback = () => {
    getAccountList(initPagination, {});
  };

  /**
   * 列表分页请求
   * @param pageConfig
   * @param filters
   * @param sorter
   */
  const listChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
    getAccountList(pageConfig, searchValues);
  };

  /**
   * 修改点击操作
   * @param accountInfo 账号信息
   */
  const editClickCallback = (accountInfo: AccountInfoType) => {
    // 获取修改账号需要的信息
    AccountService.getEditAccountInfo(accountInfo.account_id)
      .then((editAccountInfo: AccountEditInfoType) => {
        const roleIds: string[] = [];
        editAccountInfo.account_roles.forEach((accountRole: RoleInfoType) => {
          roleIds.push(String(accountRole.role_id));
        });
        editAccountInfo.account_info.role_ids = '';
        if (roleIds.length > 0 && editAccountInfo.account_info) {
          editAccountInfo.account_info.role_ids = roleIds.toString();
        }
        setEditAccountInfo(editAccountInfo.account_info);
        setRoleList(editAccountInfo.role_list);
        setEditModalOpen(true);
      })
      .catch(e => {
        console.log('修改失败err:', e);
      });
  };

  /**
   * 详情点击操作
   * @param accountInfo 账号信息
   */
  const detailClickCallback = (accountInfo: AccountInfoType) => {
    // 获取账号详情信息
    AccountService.getAccountDetail(accountInfo.account_id)
      .then((accountDetailInfo: AccountDetailInfoType) => {
        setDetailAccountInfo(accountDetailInfo);
        setDetailModalOpen(true);
      })
      .catch(e => {
        console.log('修改失败err:', e);
      });
  };

  /**
   * 更新账号状态操作
   * @param accountInfo
   * @param status
   */
  const updateStatusCallback = (accountInfo: AccountInfoType, status: number) => {
    AccountService.updateAccountStatus(accountInfo.account_id, status)
      .then(() => {
        message.success('操作成功', 2, () => {
          getAccountList(pagination, searchValues);
        });
      })
      .catch(() => {
        message.error('操作失败', 2);
      });
  };

  /**
   * 修改弹框取消操作
   */
  const editModalCancelCallback = () => {
    setEditModalOpen(false);
  };

  /**
   * 修改完成操作
   * @param accountInfo AccountInfoType
   */
  const editOnFinishCallback = (accountInfo: AccountInfoType) => {
    AccountService.modifyAccount(accountInfo)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalOpen(false);
          getAccountList(pagination, searchValues);
        });
      })
      .catch(e => {
        console.log(e);
        message.error('修改失败', 2);
      });
  };

  return (
    <div className="panel">
      <AccountSearchUI
        searchChangeCallback={searchChangeCallback}
        searchResetCallback={searchResetCallback}
      />
      <AccountListUI
        listLoading={false}
        accountList={accountList}
        pagination={pagination}
        listChangeCallback={listChangeCallback}
        editClickCallback={editClickCallback}
        updateStatusCallback={updateStatusCallback}
        detailClickCallback={detailClickCallback}
      />
      <Modal
        title="账号修改"
        width={570}
        open={editModalOpen}
        onCancel={editModalCancelCallback}
        footer={null}
      >
        <AccountFormUI
          roleList={roleList}
          accountInfo={editAccountInfo}
          onFinishCallback={editOnFinishCallback}
        />
      </Modal>
      <Modal
        title="账号详情"
        width={570}
        open={detailModalOpen}
        onCancel={() => {
          setDetailModalOpen(false);
        }}
        footer={null}
      >
        <AccountDetailUI
          accountDetail={detailAccountInfo}
          key={detailAccountInfo?.account_info.account_id.toString()}
        />
      </Modal>
    </div>
  );
};

export default AccountList;
