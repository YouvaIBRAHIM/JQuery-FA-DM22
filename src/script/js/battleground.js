let round = 1;
let isFirstPlayer = true;
$( init );
let player1Cards, player2Cards, firstPlayerCrdSlot, secondPlayerCardSlot; 

const playedCards = {
  player1: {
    index: null,
    card: null,
  },
  player2: {
    index: null,
    card: null,
  },
}
const players = JSON.parse(localStorage.getItem("hbdm22"))

function init() {

  const player1Name = players.player1.name;
  $(".infos .player1 .playername").text(player1Name)

  const player2Name = players.player2.name;
  $(".infos .player2 .playername").text(player2Name)
  initPlayers()
}

function handleCardDrop( event, ui ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );    
    ui.draggable.draggable( 'option', 'revert', false );

    const playedCardIndex = ui.draggable.data().cardIndex;
    const playedCard = ui.draggable.data().cardInfos;

    if (isFirstPlayer == false) {
      playedCards.player2.index = playedCardIndex;
      playedCards.player2.card = playedCard;
      

      filterPlayerCard(playedCards.player1.index, playedCards.player2.index)
      cardBattle(playedCards.player1.card, playedCards.player2.card)
      if (round == 10) {
        whoWin()
      }else{
        round++;
      }
      initPlayers()
      secondPlayerCardSlot.droppable( 'disable' ); 
    }else{
      playedCards.player1.index = playedCardIndex;
      playedCards.player1.card = playedCard;
      secondPlayerCardSlot.droppable( 'enable' ); 
    }
    isFirstPlayer = !isFirstPlayer;
}

function filterPlayerCard(player1CardToRemove, player2CardToRemove) {
  player1Cards = player1Cards.filter((card, index) => {
    return index != player1CardToRemove
  })

  players.player1.setCards = player1Cards;
  player2Cards = player2Cards.filter((card, index) => {
    return index != player2CardToRemove
  })
  players.player2.setCards = player2Cards;

}

function initPlayers() {
  $('.firstPlayer #cardPile').html( '' );
  $('.firstPlayer #cardSlots').html( '' );
  $('.secondPlayer #cardPile').html( '' );
  $('.secondPlayer #cardSlots').html( '' );
  $(".round .roundNumber").text(round)

  console.log(players);

  player1Cards = players.player1.setCards;
  const player1Points = players.player1.points;
  $(".infos .player1 .points").text(player1Points)

  for ( let i=0; i<player1Cards.length; i++ ) {

	  $(`<div class="card card1"><img src="${player1Cards[i].img}" class="card-image"></div>`).data( 'cardIndex', i ).data( 'cardInfos', player1Cards[i] ).attr( 'id', 'card'+player1Cards[i] ).appendTo( '.firstPlayer #cardPile' ).draggable( {
      containment: '.firstPlayer #content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
 
  firstPlayerCrdSlot = $('<div></div>').data( 'number', 1 ).appendTo( '.firstPlayer #cardSlots' ).droppable( {
    accept: '.firstPlayer #cardPile div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  } );


  player2Cards = players.player2.setCards;

  const player2Points = players.player2.points;
  $(".infos .player2 .points").text(player2Points)


  for ( let i=0; i<player2Cards.length; i++ ) {
	  $(`<div class="card card1"><img src="${player2Cards[i].img}" class="card-image"></div>`).data( 'cardIndex', i ).data( 'cardInfos', player2Cards[i] ).attr( 'id', 'card'+player2Cards[i] ).appendTo( '.secondPlayer #cardPile' ).draggable( {
      containment: '.secondPlayer #content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true,
    } );
  }
  
  secondPlayerCardSlot = $('<div></div>').data( 'number', 2 ).appendTo( '.secondPlayer #cardSlots' ).droppable( {
    accept: '.secondPlayer #cardPile div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  } );

  if (isFirstPlayer) {
    secondPlayerCardSlot.droppable( 'disable' );  
  }
}

function cardBattle(player1Card, player2Card) {
  if (player1Card.attack == player2Card.attack) return
  if (player1Card.attack > player2Card.attack) {
    players.player1.points++;
  }else{
    players.player2.points++;
  }
}

function whoWin() {
  if (players.player1.points == players.player2.points) {
    alert(`Personne n'a gagné !`)
    return
  }

  if (players.player1.points > players.player2.points) {
    alert(`${players.player1.name} a gagné !`)
  }else{
    alert(`${players.player2.name} a gagné !`)
  }
}