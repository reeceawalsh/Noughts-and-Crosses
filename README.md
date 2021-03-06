# Noughts and Crosses

## Comments

Pre-start: I'm going to try and spend more time on the javascript and less time on the styling.

During: I ended up spending 80% of my time on styling and the 20% of the time I spent on javascript was mostly related to the styling, by mostly I mean completely. I was playing around with animations and transitions a lot and had a lot of fun, I love the style and colour theme I have and I only need a few more elements to complete it.

In regards to the javascript, I will be able to have fun working that out tomorrow. I can't see it being too difficult but I'm not sure yet, maybe the AI will be difficult to implement. The specification really seems to be pushing us to write neater and more functional code so I might have to plan a little more than usual.

The only issue I can think of is that I have an idea how to create the game but not in the style that the specification requests (creating game, player, and gameboard objects), for a start I don't need a gameboard object because I created the board and can add the x's and o's via classList.add so my code is going to be a bit different than requested.

Finished base features: I haven't implemented a good AI, just a rubbish one. I could make a halfway decent one with a lot of code but I know there will be a way to do it with just a bit of code so I'll learn how to do that and implement it later. I've added mobile media queries and all the functionality requested is working apart from naming yourself which I didn't want anyway. 

### Link

### Specification

Set up your project with a HTML, CSS and Javascript files and get the Git repo all set up.

You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.

Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)

Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!

Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!

Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

Start by just getting the computer to make a random legal move.

Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!
