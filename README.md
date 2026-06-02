# Flappy Rubika

A browser game I made as a time-pass project during my MSc. No grand ambitions here. I wanted to see how far I could push Claude on a fun idea, and this is what came out. The whole thing was a test of what Claude could build from scratch, and honestly the result was way more polished than I expected.

The game itself is a personalised gift for a friend. The bird and the obstacles use custom photos of real people and real things instead of generic sprites. It runs entirely in the browser with zero dependencies.

---

## How to play

1. Open index.html in any modern browser.
2. Press space or click anywhere to make the bird jump and avoid the pipes.
3. Collect the falling items to activate power-ups that slow down or speed up the game.
4. Pass all 15 pipes to reach the rescue mission ending.

---

## Built with Claude

This entire project was generated and refactored by Claude. The original game logic, the canvas rendering, the particle system, the parallax background, the power-up mechanics, and the multi-file project structure were all produced through conversation with the AI. I did not write the JavaScript by hand.

The point was not to ship a serious game. The point was to find out what Claude could do when given a fun brief and room to run. It turns out the answer is: quite a lot.

---

## Project structure

    Flappy_Rubika/
        index.html          The main HTML entry point with the canvas and UI markup.
        css/
            style.css       All styles for the game container, menus, buttons, and layout.
        js/
            config.js       Canvas dimensions and the pipe colour theme definitions.
            assets.js       Image loading, DOM element references, and the star background.
            state.js        Game state variables and the init function that resets them.
            input.js        Keyboard and mouse event listeners for player controls.
            physics.js      Gravity, collision detection, screen shake, and background scroll.
            powerups.js     Power-up spawning, collection, effect application, and timer logic.
            renderer.js     All canvas drawing functions including bird, pipes, HUD, and particles.
            score.js        The score increment function and combo flash trigger.
            game.js         The main game loop, update function, and state machine.
            main.js         Entry point that starts the animation on page load.
        Pics/
            ach.png         Photo of the partner character shown in the ending sequence.
            background.jpg  Background image used as the repeating parallax layer.
            food1.png       Photo used for the food power-up item.
            obstacle.png    Photo used for the obstacle power-up item.
            pujhappy.png    Bird sprite for the happy state after collecting food.
            pujnormal.png   Bird sprite for the default flying state.
            pujsad.png      Bird sprite for the collision and obstacle state.
        README.md           This file.
        .gitignore          Excludes system files and build artefacts from version control.

---

## Features

1. Custom photo assets for the bird, partner character, and power-up items.
2. A power-up system with two item types that slow down or speed up the game.
3. A rescue mission ending sequence that plays after all 15 pipes are cleared.
4. High score saved in localStorage so progress persists between sessions.
5. Works on desktop and mobile with keyboard, click, and touch input.

---

## Running

Clone the repo and open index.html in any modern browser. No build step required.
