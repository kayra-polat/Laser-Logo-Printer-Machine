
// @author KAYRA POLAT

const { exit } = require('process');

let directions_array, input, grid, logos_dict, nx, ny, tmp, tmp2, coor_x, coor_y;
logos_dict = {};
grid = [];
let tempGrid1 = [], tempGrid2 = [];

// THESE TWO METHOD USED FOR FINDING APPROPRIATE COORDINATES. WHEN WE USE THESE COORDINATES WITH ENGRAVE METHOD,
// OUR SHAPES JUSTIFY LEFT CORNER OF OUR GRID

// FINDING APPROPRIATE X COORDINATE TO GIVEN SHAPE 
const findAppropriateXcoordinate = (directions) => {
  let x = 1, down = 0;

  for (let letter of directions) {
    if (letter === 'U') {
      if (down > 0) {
        down--;
      }
      else x--;
    }
    if (letter === 'D') down++;
  }

  if (x < 1) x = 2 - x;

  return x;
}
// FINDING APPROPRIATE X COORDINATE TO GIVEN SHAPE 
const findAppropriateYcoordinate = (directions) => {
  let y = 1, right = 0;

  for (let letter of directions) {
    if (letter === 'L') {
      if (right > 0) {
        right--;
      }
      else y--;
    }
    if (letter === 'R') right++;
  }

  if (y < 1) y = 2 - y;

  return y;
}

// SHRINKING TO GIVEN GRIDS FOR TAKE CLEAR OUTPUTS
const shrinkGrid = (grd1, grd2) => {
  let copiedgrid1 = [], copiedgrid2 = [];

  for (var i = 0; i < grd1.length; i++)
    copiedgrid1[i] = grd1[i].slice();

  let cp1 = copiedgrid1[0]?.length;

  for (var i = 0; i < grd2.length; i++)
    copiedgrid2[i] = grd2[i].slice();

  let cp2 = copiedgrid2[0].length;

  // SHRINK LEFT TO RIGHT. IF SEE CHARACTERS LİKE "-" or "|" THEN STOP SHRINKING AND MOVE TO NEXT ROW. IF SEE CHARACTERS LIKE
  // "." OR " " THEN CONTINUE TO SHRINKING WITH SLICE METHOD
  for (let i = 0; i < copiedgrid1.length; i++) {
    cp1 = copiedgrid1[i].length;
    for (let j = cp1 - 1; j >= 0; j--) {
      if (copiedgrid1[i][cp1 - 1] === "-" || copiedgrid1[i][cp1 - 1] === "|") break;
      if (copiedgrid1[i][cp1 - 1] === "." || copiedgrid1[i][cp1 - 1] === " ") {
        copiedgrid1[i].splice(cp1 - 1, 1);
        cp1--;
      }
      else {
        cp1--;
      }

    }
  }

  // SHRINK RIGHT TO LEFT. IF SEE CHARACTERS LİKE "-" or "-" THEN STOP SHRINKING AND MOVE TO NEXT ROW. IF SEE CHARACTERS LIKE
  // "." OR " " THEN CONTINUE TO SHRINKING WITH SLICE METHOD
  for (let i = 0; i < copiedgrid1.length; i++) {
    cp1 = copiedgrid1[i].length;
    if (cp1 == 0) continue;
    for (let j = 0; j < copiedgrid1[i].length; j++) {
      if (copiedgrid1[i][0] === "-" || copiedgrid1[i][0] === "|") break;
      if (copiedgrid1[i][0] === "." || copiedgrid1[i][0] === " ") {
        copiedgrid1[i].splice(0, 1);
      }
    }
  }

  // CLEAR EMPTY ARRAYS
  copiedgrid1 = copiedgrid1.filter(value => value.length !== 0);

  // SHRINK LEFT TO RIGHT. IF SEE CHARACTERS LİKE "-" or "|" THEN STOP SHRINKING AND MOVE TO NEXT ROW. IF SEE CHARACTERS LIKE
  // "." OR " " THEN CONTINUE TO SHRINKING WITH SLICE METHOD
  for (let i = 0; i < copiedgrid2.length; i++) {
    cp2 = copiedgrid2[i].length;
    for (let index = cp2 - 1; index >= 0; index--) {
      if (copiedgrid2[i][cp2 - 1] === "-" || copiedgrid2[i][cp2 - 1] === "|") break;
      if (copiedgrid2[i][cp2 - 1] === "." || copiedgrid2[i][cp2 - 1] === " ") {
        copiedgrid2[i].splice(cp2 - 1, 1);
        cp2--;
      }
      else {
        cp2--;
      }
    }
  }

  // SHRINK RIGHT TO LEFT. IF SEE CHARACTERS LİKE "-" or "|" THEN STOP SHRINKING AND MOVE TO NEXT ROW. IF SEE CHARACTERS LIKE
  // "." OR " " THEN CONTINUE TO SHRINKING WITH SLICE METHOD
  for (let i = 0; i < copiedgrid2.length; i++) {
    cp2 = copiedgrid2[i].length;
    if (cp2 == 0) continue;
    for (let j = 0; j < copiedgrid2[i].length; j++) {
      if (copiedgrid2[i][0] === "-" || copiedgrid2[i][0] === "|") break;
      if (copiedgrid2[i][0] === "." || copiedgrid2[i][0] === " ") {
        copiedgrid2[i].splice(0, 1);
      }
    }
  }

  // CLEAR EMPTY ARRAYS
  copiedgrid2 = copiedgrid2.filter(value => value.length !== 0);

  return { copiedgrid1, copiedgrid2 };

}

