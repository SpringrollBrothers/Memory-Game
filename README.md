# Memory Game 🎮  

An interactive memory game built with **HTML**, **CSS**, and **JavaScript**. Match all the pairs of cards while keeping track of your time and the number of flips you take. 

[**Try it out here!**](https://springrollbrothers.github.io/Memory-Game/)  

---

## Features 

- **Dynamic Gameplay**: Randomly shuffled cards ensure a unique experience every time.  
- **Timer Functionality**: Keep track of how long it takes you to complete the game.  
- **Flip Counter**: See how many flips you made to find all the matches.  
- **Winning Message**: Get a summary of your time and flips after completing the game.  

---

## How It Works   

1. **Start the Game**: Click on any card to flip it and reveal its front image.  
2. **Match Pairs**: Flip two cards to check if they match. If not, they will flip back.  
3. **Complete the Game**: Match all pairs to win. Your time and flip count will be displayed at the end.  
4. **Play Again**: Hit the restart button to try again and aim for a better score.  

---

## Technology Stack   

- **HTML**: Structure and layout of the game.  
- **CSS**: Styling for the cards and overall design.  
- **JavaScript**: Logic for shuffling cards, tracking time, counting flips, and checking matches.  

---

## Code Highlights   

### Shuffle Algorithm  
Ensures the cards are shuffled randomly for each new game.  

```javascript
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
