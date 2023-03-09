import { useLocation, useNavigate } from 'react-router-dom'
import type { INavBarItem } from '../../../utils/interfaces'

const NavBarItem = (item: INavBarItem) => {
    // used for navigation
    const navigate = useNavigate()

    // used to track whether it corresponds to the active page, for styling
    const selected = useLocation().pathname.includes(item.path)

    const selected_path = useLocation().pathname

    return (
        // the interpolated tenary operator changes opacity
        <li
            className={`right-0 my-2 duration-150 cursor-pointer text-graphite ${
                selected ? 'opacity-100' : 'opacity-30'
            }`}
            key={item.label}
        >
            <span
                className="grid grid-cols-[1fr_2rem] gap-4 items-center"
                onClick={() => navigate(item.path)}
            >
                <h2 className="text-xl text-right leading-none m-0 font-bold">
                    {item.label}
                </h2>
                {/* the icon is a react-icon object */}
                {<item.icon className="h-6 w-6" />}
            </span>
            {item.submenu != null ? (
                <ul
                    className={`list-right mt-2 pr-[2.1rem] text-right indent-4 leading-6 ${
                        selected ? '' : 'hidden'
                    }`}
                >
                    {item.submenu.map(submenu_item => {
                        console.log(selected_path)
                        console.log(submenu_item.path)
                        return (
                            <li
                                key={submenu_item.value}
                                className={`duration-150 ${
                                    selected_path === submenu_item.path
                                        ? 'opacity-100'
                                        : 'opacity-30'
                                }`}
                                onClick={() => navigate(submenu_item.path)}
                            >
                                {submenu_item.label}
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <></>
            )}
        </li>
    )
}

export default NavBarItem
