# Nf6.io

A full-stack web app that generates art based on your chess games.

## How it works

Simply visit [nf6.io](https://nf6.io/) and paste a PGN (Portable Game Notation, which is a standard output for most chess software like [Lichess](https://lichess.org/) or [chess.com](https://chess.com/)) into the input box. Choose colors for the Black pieces and White pieces, set some other options such as enabling Dark Mode, and then click the save button!

You'll be given a permanent link where you can view your customized chess art! In addition, every game saved in Nf6.io has an image endpoint &mdash; simply visit:

`https://nf6.io/image/<gameid>/<size?>`

to download a dynamically-sized image export of your game.