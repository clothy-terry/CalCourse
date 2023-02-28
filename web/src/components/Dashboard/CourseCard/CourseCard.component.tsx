import { Transition } from '@headlessui/react'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import type { CourseData } from '../../../utils/interfaces'

const CourseCard = (course: CourseData) => {
    const { course_name, course_id, course_qr_code_url } = course
    var a = false

    // const [showing_qr_code, set_showing_qr_code] = useState(false)

    return (
        <div
            className="card-transluscent"
            onClick={() => {
                a = !a
                console.log(a)
            }}
        >
            <h1 className="text-subtitle">{course_name}</h1>
            <label>{course_id}</label>
            <div>
                <Transition
                    show={a ? true : false}
                    enter="transform transition duration-[400ms]"
                    enterFrom="opacity-0 rotate-[-120deg] scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <QRCodeSVG
                        className="img"
                        value={course_qr_code_url}
                        size={280}
                        bgColor="transparent"
                        fgColor="#333"
                    />
                </Transition>
            </div>
        </div>
    )
}

export default CourseCard
