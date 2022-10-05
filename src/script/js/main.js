import { card } from "../../components/card.js";
import { allCardsObjectFR } from "../data/allCardsObjectFR.js";

//* Fill selects with Set name
const selectSet = $("select[name='setChoice']");
console.log("Select", selectSet);
Object.keys(allCardsObjectFR).forEach((name) => {
    selectSet.append(`<option value="${name}">${name}</option>`);
});

const sectionDisplay = $("section[data-section='display_set']");

selectSet.change(function () {
    const value = this.value;
    if (value === "null") return console.log("RETURN");
    const player = this.dataset.player;
    const section = sectionDisplay.filter((el) => sectionDisplay[el].dataset.player === player);
    const div = $("<div class='container_card'></div>");
    const set = [];
    const length = allCardsObjectFR[value].length;
    for (let i = 0; i < 10; i++) {
        const random = parseInt(Math.floor(Math.random() * length));
        set.push(allCardsObjectFR[value][random]);
        div.append(card(allCardsObjectFR[value][random]));
    }
    section.fadeOut(function () {
        section.empty().append(div).fadeIn();
    });
});

// LocalStorage
// {
//     player: name,
//     pointsWin: 0,
//     setCards:[{},{}]
// }
