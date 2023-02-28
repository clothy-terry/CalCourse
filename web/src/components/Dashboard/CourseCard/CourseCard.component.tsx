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
                className={`card-transluscent h-64 ${this.state.showing_details ? 'col-span-2' : ''} duration-150`}
                onClick={() => {
                    this.setState(state => ({
                        showing_details: !state.showing_details,
                    }))
                }}
            >
                <h1 className="text-subtitle">
                    {this.props.course.course_name}
                </h1>
                <label>{this.props.course.course_id}</label>
                <div className={`${this.state.showing_details ? '' : 'hidden'} duration-200`}>
                    <QRCodeSVG
                        className="img"
                        value={this.props.course.course_qr_code_url}
                        size={280}
                        bgColor="transparent"
                        fgColor="#333"
                    />
                </div>
            </div>
        )
    }
}

export default CourseCard
