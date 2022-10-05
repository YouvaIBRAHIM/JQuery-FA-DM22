export const card = (data) => {
    return `
		<div class="card">
			<img src="${data.imgGold || data.img}" style="width:100%"/>
		</div>
	`;
};
