import { createFile } from "./createFile.js";
import { allCardsObjectFR } from "../data/allCardsObjectFR.js";
import setSettingEndpoint from "../request/base.js";
import { card } from "../../components/card.js";
console.log("🚀 ~ file: hello.js ~ line 5 ~ allCards", allCardsObjectFR);

function cleanHero() {
    allCardsObjectFR["Ashes of Outland"].forEach((data) => {
        $(".info").append(card(data));
    });
}
cleanHero();

function getAllSet() {
    console.log("Object.keys(allCardsObjectFR)", Object.keys(allCardsObjectFR));
}
getAllSet();

$("button[data-all]").click((e) => {
    console.log("CLICK ALL");
    const settings = setSettingEndpoint(`/cards`);
    $.ajax(settings).done(function (response) {
        const all = {};
        Object.entries(response).forEach((item) => {
            // *J'ai gardé que les cartes avec Images et des attaques.
            const result = item[1].filter((hero) => hero.img && hero.attack);
            if (result.length) all[item[0]] = result;
        });
        // console.log("🚀 ~ file: hello.js ~ line 34 ~ all ~ all", all);
        // * C'était pour l'enregistrement des données...
        // createFile("allCards", all);
    });
});

$("button[data-classes]").click((e) => {
    const { classes } = $("button[data-classes]").data();

    console.log("Click", classes);
    // *On récupère toutes les cartes par classe
    const settings = setSettingEndpoint(`/cards/classes/${classes}`);

    $.ajax(settings).done(function (response) {
        console.log("REPSONSE => ", response);
    });
});

$("button[data-info]").click(() => {
    const settings = setSettingEndpoint(`/info`);
    $.ajax(settings).done(function (response) {
        console.log("REPSONSE INFO => ", response);
    });
});
$("button[data-types]").click(() => {
    const { types } = $("button[data-types]").data();

    const settings = setSettingEndpoint(`/cards/types/${types}`);
    $.ajax(settings).done(function (response) {
        response
            .filter((hero) => hero.img && hero.attack)
            .forEach((data, index) => {
                console.log("🚀 ~ file: hello.js ~ line 56 ~ .forEach ~ data", index, " => ", data);
                $(".info").append(card(data, index));
            });
    });
});
$("button[data-sets]").click(() => {
    const { sets } = $("button[data-sets]").data();

    const settings = setSettingEndpoint(`/cards/sets/${sets}`);
    $.ajax(settings).done(function (response) {
        console.log("🚀 ~ file: hello.js ~ line 70 ~ response", response);
        response
            .filter((hero) => hero.img && hero.attack)
            .forEach((data, index) => {
                console.log("🚀 ~ file: hello.js ~ line 56 ~ .forEach ~ data", index, " => ", data);
                $(".info").append(card(data, index));
            });
    });
});

$("form").submit(function (e) {
    e.preventDefault();

    $(".info").empty();
    const value = $("input").val();
    console.log("value", value);

    const settings = setSettingEndpoint(`/cards/search/${value}`);
    $(".info").append(`
	<img
	src="https://d15f34w2p8l1cc.cloudfront.net/hearthstone/57e6bb30b56d85c39264e4aab542f339cdf0242d8fe614b5a7f90108457a55c2.png"
	alt=""
/>
	`);
    rotate($("img"));
    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        console.log("🚀 ~ file: hello.js ~ line 76 ~ jqxhr", jqxhr.responseText);
        const { error, message } = JSON.parse(jqxhr.responseText);
        setTimeout(() => {
            $("img").stop().remove();
            $(".info").append(`
				<span>Error : ${error} ${message}</span>
			`);
        }, 2000);
    });

    $.ajax(settings).done(function (response) {
        console.log("RESPONSE SEARCH", response);

        setTimeout(() => {
            $("img").stop().remove();

            response.forEach((data, index) => {
                if (!data.img) return;
                if (!data.attack) return;
                $(".info").append(card(data, index));
            });
        }, 2000);
    });
});

function rotate(node, speed, degree) {
    let deg = degree || "360";

    node.animate(
        {
            deg: degree,
        },
        {
            duration: speed || 2000,
            step: function (now) {
                $(this).css({ transform: `rotateY(${now}deg)` });
            },
            done: function () {
                deg === "0" ? rotate(node, speed, "360") : rotate(node, speed, "0");
            },
        }
    );
}

// nom du groupe
// nom des étudiants
// lien github
// lien api
// alex.zerah@gmail.com
