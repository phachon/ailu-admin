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
import { PrivilegeService } from '../../../services/Privilege';

let searchKeyWords = {};
let accountRoleInfo: RoleInfoType;

const RoleList: React.FC = () => {
  const [roleList, setRoleList] = useState<RoleInfoType[]>([]);
  const [pagination, setPagination] = useState(initPagination);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [accountModalVisible, setAccountModalVisible] = useState<boolean>(false);
  const [privilegeModalVisible, setPrivilegeModalVisible] = useState<boolean>(false);
  const [editRoleInfo, setEditRoleInfo] = useState<RoleInfoType>();
  const [roleAccountList, setRoleAccountList] = useState<AccountInfoType[]>([]);
  const [accountPagination, setAccountPagination] = useState(initPagination);
  const [rolePrivileges, setRolePrivileges] = useState<PrivilegeListItemType[]>([]);

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
        setEditModalVisible(true);
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
    accountRoleInfo = roleInfo;
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
    getRoleAccountList(pageConfig, accountRoleInfo?.role_id);
  };

  /**
   * 权限列表点击操作
   * @param roleInfo 角色信息
   */
  const privilegeClickCallback = (roleInfo: RoleInfoType) => {
    PrivilegeService.privilegeList()
      .then(privilegeList => {
        setRolePrivileges(privilegeList.list);
        setPrivilegeModalVisible(true);
      })
      .catch(e => {
        console.log('获取角色权限列表err:', e);
      });
  };

  /**
   * 修改保存操作
   * @param roleInfo
   */
  const editFinishCallback = (roleInfo: RoleInfoType) => {
    RoleService.modifyRole(roleInfo)
      .then(() => {
        message.success('修改成功', 2, () => {
          setEditModalVisible(false);
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
      .catch(() => {
        message.error('修改失败', 2);
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
        if (!accountModalVisible) {
          setAccountModalVisible(true);
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
        privilegeClickCallback={privilegeClickCallback}
      />
      <Modal
        title="角色修改"
        width={570}
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <RoleFormUI roleInfo={editRoleInfo} onFinishCallback={editFinishCallback} />
      </Modal>
      <Modal
        title="角色账号"
        width={900}
        visible={accountModalVisible}
        onCancel={() => setAccountModalVisible(false)}
        footer={null}
      >
        <AccountListUI
          accountList={roleAccountList}
          pagination={accountPagination}
          listChangeCallback={accountListChangeCallback}
        />
      </Modal>
      <Modal
        title="角色权限"
        width={1100}
        visible={privilegeModalVisible}
        onCancel={() => setPrivilegeModalVisible(false)}
        footer={null}
      >
        <PrivilegeUI privilegeList={rolePrivileges} onFinishCallback={values => {}} />
      </Modal>
    </div>
  );
};

export default RoleList;
