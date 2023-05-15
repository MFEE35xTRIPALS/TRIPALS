// 比較資料差異並提取異動資料
export const compareData = (originalData, updatedData) => {
	const diffData = {};

	// 加入 main_articleno 和 contentno 作為固定的 key
	diffData.main_articleno = originalData.main_articleno;
	// 比較主要屬性是否有異動
	for (const key in originalData) {
		if (Array.isArray(originalData[key])) {
			// 如果是陣列，則進行陣列元素的比較
			if (
				JSON.stringify(originalData[key]) !== JSON.stringify(updatedData[key])
			) {
				diffData[key] = updatedData[key];
			}
		} else if (originalData[key] !== updatedData[key]) {
			// 如果是物件，則進行物件值的比較
			diffData[key] = updatedData[key];
		}
	}

	// 比較 spots 陣列中的每個物件是否有異動
	diffData.spots = [];

	for (let i = 0; i < originalData.spots.length; i++) {
		const originalSpot = originalData.spots[i];
		const updatedSpot = updatedData.spots[i];

		const diffSpot = {};

		for (const key in originalSpot) {
			if (originalSpot.hasOwnProperty(key)) {
				if (originalSpot[key] !== updatedSpot[key]) {
					diffSpot[key] = updatedSpot[key];
				}
			}
		}

		if (Object.keys(diffSpot).length > 0) {
			diffData.spots.push({
				contentno: originalSpot.contentno,
				...diffSpot,
			});
		}
	}

	return diffData;
};
