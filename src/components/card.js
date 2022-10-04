export const card = (data, index) => {
    return `
		<div class="card">
			<h1>${data.name} => ${index}</h1>
			<img src="${data.imgGold || data.img}"/>
		</div>
	`;
};
