import { NavLink } from "react-router-dom"

export default function TaskFromBoard(props) {
    return <li><p><NavLink to="/task">{props.taskName}</NavLink></p></li>
}