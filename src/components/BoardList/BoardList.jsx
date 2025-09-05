import TaskFromBoard from "../TaskFromBoard/TaskFromBoard"
import { tasks } from "../../data"
import Button from "../Button/Button"
import { useState } from "react"

export default function BoardList() {

    const [taskList, setTaskList] = useState(tasks)

    function handleClick() {
        tasks.push({title: 'еще одна задача'})
        setTaskList(tasks)
        console.log(tasks)
    }

    return (
        <>
            <ul>
                {taskList.map(task => <TaskFromBoard key = {task.title} taskName = {task.title}/>)}
            </ul>

            <Button onClick = {handleClick}>Добавить</Button>
        </>
    )
}