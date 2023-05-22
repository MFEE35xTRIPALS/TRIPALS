import CardSpot from "./CardSpot";
import styles from "../Edit.module.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CardContent = ({
	main_articleno,
	spots,
	onSpotChange,
	onDeleteSpot,
	onSetCenter,
	onChangeSpotIndex,
}) => {
	// console.log(main_articleno);

	const onDragEnd = (result) => {
		if (!result.destination) return; // 如果沒有目標位置，則不執行任何操作

		const updatedSpots = Array.from(spots);
		const [removed] = updatedSpots.splice(result.source.index, 1);
		updatedSpots.splice(result.destination.index, 0, removed);

		// 更新 location_index
		const updatedSpotsWithIndex = updatedSpots.map((spot, index) => ({
			...spot,
			location_index: index + 1, // 新的索引值
		}));

		onChangeSpotIndex(updatedSpotsWithIndex); // 更新狀態，觸發重新渲染
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={`${styles["edit-card-content"]}`}>
				<Droppable droppableId="spots">
					{(provided) => (
						<div
							className="accordion accordion-flush"
							id="accordionContent"
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{spots.map((spot, index) => (
								<Draggable
									key={spot.contentno.toString()}
									draggableId={spot.contentno.toString()}
									index={index}
								>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps}>
											<CardSpot
												main_articleno={main_articleno}
												spot={spot}
												onSpotChange={(updatedSpot) =>
													onSpotChange(spot.contentno, updatedSpot)
												}
												onDeleteSpot={onDeleteSpot}
												onSetCenter={onSetCenter}
												dragHandleProps={provided.dragHandleProps}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
		// <div className={`${styles["edit-card-content"]}`}>
		// 	<div className="accordion accordion-flush" id="accordionContent">
		// 		{spots.map((item) => (
		// 			<CardSpot
		// 				main_articleno={main_articleno}
		// 				key={item.contentno}
		// 				spot={item}
		// 				onSpotChange={(updatedSpot) =>
		// 					onSpotChange(item.contentno, updatedSpot)
		// 				}
		// 				onDeleteSpot={onDeleteSpot}
		// 				onSetCenter={onSetCenter}
		// 			/>
		// 		))}
		// 	</div>
		// </div>
	);
};

export default CardContent;
