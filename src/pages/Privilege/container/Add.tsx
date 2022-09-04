import React, { Component, RefObject } from 'react';
import PrivilegeFormUI from "../component/FormUI";

class PrivilegeAdd extends Component<any, any> {

    formRef: RefObject<any>

    constructor(props: any) {
        super(props);
        this.formRef = React.createRef()
    }

    /**
     * 保存权限
     */
    onFinishCallback = () => {

    }

    render() {
        return (
            <div className="pdt24">
                <PrivilegeFormUI
                    formRef={this.formRef}
                    hiddenRoleIdInput={true}
                    onFinishCallback={this.onFinishCallback}
                />
            </div>
        );
    }
}

export default PrivilegeAdd;