// ROTATING METHOD FOR 90 DEGREE
const rotate90degree = (movementString) => {
  let rotetedmovements = "";
  movementString.split("").forEach(element => {
    switch (element) {
      case "R":
        rotetedmovements += "D";
        break;
      case "L":
        rotetedmovements += "U";
        break;
      case "U":
        rotetedmovements += "R";
        break
      case "D":
        rotetedmovements += "L";
        break
      default:
        break;
    }
  });

  return rotetedmovements;
}

// CREATE AN EMPTY GRID AND ENGRAVE IT WITH GIVEN SHAPE
const createAndEngraveGrid = (x, y, whole_ways, full_grid) => {

  // CREATING 11x11 GRID

  full_grid = [];

  for (var i = 0; i < 11; i++) {
    tmp = [];
    tmp2 = [];

    for (var j = 0; j < 11; j++) {
      tmp.push(".");
      //tmp.push("_");
      tmp.push(" ");
    }

    full_grid.push(tmp.slice(0, tmp.length - 1));

    for (let index = 0; index < 22; index++) {
      //tmp2.push("_");
      tmp2.push(" ");

    }
    full_grid.push(tmp2.slice(0, tmp2.length - 1));
  }

  // ENGRAVE given DIRECTONS to given COORDINATES to the 11x11 GRID
  for (let direction of whole_ways) {
    nx = (x - 1) * 2;
    ny = (y - 1) * 2;
    if (direction === "D") {
      full_grid[nx + 1][ny] = "|";
      [x, y] = [x + 1, y];
    }
    else if (direction === "U") {
      full_grid[nx - 1][ny] = "|";
      [x, y] = [x - 1, y];
    }
    else if (direction === "L") {
      full_grid[nx][ny - 1] = "-";
      [x, y] = [x, y - 1];
    }
    else {
      full_grid[nx][ny + 1] = "-";
      [x, y] = [x, y + 1];
    }
  }

  return full_grid;
}

// PRINT ENGRAVED GRID
const print_engraved_grid = (grid_11x11) => {

  for (var i = 0; i < grid_11x11.length - 1; i++) {
    for (var j = 0; j < grid_11x11[0].length; j++) {
      process.stdout.write((grid_11x11[i][j]));
    }
    process.stdout.write("\n");
  }
}

// USER INPUT PART

