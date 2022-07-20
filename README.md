
<p align="center">
  <img alt="Nf6.io header" src="https://joshuafayer.com/wp-content/uploads/2022/04/nf6-sc.png" style="width: 600px;" />
</p>

# Nf6.io

A full-stack web app that generates art based on your chess games.

## How it works

Simply visit [nf6.io](https://nf6.io/) and paste a PGN (Portable Game Notation, which is a standard output for most chess software like [Lichess](https://lichess.org/) or [chess.com](https://chess.com/)) into the input box. Choose colors for the Black pieces and White pieces, set some other options such as enabling Dark Mode, and then click the save button!

You'll be given a permanent link where you can view your customized chess art! In addition, every game saved in Nf6.io has an image endpoint &mdash; simply visit:

`https://nf6.io/image/<gameid>/<size?>`

to download a dynamically-sized image export of your game.

## Example: The Opera Game

Below is a screenshot of the Nf6.io page for the famous Opera game, and its server-side rendered metadata:

<a href="https://www.nf6.io/2FuFNi">
  <p align="center">
    <img alt="Opera Game nf6.io page" src="https://joshuafayer.com/wp-content/uploads/2022/04/nf6snip.png" style="width: 500px" />
  </p>
</a>
<p align="center">
  <img align="center" alt="nf6.io open graph metadataa" src="https://joshuafayer.com/wp-content/uploads/2022/04/nf6preview.png" style="width: 300px" />
</p>
