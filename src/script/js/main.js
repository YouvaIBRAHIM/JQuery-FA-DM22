import { card } from "../../components/card/card.js";
import { allCardsObjectFR } from "../data/allCardsObjectFR.js";

const selectSet = $("select[name='setChoice']");
const sectionDisplay = $("section[data-section='display_set']");
const inputsName = $("input[data-player]");
const btnSave = $("button#save");

const objForLocal = {
    player1: { name: "", points: 0, setCards: [] },
    player2: { name: "", points: 0, setCards: [] },
};

//* Fill selects with Set name
Object.keys(allCardsObjectFR).forEach((name) => {
    selectSet.append(`<option value="${name}">${name}</option>`);
});

//* Set random cards for each player
selectSet.change(function () {
    const value = this.value;
    if (value === "null") return console.log("RETURN");
    const player = this.dataset.player;
    const section = sectionDisplay.filter((el) => sectionDisplay[el].dataset.player === player);
    const div = $("<div class='container_card'></div>");
    const setCards = [];
    const length = allCardsObjectFR[value].length;
    for (let i = 0; i < 10; i++) {
        const random = parseInt(Math.floor(Math.random() * length));
        setCards.push(allCardsObjectFR[value][random]);
        div.append(card(allCardsObjectFR[value][random]));
    }
    objForLocal[player].setCards = setCards;
    section.fadeOut(function () {
        section.empty().append(div).fadeIn();
    });
    toggleBtnPlayer(player);
    toggleBtnFight();
});
//* Set player name
inputsName.change(function (e) {
    const player = this.dataset.player;
    const value = this.value;
    !value ? (objForLocal[player].name = "") : (objForLocal[player].name = this.value);
    toggleBtnPlayer(player);
    toggleBtnFight();
});
//* Save to localStorage

function toggleBtnPlayer(player) {
    const { name, setCards } = objForLocal[player];
    const btn = $(`button[data-player="${player}"]`);
    if (!name.length || !setCards.length) return btn.addClass("disabled");
    btn.removeClass("disabled");
}

function toggleBtnFight() {
    const { name: nameP1, setCards: setCardsP1 } = objForLocal.player1;
    const { name: nameP2, setCards: setCardsP2 } = objForLocal.player2;

    if (!nameP1.length || !setCardsP1.length || !nameP2.length || !setCardsP2.length)
        return btnSave.addClass("save_disabled");
    btnSave.removeClass("save_disabled");
}
btnSave.click(() => {
    localStorage.setItem("hbdm22", JSON.stringify(objForLocal));
    showPopupFighting();
});

function showPopupFighting() {
    $(`section#js_section_fight`).animate(
        {
            width: "100vw",
            height: "100vh",
            top: "0px",
            left: "0px",
        },
        {
            duration: 600,
            done: function () {
                $(".fight_container>img").animate({
                    width: "40vw",
                    height: "45vh",
                });
                $(".fight_container>a").animate({
                    fontSize: "25vw",
                });
            },
        }
    );
}
