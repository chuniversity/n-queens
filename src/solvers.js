/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n, rowIndex = 0, colIndex = 0) {
  var solution = undefined;
  var board = new Board({ n: n });
  var rows = board.rows();
  for (var i = rowIndex; i < rows.length; i++) {
    for (var j = colIndex; j < rows[i].length; j++) {
      var piece = rows[i][j];
      if (piece === 1) {
        continue;
      } else {
        board.togglePiece(i, j);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(i, j);
        }
      }
    }
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {

  var solutionCount = 0;

  var board = new Board({ n: n });
  var findSolution = function (row) {
    // if all rows exhausted
    if (row === n) {
      // increment solution count
      solutionCount++;
      // stop
      return;
    }

    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // if board does not have any conflicts -> recurse into remaining problem
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      // unplace a piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// displayBoard([
//     1  2  3  4
// a  [0, 1, 0, 0]
// b  [0, 0, 0, 0]
// c  [0, 0, 0, 0]
// d  [0, 0, 0, 0]
// ]);

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {

  var board = new Board({ n: n });
  var solution = board.rows()
  var rows = board.rows()

  var fn = function (board, row) {
    //base case
    if (row === n) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
      return board.rows()
    } else {
      for (var i = 0; i < rows.length; i++) {
        board.togglePiece(row, i)
        if (!board.hasAnyQueensConflicts()) {
          var result = fn(board, row + 1)
          if (result) {
            return result
          }
        }
        board.togglePiece(row, i)
      }
    }
  }
  fn(board, 0)
  return solution

}


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var board = new Board({ n: n });

  var solutionCount = 0;

  var findSolution = function (row) {
    // if all rows exhausted
    if (row === n) {
      // increment solution count
      solutionCount++;
      // stop
      return;
    }
    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // if board does not have any conflicts -> recurse into remaining problem
      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      // unplace a piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