let first_command;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const read_input = () => {
  readline.question('INPUT: ', name => {
    input = name.split(" ");
    first_command = input[0].toUpperCase();

    switch (first_command) {
      case "LOGO":
        var isEqual = 0;
        if (input.length === 3) {
          for (let element in logos_dict) {
            if (element == input[1]) isEqual = 1;
          }
          if (isEqual == 1) {
            console.log("This logo already defined. Please try new logo!!")
            break;
          }
          logos_dict[input[1]] = input[2];
          console.log(input[1], "defined");
        }
        else {
          console.log("INPUT IS WRONG. PLEASE WRITE APPROPRIATE INPUT!");
        }
        break;
      case "ENGRAVE":
        let isDefined = false;
        if (input.length === 4) {
          coor_x = Number.parseInt(input[2]);
          coor_y = Number.parseInt(input[3]);

          if(isNaN(coor_x) || isNaN(coor_y)){
            console.log("Please write a NUMBER for x and y coordinates!!");
            break;
          }

          for (let logo in logos_dict) {
            if (logo == input[1]) isDefined = true;
          }

          if (isDefined == true) {
            directions_array = logos_dict[input[1]];
            grid = createAndEngraveGrid(coor_x, coor_y, directions_array, grid);
            print_engraved_grid(grid);
          }
          else {
            console.log("This logo name didn't define yet. Please define FIRST, then ENGRAVE the defined LOGO!!");
          }
        }
        else {
          console.log("INPUT IS WRONG. PLEASE WRITE APPROPRIATE INPUT!");
        }
        break;
      case "SAME":

        // FIRST WE FOUND APPROPRIATE COORDINATES( BASICALLY WE JUSTIFY OUR SHAPE TO LEFT.). 
        //THEN WE CREATE THIS SHAPE IN A GRID.
        let x, y, isFound = false;
        let final_grid1 = [], final_grid2 = [];

        x = findAppropriateXcoordinate(logos_dict[input[1]]);
        y = findAppropriateYcoordinate(logos_dict[input[1]]);

        tempGrid1 = createAndEngraveGrid(x, y, logos_dict[input[1]], tempGrid1);

        x = findAppropriateXcoordinate(logos_dict[input[2]]);
        y = findAppropriateYcoordinate(logos_dict[input[2]]);

        tempGrid2 = createAndEngraveGrid(x, y, logos_dict[input[2]], tempGrid2);

        // WE CALL SHRINKING FUNCTION. SHRINKED SHAPES ARE RETURN.
        const result = shrinkGrid(tempGrid1, tempGrid2);
        final_grid1 = result.copiedgrid1;
        final_grid2 = result.copiedgrid2;

        // COMPARE TWO GRID(SHAPES). IF SHAPES ARE EQUAL, THEN OUR OUTPUT IS YES. OTHERWISE ELSE PART EXECUTED
        if (JSON.stringify(final_grid1) === JSON.stringify(final_grid2)) {
          console.log("Yes");
          isFound = true;
          break;
        }

        // WITH ROTATE FUNCTION, WE CAN ROTATE OUR INPUT MOVEMENTS TO 90, 180 AND 270 DEGREE.
        // AFTER FOR ALL ROTATE WE MUST EXECUTE THE SAME CODES LIKE IN GIVEN ABOVE.
        else {
          for (let index = 0; index < 3; index++) {
            let new_movement;
            switch (index) {
              case 0:
                // 90 degree
                new_movement = rotate90degree(logos_dict[input[2]]);
                break;
              case 1:
                // 180 degree
                new_movement = rotate90degree(logos_dict[input[2]]);
                new_movement = rotate90degree(new_movement);
                break;
              case 2:
                // 270 degree
                new_movement = rotate90degree(logos_dict[input[2]]);
                new_movement = rotate90degree(new_movement);
                new_movement = rotate90degree(new_movement);
                break;
              default:
                break;
            }
            x = findAppropriateXcoordinate(new_movement);
            y = findAppropriateYcoordinate(new_movement);

            tempGrid2 = createAndEngraveGrid(x, y, new_movement, tempGrid2);

            const result = shrinkGrid([], tempGrid2);
            final_grid2 = result.copiedgrid2;

            if (JSON.stringify(final_grid1) === JSON.stringify(final_grid2)) {
              console.log("Yes");
              isFound = true;
              break;
            }
          }
        }

        if (isFound == false) console.log("No");

        break;
      case "EXIT":
        exit();
      default:
        console.log("INPUT IS WRONG. PLEASE WRITE APPROPRIATE INPUT!");
        break;
    }
    read_input();
  });
}
read_input();