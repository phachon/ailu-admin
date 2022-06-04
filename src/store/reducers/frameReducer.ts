import {AdminAction} from "../actions/adminAction";
import {FrameState, initAdminState} from "../states/adminState";

export const frameReducer = (frameState: FrameState = initAdminState.frameState, action: AdminAction): FrameState => {
    return frameState
}