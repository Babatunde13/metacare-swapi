import { BaseReq } from "src/api_contracts/base_request.ctrl.contract"

export default async function getUserIp(req: BaseReq) {
    // get user ip
    console.log(req.ip)
}