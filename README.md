## About
Wanted to play around with canvas for a bit and thought making the basic
pong game loop using only a canvas element could be a fun little project.

The goal here for me was coming up with ideas for making the player paddles
and the ball move, creating boundaries for the ball to bounce off of and create
a basic collision detection box, as well as managing basic state for the game
loop to work, and to just have fun and learn from little throw-away projects
like these.

Since learning and having fun was the main goal here, I've avoided using
any libraries and frameworks as I wanted to explore and test my own ideas
and solutions.

The code got pretty messy, with a fair amount of redundant code, poorly
readable code and just a lot of stuff that should be changed and refactored.

At the time this readme is being added, the project was finished / dropped
3 months prior. And much has been learned since!

## View the demo
Since the page literally doesn't have anything but a canvas elements, there's
no instructions or controls listed whatsoever, so I'll list them here in case
you want to interact with it.

### Controls
- Paddle Left: W (up) / S (down)
- Paddle Right: Arrow Up (up) / Arrow Down (down)
- Spacebar sets the ball's initial velocity, which starts a new round.
- CTRL+Q stops the rAF loops that's used for frame updates, basically pausing
  the game (with no way to resume!). Basically a kill switch in case I'd end up
  stuck in an infinite loop during development.

You can view the project at [pong-js](https://mijo88.github.io/slider-demo/).