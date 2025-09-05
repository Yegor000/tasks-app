import { useState } from 'react';

const TaskTitle = ({title, id, onEdit, onDelete}) => {
    const [editedTaskTitle, setEditedTaskTitle] = useState(null)
    const [isShowDeleteTitleButton, setIsShowDeleteTitleButton] = useState(false);

    const editTaskTitle = () => {
        setEditedTaskTitle(title)
    }

    const handleChangeTaskTitle = (e) => {
        setEditedTaskTitle(e.target.value)
    }

    const handleFinishEditTaskTitle = () => {
        if (editedTaskTitle.trim().length !== 0)
            onEdit(editedTaskTitle)

        setEditedTaskTitle(null)
    }

    const showTitleDeleteButton = () => {
        setIsShowDeleteTitleButton(true)
    }

    const hideTitleDeleteButton = () => {
        setIsShowDeleteTitleButton(false)
    }

    return (
        <>
            { editedTaskTitle !== null ? 
            <input type="text" autoFocus value={editedTaskTitle}
            onBlur={handleFinishEditTaskTitle} 
            onChange={handleChangeTaskTitle}/> :
            <div className='task-title'
                onMouseOver={showTitleDeleteButton}
                onMouseOut={hideTitleDeleteButton}>

                <div className='task-title-name'
                    onClick={editTaskTitle}>
                    {title}
                </div>
                {isShowDeleteTitleButton &&
                    <button className='delete-task-title-button' onClick={() => onDelete(id)}>
                        Удалить
                    </button>
                }
            </div>}
        </>
    )
}

const ListDescriptionStep = ({ description, onEdit, onDelete }) => {
    const [indexDeleteDescriptionButton, setIndexDeleteDescriptionButton] = useState(null);
    const [editedDescriptionStep, setEditedDescriptionStep] = useState(null)

    const showDeleteDescriptionButton = (description) => {
        setIndexDeleteDescriptionButton(description.id)
    }

    const hideDeleteDescriptionButton = () => {
        setIndexDeleteDescriptionButton(null)
    }

    const handleEditTaskDescription = () => {
        setEditedDescriptionStep(description.step)
    }

    const handleChangeDescriptionStep = (e) => {
        setEditedDescriptionStep(e.target.value)
    }

    const handleFinishEditTaksDescription = () => {
        if (editedDescriptionStep.trim().length !== 0)
            onEdit(description, editedDescriptionStep)

        setEditedDescriptionStep(null)
    }

    return (
        < li onMouseOver={() => showDeleteDescriptionButton(description)}
            onMouseLeave={() => hideDeleteDescriptionButton(description)}>

            {
                editedDescriptionStep !== null ? <input type="text" autoFocus value={editedDescriptionStep}
                    onBlur={handleFinishEditTaksDescription}
                    onChange={handleChangeDescriptionStep} /> :
                    <div className='task-description'>
                        <div onClick={() => handleEditTaskDescription(description)}>
                            {description.step}
                        </div>

                        {
                            indexDeleteDescriptionButton === description.id &&
                            <button onClick={onDelete}>Удалить</button>
                        }
                    </div>
            }


        </li >
    )
}

export default function TaskCard(props) {

    const [taskTitle, setTaskTitle] = useState(props.task.title)
    const [newDescriptionStep, setNewDescriptionStep] = useState('')
    const [taskDescription, setTaskDescription] = useState(props.task.description)

    const typeNewDescriptionStep = (e) => {
        setNewDescriptionStep(e.target.value)
    }

    const editTaskTitle = (newTitle) => {
        setTaskTitle(newTitle)
    }

    const editDescriptionStep = (editedDescription, newDescriptionStep) => {
        setTaskDescription(taskDescription.map(description => {
            if (description === editedDescription) description.step = newDescriptionStep
            return description
        }))
    }

    const handleDeleteTaskDescription = (deletedTaskDescription) => {
        setTaskDescription(taskDescription.filter(task => task.id !== deletedTaskDescription.id))
    }

    const handleAddNewDescription = () => {
        if (newDescriptionStep.trim().length == 0) return

        const newTaskDescription = {
            id: getDescriptionStepId(),
            step: newDescriptionStep,
        }
        setTaskDescription([...taskDescription, newTaskDescription])
        setNewDescriptionStep('')
    }

    const getDescriptionStepId = () => {
        const ids = taskDescription.map(description => description.id).sort((a, b) => a - b)

        for (let i = 0; i < ids.length; i++) {
            const expectedId = i + 1;

            if (ids[i] !== expectedId) {
                return expectedId;
            }
        }

        return taskDescription.length + 1
    }

    return (
        <div className='work-space'>
            <div className='box'>

                <TaskTitle title={taskTitle} id={props.task.id} onDelete={props.onDelete} onEdit={editTaskTitle}/>

                <ul className='tasks-list'>
                    {taskDescription.map(description => <ListDescriptionStep key={description.id} description={description}
                        onDelete={() => handleDeleteTaskDescription(description)}
                        onEdit={editDescriptionStep} />)}
                </ul>
            </div>

            <div className='box'>
                <input type='text' value={newDescriptionStep} onChange={typeNewDescriptionStep}></input>
                <button onClick={handleAddNewDescription}>Добавить задачу</button>
            </div>
        </div>
    )
}