/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, finalScore;
var dice1DOM = document.querySelector('.dice-1');
var dice2DOM = document.querySelector('.dice-2');
var scoreDOM = document.getElementById('final-score');


init();


document.querySelector('#final-score').addEventListener('input', function() { // event listener per ascoltare l'input che viene immesso nel campo 'final-score'

    finalScore = scoreDOM.value;
    //console.log('Final score: ' + finalScore);

});


document.querySelector('.btn-roll').addEventListener('click', function() {  // event listener per ascoltare il click del pulsante 'roll dice'

    if (gamePlaying) {

        if (!finalScore || finalScore < 100) { // se non è stato impostato il risultato finale o se minore di 100, questo viene automaticamente impostato a 100
            finalScore = 100;
            scoreDOM.value = 100;
        }

        scoreDOM.disabled = true; // disabilita il campo per settare il risultato finale

        var dice1 = Math.floor((Math.random() * 6)) + 1; // assegna a dice1 un numero a caso tra 1 e 6
        var dice2 = Math.floor((Math.random() * 6)) + 1; // assegna a dice2 un numero a caso tra 1 e 6

        dice1DOM.style.display = 'block'; // mostra il dado
        dice2DOM.style.display = 'block'; // =
        dice1DOM.src = 'dice-' + dice1 + '.png'; // cambia l'immagine del dado
        dice2DOM.src = 'dice-' + dice2 + '.png'; // =
        //console.log('dice1: ' + dice1 + ' dice2: ' + dice2);
    
        if (dice1 === 6 && dice2 === 6) { // se il giocatore tira due 6, il risutato totale si azzera

            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice1 !== 1 || dice2 !== 1) { // aggiorna il risultato se nessuno dei due dadi è 1

            roundScore += (dice1 + dice2); // aggiorna il risultato
            document.querySelector('#current-' + activePlayer).textContent = roundScore;         
    
        } else {
    
            nextPlayer();
    
        }

    }

});


document.querySelector('.btn-hold').addEventListener('click', function() { // event listener per ascoltare il click sul pulsante 'hold'

    if (gamePlaying) {

        scores[activePlayer] += roundScore; // aggiorna il risultato globale del giocatore attivo

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; // aggiorna l'interfaccia grafica col risultato
    
        // if (!finalScore || finalScore < 100) { // se non viene impostato il risultato finale, questo viene automaticamente impostato a 100
        //     finalScore = 100;
        // }

        if (scores[activePlayer] >= finalScore) { // controlla se c'è un vincitore
    
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            dice1DOM.style.display = 'none';
            dice2DOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            finalScore = undefined;
    
        } else {
    
            nextPlayer(); // passa la mano
    
        }

    }

});


function nextPlayer() { // funzione per cambiare il giocatore attivo

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // cambia giocatore se il risultato del lancio è 1
    roundScore = 0; // resetta il risultato della mano

    document.getElementById('current-0').textContent = 0; // azzera il risultato di player 1
    document.getElementById('current-1').textContent = 0; // azzera il risultato di player 2

    document.querySelector('.player-0-panel').classList.toggle('active'); // attiva/disattiva player 1 (interfaccia grafica)
    document.querySelector('.player-1-panel').classList.toggle('active'); // attiva/disattiva player 2 (interfaccia grafica)

    dice1DOM.style.display = 'none'; // nasconde il dado
    dice2DOM.style.display = 'none'; // =

}


document.querySelector('.btn-new').addEventListener('click', function() { // event listener per ascoltare il click sul pulsante 'new game'

    init();
    
    scoreDOM.disabled = false;
    
});


function init() { // inizializza il gioco

    scores = [0, 0]; // array per memorizzare il risultato dei due giocatori
    roundScore = 0; // memorizza il risultato della mano corrente
    activePlayer = 0; // 0: primo giocatore, 1: secondo giocatore
    gamePlaying = true; // variabile di stato che controlla se il gioco è in atto o finito

    dice1DOM.style.display = 'none'; // modifica il css per nascondere il dado
    dice2DOM.style.display = 'none'; // =

    document.getElementById('score-0').textContent = '0'; // azzera il totale del primo giocatore...
    document.getElementById('score-1').textContent = '0'; // ... e del secondo
    document.getElementById('current-0').textContent = '0'; // azzera il risultato corrente del primo giocatore...
    document.getElementById('current-1').textContent = '0'; // ... e del secondo

    document.getElementById('name-0').textContent = 'Player 1';  // ripristina i nomi dei giocatori
    document.getElementById('name-1').textContent = 'Player 2';  // =

    document.querySelector('.player-0-panel').classList.remove('winner'); // rimuove la classe 'winner' dai giocatori
    document.querySelector('.player-1-panel').classList.remove('winner'); // =

    document.querySelector('.player-0-panel').classList.remove('active'); // rimuove la classe 'active' dai giocatori
    document.querySelector('.player-1-panel').classList.remove('active'); // =

    document.querySelector('.player-0-panel').classList.add('active'); // assegna al primo giocatore la classe 'active'

}