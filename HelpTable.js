class HelpTable {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const table = [];
    const header = ["Move"].concat(this.moves);
    table.push(header);

    for (let i = 0; i < this.moves.length; i++) {
      const row = [this.moves[i]];
      for (let j = 0; j < this.moves.length; j++) {
        if (i === j) {
          row.push("Draw");
        } else {
          const ruleEngine = new (require("./RuleEngine"))(this.moves);
          row.push(ruleEngine.getWinner(this.moves[i], this.moves[j]));
        }
      }
      table.push(row);
    }

    return table;
  }

  printTable() {
    const table = this.generateTable();
    table.forEach((row) => {
      console.log(row.join("\t"));
    });
  }
}

module.exports = HelpTable;
