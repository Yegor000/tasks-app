import './Button.css'

export default function Button(props) {
    return <button className="button active" onClick={props.onClick}>{props.children}</button>
}