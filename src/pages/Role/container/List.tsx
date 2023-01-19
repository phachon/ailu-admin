import React, { useEffect, useState } from 'react';
import { initPagination } from '../../../store/states/adminState';
import { RoleEditInfoType, RoleInfoType, RoleListType } from '../../../store/types/roleType';
import { RoleService } from '../../../services/Role';
import { message, Modal, TablePaginationConfig } from 'antd';
import RoleListUI from '../component/ListUI';
import RoleSearchUI from '../component/SearchUI';
import RoleFormUI from '../component/FormUI';
import AccountListUI from '../component/AccountListUI';
import { AccountInfoType, AccountListType } from '../../../store/types/accountType';
import PrivilegeUI from '../component/PrivilegeUI';
import { PrivilegeListItemType } from '../../../store/types/privilegeType';
import { arrayToString } from '../../../utils/utils';

let searchKeyWords = {};
let accountListRoleInfo: RoleInfoType; // 账号列表角色信息

const RoleList: React.FC = () => {
  // 角色列表相关 state
  const [roleList, setRoleList] = useState<RoleInfoType[]>([]);
  const [pagination, setPagination] = useState(initPagination);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  // 角色修改相关 state
  const [editRoleInfo, setEditRoleInfo] = useState<RoleInfoType>();
  // 角色账号相关 state
  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false);
  const [roleAccountList, setRoleAccountList] = useState<AccountInfoType[]>([]);
  const [accountPagination, setAccountPagination] = useState(initPagination);
  // 角色权限相关 state
  const [privilegeModalOpen, setPrivilegeModalOpen] = useState<boolean>(false);
  const [rolePrivilegIds, setRolePrivilegeIds] = useState<string[]>([]);
  const [allPrivileges, setAllPrivileges] = useState<PrivilegeListItemType[]>([]);

  useEffect(() => {
    getRoleList(initPagination, {});
  }, []);

  /**
   * 列表分页处理
   * @param pageConfig
   * @param filters
   * @param sorter
   */
  const roleListChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
    getRoleList(pageConfig, searchKeyWords);
  };

  /**
   * 修改点击操作
   * @param roleInfo
   */
  const editClickCallback = (roleInfo: RoleInfoType) => {
    RoleService.getEditRoleInfo(roleInfo.role_id)
      .then((editRoleInfo: RoleEditInfoType) => {
        setEditRoleInfo(editRoleInfo.role_info);
        setEditModalOpen(true);
      })
      .catch(e => {
        console.log('修改角色 err:', e);
      });
  };

  /**
   * 账号列表点击操作
   * @param roleInfo 角色信息
   */
  const accountListClickCallback = (roleInfo: RoleInfoType) => {
    accountListRoleInfo = roleInfo;
    getRoleAccountList(initPagination, roleInfo.role_id);
  };

  /**
   * 账号列表翻页操作
   */
  const accountListChangeCallback = (
    pageConfig: TablePaginationConfig,
    filters: any,
    sorter: any
  ) => {
    getRoleAccountList(pageConfig, accountListRoleInfo?.role_id);
  };

  /**
   * 账号移除操作
   * @param accountInfo 账号信息
   */
  const accountRemoveChangeCallback = (accountInfo: AccountInfoType) => {
    RoleService.removeRoleAccount(accountListRoleInfo?.role_id, accountInfo.account_id)
      .then(() => {
        message.success('移除成功', 2, () => {
          getRoleAccountList(accountPagination, accountListRoleInfo?.role_id);
        });
      })
      .catch(e => {
        console.log('移除账号失败：', e);
      });
  };

  /**
   * 权限列表点击操作
   * @param roleInfo 角色信息
   */
  const privilegeEditClickCallback = (roleInfo: RoleInfoType) => {
    RoleService.getPrivilegeEdit(roleInfo.role_id)
      .then(privilegeList => {
        setEditRoleInfo(roleInfo);
        setAllPrivileges(privilegeList.all_privilege);
        setRolePrivilegeIds(arrayToString(privilegeList.privilege_ids));
        setPrivilegeModalOpen(true);
      })
      .catch(e => {
        console.log('获取角色权限列表err:', e);
      });
  };

  /**
   * 角色权限修改保存
   * @param privilegeIds 权限列表
   * @returns
   */
  const privilegeModifyFinishCallback = (privilegeIds?: string[]) => {
    // 修改保存角色权限
    RoleService.modifyRolePrivilege(editRoleInfo?.role_id, privilegeIds)
      .then(() => {
        message.success('保存成功', 2, () => {
          setPrivilegeModalOpen(false);
          getRoleList(pagination, searchKeyWords);
        });
      })
      .catch(e => {
        console.log('保存角色权限err:', e);
        message.error('保存权限失败', 2);
      });
    return;
  };

  /**
   * 修改保存操作
   * @param roleInfo
   */
  const editFinishCallback = (roleInfo: RoleInfoType) => {
    RoleService.modifyRole(roleInfo)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalOpen(false);
          getRoleList(pagination, searchKeyWords);
        });
      })
      .catch(() => {
        message.error('修改失败', 2);
      });
  };

  /**
   * 确认删除操作
   * @param roleInfo
   */
  const deleteConfirmCallback = (roleInfo: RoleInfoType) => {
    RoleService.deleteRole(roleInfo.role_id)
      .then(() => {
        message.success('删除成功', 2, () => {
          getRoleList(pagination, searchKeyWords);
        });
      })
      .catch(e => {
        console.log('删除角色失败:', e);
      });
  };

  /**
   * 搜索查询操作
   * @param values
   */
  const searchChangeCallback = (values: any) => {
    getRoleList(initPagination, values);
  };

  /**
   * 搜索重置操作
   */
  const searchResetCallback = () => {
    getRoleList(initPagination, {});
  };

  /**
   * 获取角色列表
   * @param pagination
   * @param searchValues
   */
  const getRoleList = (pagination: TablePaginationConfig, searchValues: {}) => {
    const pageSize = pagination.pageSize;
    const current = pagination.current;
    searchKeyWords = searchValues;
    RoleService.getRoleList(pageSize, current, searchValues)
      .then((roleList: RoleListType) => {
        setRoleList(roleList.list);
        setPagination({
          ...initPagination,
          current: roleList.page_info?.page_num,
          pageSize: roleList.page_info?.page_size,
          total: roleList.page_info?.total_num,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
   * 获取角色账号列表
   * @param pagination
   * @param roleId
   */
  const getRoleAccountList = (pagination: TablePaginationConfig, roleId: number) => {
    const pageSize = pagination.pageSize;
    const current = pagination.current;
    RoleService.getAccountList(pageSize, current, roleId)
      .then((accountList: AccountListType) => {
        setRoleAccountList(accountList.list);
        setAccountPagination({
          ...initPagination,
          current: accountList.page_info?.page_num,
          pageSize: accountList.page_info?.page_size,
          total: accountList.page_info?.total_num,
        });
        if (!accountModalOpen) {
          setAccountModalOpen(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="panel">
      <RoleSearchUI
        searchChangeCallback={searchChangeCallback}
        searchResetCallback={searchResetCallback}
      />
      <RoleListUI
        listLoading={false}
        pagination={pagination}
        roleList={roleList}
        listChangeCallback={roleListChangeCallback}
        editClickCallback={editClickCallback}
        deleteCallback={deleteConfirmCallback}
        accountListClickCallback={accountListClickCallback}
        privilegeClickCallback={privilegeEditClickCallback}
      />
      <Modal
        title="角色修改"
        width={570}
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <RoleFormUI roleInfo={editRoleInfo} onFinishCallback={editFinishCallback} />
      </Modal>
      <Modal
        title="角色账号"
        width={900}
        open={accountModalOpen}
        onCancel={() => setAccountModalOpen(false)}
        footer={null}
      >
        <AccountListUI
          accountList={roleAccountList}
          pagination={accountPagination}
          listChangeCallback={accountListChangeCallback}
          removeChangeCallback={accountRemoveChangeCallback}
        />
      </Modal>
      <Modal
        title="角色权限"
        width={1100}
        open={privilegeModalOpen}
        onCancel={() => setPrivilegeModalOpen(false)}
        footer={null}
      >
        <PrivilegeUI
          privilegeList={allPrivileges}
          defaultPrivilegeIds={rolePrivilegIds}
          onFinishCallback={privilegeModifyFinishCallback}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
