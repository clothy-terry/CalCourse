import type { IconType } from 'react-icons'

export interface UserData {
    email: string
    wechat_id: string
}

export interface CourseData {
    school_name_and_term: string
    course_name: string
    course_id: string
    course_qr_code_url: string
}

export interface MissingRecord {
    department_code: string
    course_code: string
    lecture_id: string
    course_term: string
}

export interface SingleEvent {
    title: string
    date: string
    duration: string
    time_zone: string
    slots: { [key: string]: number }
    location: string
    description: string
    contact: string
    qr_code: string
}

export interface RegisterInfo {
    event_id: string
    email: string
    name: string
    wechat_id: string
    time_slot: string
    image: string[]
    description: string
    other_concern: string
}

// for a single navbar item
export interface INavBarItem {
    label: string
    icon: IconType
    path: string
    submenu?: ISubmenuItem[]
}

export interface ISubmenuItem {
    label: string
    value: string
    path: string
}
