declare module Stores {
  interface user {
    name: string
    uuidid: string
    token: string
  };

  interface employee {
    id: number
    organizationid?: number
    departmentid?: number
    jobid?: number
    login: string
    passwd: string
    birthdate?: number
    uuidid: string
    mobilephone?: string
    workphone?: string
    personalemail?: string
    workemail: string
    surname: string
    firstname: string
    middlename?: string
    fullname: string
    fullnameinitials: string
    photoid: number
  }

}