import Task from "./Task";

const TasksList = ({items}) => {
    return (<div>
        <ul>
            {items.map(item => <Task value={item.value} id={item.id} />)}
        </ul>
    </div>)
}

export default TasksList;
