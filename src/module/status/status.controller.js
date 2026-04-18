import ApiResponse from "../../common/utils/api-response.js"
import * as statusService from "./status.service.js"

const createStatus = async (req, res) => {
    console.log(req.body.status)
    const result = await statusService.createStatus(req.body.status, req.file)

    ApiResponse.ok(res, "status created", result)
}

const deleteStatus = async (req, res) => {
    await statusService.deleteStatus(req.params.id)

    ApiResponse.ok(res, "Status deleted successfully")
}

const fetchAllStatus = async (req, res) => {
    const result = await statusService.fetchStatus(req.user.id)

    if (result.length === 0) {
        ApiResponse.noContent("No status found")
    }

    ApiResponse.ok(res, "All status", result)
}

const fetchStatus = async(req, res)=>{
    const result = await statusService.fetchStatus(req.params.id)

    ApiResponse.ok(res, "Status fetched", result)
}

export {
    createStatus,
    deleteStatus,
    fetchAllStatus,
    fetchStatus
}