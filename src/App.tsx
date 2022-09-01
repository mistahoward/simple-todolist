import { FC, ChangeEvent, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ITask } from "./interfaces";
import TodoTask from "./Components/TodoTask";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmDelete = withReactContent(Swal);

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App: FC = () => {
	const notifySuccess = () =>
		toast.success("Task Added!", {
			position: "bottom-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const notifyDelete = () =>
		toast.error("Task Deleted!", {
			position: "bottom-left",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const [task, setTask] = useState<string>("");
	const [deadline, setDeadline] = useState<number>(0);
	const [todoList, setTodoList] = useState<ITask[]>([]);

	const clearForm = (): void => {
		setDeadline(0);
		setTask("");
	};
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault();
		if (event.target.id === "taskName") setTask(event.target.value);
		if (event.target.id === "taskDeadline")
			setDeadline(Number(event.target.value));
	};

	const addTask = (): void => {
		let lastItem: ITask;
		let lastItemId: number;
		const tempTodo = [...todoList];
		if (todoList.length >= 1) {
			console.log(
				`todolist length greater than 1: length is ${todoList.length}`
			);
			lastItem = tempTodo[tempTodo.length - 1];
			console.log(`setting last item to:`);
			console.log(lastItem);
			lastItemId = lastItem.id + 1;
			//console.log(tempTodo);
		} else {
			console.log("todolist length less than one, setting lastItemId to 0.");
			lastItemId = 0;
		}
		const newTask = { name: task, deadline: deadline, id: lastItemId };
		setTodoList([...todoList, newTask]);
		console.log(`Sucessfully added a new task with an id of ${newTask.id}`);
		clearForm();
		notifySuccess();
	};

	const deleteTask = (taskIdToDelete: number): void => {
		ConfirmDelete.fire({
			title: <p>Woah!</p>,
			icon: "warning",
			showConfirmButton: true,
			confirmButtonColor: "grey",
			showDenyButton: true,
			confirmButtonText: "Cancel",
			denyButtonText: "Confirm Delete",
			text: "Are you sure you want to delete this task?",
		}).then((result) => {
			if (result.isDenied) {
				setTodoList(
					todoList.filter((task) => {
						return task.id != taskIdToDelete;
					})
				);
				notifyDelete();
			} else {
				ConfirmDelete.close();
			}
		});
	};
	return (
		<Container fluid>
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Row className="header pt-3 pb-3">
				<Col>
					<Row>
						<Col>
							<h2>To Do List</h2>
						</Col>
					</Row>
					<Row className="no-gutters">
						<Col xs={10} className="pe-1 ps-1">
							<Row>
								<Col className="mb-1">
									<Form.Control
										value={task}
										id="taskName"
										type="text"
										placeholder="Task Name..."
										onChange={handleChange}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Form.Control
										value={deadline}
										id="taskDeadline"
										type="number"
										placeholder="Deadline (Number of Days)..."
										onChange={handleChange}
									/>
								</Col>
							</Row>
						</Col>
						<Col xs={2} className="ps-0">
							<button
								className="btn btn-secondary h-100 fluid"
								onClick={addTask}
							>
								Submit
							</button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="mt-3">
				{todoList.map((task: ITask, key: number) => {
					return (
						<TodoTask key={key} deleteTask={deleteTask} task={task} />
					);
				})}
			</Row>
		</Container>
	);
};

export default App;
