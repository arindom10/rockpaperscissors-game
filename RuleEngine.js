class RuleEngine {
  constructor(moves) {
    this.moves = moves;
    this.totalMoves = moves.length;
  }

  getWinner(playerMove, computerMove) {
    if (playerMove === computerMove) return "Draw";

    const playerIndex = this.moves.indexOf(playerMove);
    const computerIndex = this.moves.indexOf(computerMove);

    // Determine the half-circle range that the player wins against.
    const half = Math.floor(this.totalMoves / 2);

    // Check if the player's move wins or loses
    if (
      (computerIndex > playerIndex && computerIndex <= playerIndex + half) ||
      (computerIndex + this.totalMoves > playerIndex &&
        computerIndex + this.totalMoves <= playerIndex + half)
    ) {
      return "You Lose";
    } else {
      return "You Win";
    }
  }
}

module.exports = RuleEngine;
