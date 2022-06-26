import React, {RefObject} from "react";
import {message} from "antd";
import {ProfileService} from "../../../services/Profile";
import {connect} from "react-redux";
import {AdminState} from "../../../store/states/adminState";
import {Dispatch} from "redux";
import {ProfileAccountUpdateAction} from "../../../store/actions/adminAction";
import ProfileInfoUI from "../component/InfoUI";

class ProfileInfo extends React.Component<any, any> {

    formRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    /**
     * 初始化表单数据
     */
    componentDidMount() {
        this.formRef.current.setFieldsValue(this.props.accountInfo)
    }

    /**
     * 修改操作
     * @param values
     */
    onFinishCallback = (values: any) => {
        ProfileService.profileUpdate(values).then(() => {
            this.props.profileAccountUpdate(values); // dispatch redux
            message.success("保存成功", 1, () => {
                window.location.href = `${window.location.href}`
            })
        }).catch((e) => {
            console.log(e)
            message.error("保存失败")
        })
        console.log(values)
    }

    render() {
        return (
            <div className="panel">
                <ProfileInfoUI
                    formRef={this.formRef}
                    onFinishCallback={this.onFinishCallback}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AdminState) => {
    return {
        ...state.profileState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
      profileAccountUpdate: (data: any) => ProfileAccountUpdateAction(dispatch, data)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)