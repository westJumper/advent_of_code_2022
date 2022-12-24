const fs = require('fs');
const path = require('path');

// found online:
// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(y1, x1, y2, x2, y3, x3, y4, x4) {
  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false;
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false;
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false;
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1);
	let y = y1 + ua * (y2 - y1);

	return {x, y};
}

const run = async () => {
  fs.readFile(path.join(__dirname, './sample.txt'), 'utf8', (err, data) => {
    if (err) throw err;

    data = data.split('\r\n');

    let shapes = [];
    let allPoints = [];

    for (const line of data) {
      const xs = Number(line.split('x=')[1].split(',')[0]);
      const ys = Number(line.split('y=')[1].split(':')[0]);
      const xb = Number(line.split('x=')[2].split(',')[0]);
      const yb = Number(line.split('y=')[2].split(',')[0]);

      // here I add 1 to the distance to consider points 1 square outside of reach of the sensors
      let d = Math.abs(ys - yb) + Math.abs(xs - xb) + 1;

      let linesInShape = [];
      linesInShape.push([[ys + d, xs], [ys, xs + d]]); // bottom right
      linesInShape.push([[ys, xs + d], [ys - d, xs]]); // top right
      linesInShape.push([[ys - d, xs], [ys, xs - d]]); // top left
      linesInShape.push([[ys, xs - d], [ys + d, xs]]); // bottom left
      shapes.push(linesInShape);

      allPoints.push([ys, xs, d - 1]);
    }

    const intersections = [];

    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        const shape1 = shapes[i];
        const shape2 = shapes[j];

        for (let ii = 0; ii < 4; ii++) {
          for (let jj = 0; jj < 4; jj++) {
            const lineFromShape1 = shape1[ii];
            const lineFromShape2 = shape2[jj];

            let intersection = intersect(lineFromShape1[0][0], lineFromShape1[0][1], lineFromShape1[1][0], lineFromShape1[1][1], lineFromShape2[0][0], lineFromShape2[0][1], lineFromShape2[1][0], lineFromShape2[1][1]);

            if (intersection !== false) intersections.push(intersection);
          }
        }

      }
    }

    const bounds = 4000000//4000000;

    // compare all of the intersetions to all sensors.
    // find the single sensor that is further from every sensors distance
    for (let intersection of intersections) {
      intersection.y = Math.round(intersection.y);
      intersection.x = Math.round(intersection.x);

      // in bounds
      if (intersection.x > bounds || intersection.x < 0) continue;
      if (intersection.y > bounds || intersection.y < 0) continue;

      let valid = true;
      for (const point of allPoints) {
        let d = Math.abs(intersection.y - point[0]) + Math.abs(intersection.x - point[1]);
        if (d < point[2]) {
          valid = false;
          break;
        }
      }

      if (valid) console.log(intersection.x * bounds + intersection.y);
    }
    // -----------------
  });
}

console.time('run');
run();
console.timeEnd('run');