const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies,
    Body,
    Events,
    // MouseConstraint, 
    // Mouse 
} = Matter;

const width = window.innerWidth * 0.98;
const height = window.innerHeight * 0.98;
const cellsX = 20;
const cellsY = 12;
const ballVelocity = 2;

const unitLengthX = width / cellsX;
const unitLengthY = height / cellsY;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});
Render.run(render);
Runner.run(Runner.create(), engine)

// World.add(world, MouseConstraint.create(engine, {
//     mouse: Mouse.create(render.canvas)
// }))

//Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 2, {isStatic: true}),
    Bodies.rectangle(width/2, height, width, 2, {isStatic: true}),
    Bodies.rectangle(0, height/2, 2, height, {isStatic: true}),
    Bodies.rectangle(width, height/2, 2, height, {isStatic: true})
]
World.add(world, walls)

//Random Shapes
// for (let i=0; i < 50; i++){
//     if(Math.random() > 0.5) {
//         World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
//     } else {
//         World.add(world, Bodies.circle(Math.random() * width, Math.random() * height, 40, {
//             render: {
//                 fillStyle: 'green'
//             }
//         }));
//     };
// }; 

// Maze generation

const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
}

const grid = Array(cellsY)
    .fill(null)
    .map(() => Array(cellsX)
        .fill(false));
const verticals = Array(cellsY)
    .fill(null)
    .map(() => Array(cellsX -1)
        .fill(false));
const horizontals = Array(cellsY -1)
    .fill(null)
    .map(() => Array(cellsX)
        .fill(false));


const startRow = Math.floor(Math.random() * cellsY);
const startColumn = Math.floor(Math.random() * cellsX);

const buildMaze = (row, column) => {
    //If I have visted the cell at [row, column], then return
    if (grid[row][column]){
        return;
    }
    //Mark this cell as being visited
    grid[row][column] = true;
    //Assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row -1, column, 'up'],
        [row, column +1, 'right'],
        [row +1, column, 'down'],
        [row, column -1, 'left']
    ]);
    //for each neighbor...
    for (let neighbor of neighbors){
        const [nextRow, nextColumn, direction] = neighbor;
        // See if that neighbor is out of bounds
        if (nextRow < 0 || nextRow >= cellsY || nextColumn < 0 || nextColumn >= cellsX){
            continue;
        };
        //If we have visited that neighbor, continue to next neighbor
        if (grid[nextRow][nextColumn]){
            continue;
        };
        //Remove a wall from either horizontals or verticals
        if (direction === 'left') {
            verticals[row][column -1] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') {
            horizontals[row -1][column] = true;
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        };
    //Visit that next cell
        buildMaze(nextRow, nextColumn)
    };
};
buildMaze(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open){
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            4,
            {isStatic: true, label: 'wall', render: {fillStyle: 'red'}}
        );
        World.add(world, wall);
    });
});
verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open){
            return;
        }
        const wall = Bodies.rectangle(
            columnIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            4,
            unitLengthY,
            {isStatic: true, label: 'wall', render: {fillStyle: 'red'}}
        );
        World.add(world, wall);
    });
});

//Goal
const goal = Bodies.rectangle(
    width - unitLengthX/2,
    height - unitLengthY/2,
    unitLengthX * .7,
    unitLengthY * .7,
    {isStatic: true, label: 'goal', render: {fillStyle: 'green'}}
);
World.add(world, goal);

//Ball
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
    unitLengthX/2,
    unitLengthY/2,
    ballRadius,
    {label: 'ball', render: {fillStyle: 'blue'}}
);
World.add(world, ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity
    if (event.keyCode === 38){
        Body.setVelocity(ball, {x, y: y - ballVelocity });
    }
    if (event.keyCode === 39){
        Body.setVelocity(ball, {x: x + ballVelocity, y });
    }
    if (event.keyCode === 40){
        Body.setVelocity(ball, {x, y: y + ballVelocity });
    }
    if (event.keyCode === 37){
        Body.setVelocity(ball, {x: x - ballVelocity, y });
    }
})

//Win Condition

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach((collision) => {
        const labels = ['ball', 'goal'];
        if (
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            world.bodies.forEach((body) => {
                if (body.label === 'wall' || body.label === 'goal') {
                    Body.setStatic(body, false);
                }
            })
        }
    })
})