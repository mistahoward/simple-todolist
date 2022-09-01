import { Row, Col, Card } from "react-bootstrap";
import { ITask } from "../interfaces";
import { GoTrashcan, GoClock } from "react-icons/go";

interface Props {
	task: ITask;
	deleteTask(taskIdToDelete: number): void;
}

const TodoTask = ({ task, deleteTask }: Props) => {
	if (task !== undefined) {
		return (
			<Col xs={12} sm={6} md={4} lg={3}>
				<Card>
					<Card.Body>
						<Row>
							<Col xs={6}>{task.name}</Col>
							<Col
								xs={3}
								className="text-end text-nowrap"
								title={"Days remaining"}
							>
								<GoClock /> {task.deadline}
							</Col>
							<Col xs={3}>
								<button
									onClick={() => deleteTask(task.id)}
									className="btn btn-danger btn-sm w-100 ps-0 pe-0"
								>
									<GoTrashcan />
								</button>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		);
	} else {
		return <></>;
	}
};

export default TodoTask;
