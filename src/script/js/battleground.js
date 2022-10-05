let round = 0;
$( init );
 
function init() {

  round = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );
 
  // Create the pile of shuffled cards
  var cards = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  cards.sort( function() { return Math.random() - .5 } );
 
 

  for ( var i=0; i<cards.length; i++ ) {

	$('<div class="card card1"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hearthstone-ragnaros.png" class="card-image"></div>').data( 'number', cards[i] ).attr( 'id', 'card'+cards[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }
 
  
  for ( let i=0; i<2; i++ ) {
    $('<div></div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }
  let cardContainer = $(".card")
}

function handleCardDrop( event, ui ) {

 
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    round++;
}

