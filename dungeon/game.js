const SIZE=5;

const icons={
    ogre:"icons/ogre.png",
    coin:"icons/coin.png",
    treasure:"icons/treasure.png",
    castle:"icons/castle.png",
    goblin:"icons/goblin.png",
    player:"icons/player.png"
};

let map;
let visited;
let player;
let coins;
let ogres;
let treasureFound;
let goblinsFound;
let castlesFound;

const grid=document.getElementById("grid");
const gridWrapper = grid;

let playerIcon = null;

// ======== Grid & Labels ========
function createGrid(){
    grid.innerHTML="";
    for(let r=0;r<SIZE;r++){
        for(let c=0;c<SIZE;c++){
            let cell=document.createElement("div");
            cell.className="cell";
            cell.dataset.r=r;
            cell.dataset.c=c;
            cell.onclick=()=>move(r,c);
            grid.appendChild(cell);
        }
    }
}

function createLabels(){
    const top=document.getElementById("topLabels");
    const side=document.getElementById("sideLabels");
    top.innerHTML="";
    side.innerHTML="";
    top.appendChild(document.createElement("div")); // empty corner
    for(let i=1;i<=SIZE;i++){
        let d=document.createElement("div");
        d.className="label";
        d.textContent=i;
        top.appendChild(d);
    }
    const letters=["A","B","C","D","E"];
    for(let l of letters){
        let d=document.createElement("div");
        d.className="label";
        d.textContent=l;
        side.appendChild(d);
    }
}

// ======== Map Generation ========
function randomCell(){return [Math.floor(Math.random()*SIZE),Math.floor(Math.random()*SIZE)];}

function generateMap(){
    map=[...Array(SIZE)].map(()=>Array(SIZE).fill("coin"));

    let placed=0;
    while(placed<4){
        let [r,c]=randomCell();
        if(map[r][c]=="coin"){
            map[r][c]="ogre";
            placed++;
        }
    }

    placed=0;
    while(placed<2){
        let [r,c]=randomCell();
        if(map[r][c]=="coin"){
            map[r][c]="treasure";
            placed++;
        }
    }

    for(let r=0;r<SIZE;r++){
        for(let c=0;c<SIZE;c++){
            if(map[r][c]!="coin") continue;

            let diag=false, ortho=false;

            for(let dr=-1;dr<=1;dr++){
                for(let dc=-1;dc<=1;dc++){
                    if(dr==0 && dc==0) continue;
                    let rr=r+dr, cc=c+dc;
                    if(rr<0||rr>=SIZE||cc<0||cc>=SIZE) continue;
                    if(map[rr][cc]=="ogre"){
                        if(Math.abs(dr)==1&&Math.abs(dc)==1) diag=true;
                        if(dr==0||dc==0) ortho=true;
                    }
                }
            }

            if(diag) map[r][c]="castle";
            else if(ortho) map[r][c]="goblin";
        }
    }
}

// ======== Icons ========
function icon(name){
    let img = document.createElement("img");
    img.src = icons[name];
    if(name === "player") img.classList.add("player-img");
    return img;
}

// ======== Game Draw ========
function draw(){
    if(!playerIcon){
        playerIcon = icon("player");
        gridWrapper.appendChild(playerIcon);
        playerIcon.style.position="absolute";
        playerIcon.style.pointerEvents="none";
    }

    const cell=grid.children[player.r*SIZE + player.c];
    const rect=cell.getBoundingClientRect();
    const gridRect=gridWrapper.getBoundingClientRect();
    const x=rect.left-gridRect.left;
    const y=rect.top-gridRect.top;

    playerIcon.style.transform=`translate(${x}px, ${y}px)`;
}

function reveal(r,c){
    const tile=map[r][c];
    const cell=grid.children[r*SIZE+c];
    cell.innerHTML="";
    if(tile in icons){
        cell.appendChild(icon(tile));
    }
}

// ======== Game Logic ========
function move(r,c){
    if(Math.abs(player.r-r)+Math.abs(player.c-c)!=1) return;

    player.r=r;
    player.c=c;
    const key=r+","+c;

    if(!visited.has(key)){
        visited.add(key);
        reveal(r,c);

        const tile=map[r][c];

        if(tile=="coin") coins++;
        if(tile=="ogre"){ogres++; coins=Math.max(0,coins-1);}
        if(tile=="goblin") goblinsFound++;
        if(tile=="castle") castlesFound++;
        if(tile=="treasure"){treasureFound++; rollItem();}
    }

    if(ogres>=3) end(false);
    if(treasureFound>=2) end(true);

    updateStats();
    draw();
}

function rollItem(){
    const items=["potion","crossbow","skull"];
    const item=items[Math.floor(Math.random()*items.length)];

    if(item=="potion"){
        ogres=Math.max(0,ogres-1);
    }
    if(item=="crossbow"){
        let list=[];
        for(let r=0;r<SIZE;r++){
            for(let c=0;c<SIZE;c++){
                if(map[r][c]=="ogre") list.push([r,c]);
            }
        }
        if(list.length){
            let pick=list[Math.floor(Math.random()*list.length)];
            map[pick[0]][pick[1]]="coin";
        }
    }
    if(item=="skull") ogres++;
}

function updateStats(){
    document.getElementById("coins").textContent=coins;
    document.getElementById("ogres").textContent=ogres;
    document.getElementById("treasureCount").textContent=treasureFound;
}

function end(win){
    let score=(goblinsFound+castlesFound)*coins - ogres*2;
    setTimeout(()=>{alert((win?"You win":"You died")+" | Score: "+score)},50);
}

// ======== New Game =======
function newGame(){
    visited=new Set();
    player={r:3,c:2};
    coins=0; ogres=0; treasureFound=0; goblinsFound=0; castlesFound=0;
    generateMap();
    updateStats();
    draw();
}

// ======== Keyboard Movement ========
document.addEventListener("keydown",(e)=>{
    let r=player.r, c=player.c;
    if(e.key==="ArrowUp"||e.key==="w") r--;
    else if(e.key==="ArrowDown"||e.key==="s") r++;
    else if(e.key==="ArrowLeft"||e.key==="a") c--;
    else if(e.key==="ArrowRight"||e.key==="d") c++;

    if(r>=0 && r<SIZE && c>=0 && c<SIZE) move(r,c);
});

// ======== Initialize ========
document.getElementById("newGame").onclick=newGame;
createLabels();
createGrid();
newGame();