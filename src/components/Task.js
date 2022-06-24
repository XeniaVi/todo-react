const Task = ({value, id}) => {
    return (<div>
        <li key={id}>
            <input type='checkbox'></input>
            <span>{value}</span>
            <button>x</button>
        </li>
    </div>)
}

export default Task;