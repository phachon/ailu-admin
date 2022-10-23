import React, {useEffect, useState} from 'react';
import AccountListUI from "../component/ListUI";
import {AccountInfoType, AccountListType} from "../../../store/types/accountType";
import {AccountService} from "../../../services/Account";
import {Form, message, Modal, TablePaginationConfig} from "antd";
import AccountSearchUI from "../component/SearchUI";
import AccountFormUI from "../component/FormUI";

const AccountList: React.FC = () => {

    const [searchForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const initPagination: TablePaginationConfig = {
        current: 1,
        pageSize: 10,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total :number) => {return `总共 ${total} 条`}
    }

    const [accountList, setAccountList] = useState<AccountInfoType[]>([])
    const [pagination, setPagination] = useState(initPagination)
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
    const [editAccountInfo, setEditAccountInfo] = useState<AccountInfoType>()

    let searchKeyWords = {}

    useEffect(() => {
        getAccountList(initPagination, {}) // 拉取账号信息
    }, []);

    /**
     * 请求账号列表
     * @param pageConfig 翻页信息
     * @param keywords 搜索信息
     */
    const getAccountList = (pageConfig: TablePaginationConfig, keywords: {}) => {
        AccountService.accountList(pageConfig.pageSize, pageConfig.current, keywords).then((res: AccountListType) => {
            setAccountList(res.list)
            setPagination({
                ...initPagination,
                current: res.page_info?.page_num,
                pageSize: res.page_info?.page_size,
                total: res.page_info?.total_num,
            })
        }).catch(e => {
            console.log(e)
        })
    }

    /**
     * 搜索查询操作
     * @param values 搜索表单数据
     */
    const searchChangeCallback = (values: any) => {
        searchKeyWords = values
        getAccountList(initPagination, values)
    }

    /**
     * 搜索重置操作
     */
    const searchResetCallback = () => {
        searchForm.resetFields()
        searchKeyWords = {}
        getAccountList(initPagination, searchKeyWords)
    }

    /**
     * 列表分页请求
     * @param pageConfig
     * @param filters
     * @param sorter
     */
    const listChangeCallback = (pageConfig: TablePaginationConfig, filters: any, sorter: any) => {
        getAccountList(pageConfig, searchKeyWords)
    }
    
    /**
     * 修改点击操作
     */
    const editClickCallback = (accountInfo: AccountInfoType) => {
        console.log("editClickCallback:", accountInfo)
        setEditAccountInfo(accountInfo)
        editForm.setFieldsValue(accountInfo)
        setEditModalVisible(true)
    }

    /**
     * 更新账号状态操作
     * @param accountInfo
     * @param status
     */
    const updateStatusCallback = (accountInfo: AccountInfoType, status: number) => {
        AccountService.accountUpdateStatus(accountInfo.account_id, status).then(() => {
            message.success("操作成功", 2, () => {
                accountInfo.status = status
                updateAccountListInfo(accountInfo.account_id, accountInfo)
            })
        }).catch(() => {
            message.error("操作失败", 2)
        })
    }

    /**
     * 修改弹框取消操作
     */
    const editModalCancelCallback = () => {
        setEditModalVisible(false)
    }

    /**
     * 修改完成操作
     * @param accountInfo AccountInfoType
     */
    const editOnFinishCallback = (accountInfo: AccountInfoType) => {
        AccountService.accountUpdate(accountInfo).then(() => {
            message.success("修改成功", 2, () => {
                updateAccountListInfo(accountInfo.account_id, accountInfo)
                setEditModalVisible(false)
            })
        }).catch((e) => {
            console.log(e)
            message.error("修改失败", 2)
        })
    }

    /**
     * 更新账号列表信息
     * @param accountId 账号ID
     * @param accountInfo 账号信息
     */
    const updateAccountListInfo = (accountId: bigint, accountInfo: AccountInfoType) => {
        let editAccountList: AccountInfoType[] = []
        for (let i = 0; i < accountList.length; i++) {
            if (accountId !== accountList[i].account_id) {
                editAccountList.push(accountList[i])
                continue
            }
            let editAccountInfo: AccountInfoType = {
                ...accountList[i],
                email: accountInfo.email,
                given_name: accountInfo.given_name,
                mobile: accountInfo.mobile,
                phone: accountInfo.phone,
            }
            if (accountInfo.status) {
                editAccountInfo.status = accountInfo.status
            }
            editAccountList.push(editAccountInfo)
        }
        setAccountList(editAccountList)
    }

    return (
        <div className="panel">
            <AccountSearchUI
                searchForm={searchForm}
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
            />
            <Modal
                title="账号修改"
                width={570}
                visible={editModalVisible}
                onCancel={editModalCancelCallback}
                footer={null}
            >
                <AccountFormUI
                    formInstance={editForm}
                    isEdit={true}
                    onFinishCallback={editOnFinishCallback}
                />
            </Modal>
        </div>
    ); 
}

export default AccountList