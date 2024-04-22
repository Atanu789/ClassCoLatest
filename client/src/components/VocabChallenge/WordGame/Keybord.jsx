const rows = ["QWERTYUIOP", "ASDFGHJKL+", "ZXCVBNM-"];

const getColor = (letter, solution, guesses) => {
  const ind = solution.indexOf(letter);
  if (ind === -1) return "wrong";

  if (guesses.find((guess) => guess[ind] === letter)) return "correct";

  return "semi-correct";
};

const Keyboard = ({ letters, solution, guesses }) => (
  <div className="keyboard">
    {rows.map((row, rowIdx) => (
      <div key={rowIdx} className="keyboard__row">
        {row.split("").map((letter, letterIdx) => (
          <div
            key={letterIdx}
            className={`keyboard__letter ${
              letters.includes(letter) && getColor(letter, solution, guesses)
            }`}
          >
            {letter === "+" ? "Enter" : letter === "-" ? "Delete" : letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Keyboard;