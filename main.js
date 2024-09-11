const KeyGenerator = require("./KeyGenerator");
const HMACGenerator = require("./HMACGenerator");
const RuleEngine = require("./RuleEngine");
const HelpTable = require("./HelpTable");

function validateArgs(args) {
  if (args.length < 3 || args.length % 2 === 0) {
    console.error(
      "Error: Provide an odd number of arguments greater than or equal to 3."
    );
    console.error("Example: node main.js rock paper scissors");
    process.exit(1);
  }

  if (new Set(args).size !== args.length) {
    console.error("Error: Moves must be unique.");
    process.exit(1);
  }
}

function printMenu(moves) {
  console.log("Available moves:");
  moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
  console.log("0 - Exit");
  console.log("help - Show the help table");
}

function main() {
  const args = process.argv.slice(2);
  validateArgs(args);

  const moves = args;
  const key = KeyGenerator.generateKey();
  const computerMove = moves[Math.floor(Math.random() * moves.length)];
  const hmac = HMACGenerator.generateHMAC(key, computerMove);

  console.log(`HMAC: ${hmac}`);
  printMenu(moves);

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Enter your move: ", (input) => {
    if (input === "help") {
      const helpTable = new HelpTable(moves);
      helpTable.printTable();
    } else if (input === "0") {
      console.log("Exiting...");
    } else if (!isNaN(input) && input > 0 && input <= moves.length) {
      const playerMove = moves[input - 1];
      console.log(`Your move: ${playerMove}`);
      console.log(`Computer move: ${computerMove}`);

      const ruleEngine = new RuleEngine(moves);
      const result = ruleEngine.getWinner(playerMove, computerMove);
      console.log(result);
      console.log(`HMAC key: ${key}`);
    } else {
      console.error("Invalid input. Please try again.");
    }

    readline.close();
  });
}

main();
