let round = 0;
$( init );
 
function init() {

  round = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
 
  const players = JSON.parse(localStorage.getItem("hbdm22"))
  console.log(players);
  const player1Cards = players.player1.setCards;
  const player1Name = players.player1.name;
  $(".firstPlayer .playername").text(player1Name)

  player1Cards.sort( function() { return Math.random() - .5 } );
 


  for ( let i=0; i<player1Cards.length; i++ ) {

	  $(`<div class="card card1"><img src="${player1Cards[i].img}" class="card-image"></div>`).data( 'number', player1Cards[i] ).attr( 'id', 'card'+player1Cards[i] ).appendTo( '.firstPlayer #cardPile' ).draggable( {
      containment: '.firstPlayer #content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
 
  
  for ( let i=0; i<1; i++ ) {
    $('<div></div>').data( 'number', i ).appendTo( '.firstPlayer #cardSlots' ).droppable( {
      accept: '.firstPlayer #cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }


  const player2Cards = players.player2.setCards;
  const player2Name = players.player2.name;
  $(".secondPlayer .playername").text(player2Name)
  player2Cards.sort( function() { return Math.random() - .5 } );


  for ( let i=0; i<player2Cards.length; i++ ) {

	  $(`<div class="card card1"><img src="${player2Cards[i].img}" class="card-image"></div>`).data( 'number', player2Cards[i] ).attr( 'id', 'card'+player2Cards[i] ).appendTo( '.secondPlayer #cardPile' ).draggable( {
      containment: '.secondPlayer #content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true,

    } );
  }
 
  
  for ( let i=0; i<1; i++ ) {
    $('<div></div>').data( 'number', i ).appendTo( '.secondPlayer #cardSlots' ).droppable( {
      accept: '.secondPlayer #cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
  
}

function handleCardDrop( event, ui ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );    
    // ui.draggable.position( { of: $(this), my: 'top center', at: 'top center' } );
    ui.draggable.draggable( 'option', 'revert', false );
    round++;
}

