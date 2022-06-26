import { defineStore } from "pinia"
import request from "@/utils/request"

export const employeeStore = defineStore('employee', {
    state: () => ({
        employees: []
    }),
    actions: {
        async list(filter: string): Promise<Stores.employee[]> {
        return new Promise((resolve, reject) => {
            request.post('/employee/list', {
            filter
            }).then(res => {
            const { data, msg } = res.data
            if (data) {
                resolve(data)
                resolve(msg)
            } else {
                reject(msg)
            }
            })
        })
        },
    }
});
