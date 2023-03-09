import { Transition } from '@headlessui/react'
import { QRCodeSVG } from 'qrcode.react'
import { Component } from 'react'
import type { CourseData } from '../../../utils/interfaces'

interface ICourseCardProps {
    course: CourseData
}

interface ICourseCardStates {
    showing_details: boolean
}

class CourseCard extends Component<ICourseCardProps, ICourseCardStates> {
    state: ICourseCardStates = {
        showing_details: false,
    }

    render() {
        return (
            <div
                className={`card-transluscent h-64 w-full ${
                    this.state.showing_details
                        ? 'col-span-2 grid-cols-2'
                        : 'grid-cols-1'
                } duration-150 overflow-hidden grid`}
                onClick={() => {
                    this.setState(state => ({
                        showing_details: !state.showing_details,
                    }))
                }}
            >
                <h1 className="text-subtitle text-center align-middle text-lg">
                    {this.props.course.course_name}
                </h1>
                <label>{this.props.course.course_id}</label>
                <div
                    className={`${
                        this.state.showing_details ? '' : 'hidden'
                    } duration-200`}
                >
                    <QRCodeSVG
                        className="img"
                        value={this.props.course.course_qr_code_url}
                        size={280}
                        bgColor="transparent"
                        fgColor="#333"
                    />
                </div>
                <div className="bg-accent w-full h-6 absolute bottom-0 text-center text-[#efefef] font-bold align-middle">
                    {this.props.course.course_id}
                </div>
            </div>
        )
    }
}

export default CourseCard
