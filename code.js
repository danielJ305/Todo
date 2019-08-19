
//**** Buttons
let input = document.querySelector(`input.input`);
const addButton = document.querySelector(`button.addButton`);
const addTitleButton = document.querySelector(`button.addTitleButton`);
const removeButton = document.querySelector(`button.removeButton`);


//**** List
let todoList = document.querySelector(`.todoList`);
let listUl = document.querySelector(`ul`);
let lis = listUl.children;
let firstElementList = listUl.firstElementChild;
let lastElementList = listUl.lastElementChild;

//**** Add Buttons To Li
function liButtonDivs(li) {
    let listButtonsDiv = document.createElement(`div`);
    listButtonsDiv.className = `list-buttons`;
    li.appendChild(listButtonsDiv);
}

function attachEraseItemButton(div) {
    let eraseLi = document.createElement(`button`);
    eraseLi.className = `erase-li`;
    eraseLi.textContent = `-`;
    div.appendChild(eraseLi);
}

function attachUpItemButton(div) {
    let up = document.createElement(`button`);
    up.className = `up`;
    up.textContent = `UP`;
    div.appendChild(up);
}

function attachDownItemButton(div) {
    let down = document.createElement(`button`);
    down.className = `down`;
    down.textContent = `DOWN`;
    div.appendChild(down);
}


function attachListItemButtons(li) {
    if (listUl.children.length === 1) {
        console.log(`h`)
        liButtonDivs(li);
        let liEraseBtn = listUl.firstElementChild.firstElementChild;
        attachEraseItemButton(liEraseBtn);
    } else if (lis.length > 1) {
        let liLastChild = listUl.lastElementChild;
        let liPrevLastChild = liLastChild.previousElementSibling;
        let liPrevBtnDiv = liPrevLastChild.firstElementChild;
        attachDownItemButton(liPrevBtnDiv);
        let liDownBtn = liPrevBtnDiv.lastElementChild;
        let liEraseBtn = liDownBtn.previousElementSibling;
        liPrevBtnDiv.insertBefore(liDownBtn, liEraseBtn);
        liButtonDivs(li);
        let liDiv = li.firstElementChild;
        attachUpItemButton(liDiv);
        attachEraseItemButton(liDiv);
    }
}

//**** Add Buttons HTML Set Li's
for (let i = 0; i < lis.length; i++) {
    liButtonDivs(lis[i]);
    let liDiv = lis[i].firstElementChild;
    //console.log(liDiv);
    if (lis[i] !== firstElementList) {
        attachUpItemButton(liDiv);
    }
    if (lis[i] !== lastElementList) {
        attachDownItemButton(liDiv);
    }
    attachEraseItemButton(liDiv);
}

//**** Manipulate List with Buttons
listUl.addEventListener(`click`, (e) => {
    if (e.target.tagName !== `BUTTON`) return;
    if (e.target.className == `erase-li`) {
        let buttonDiv = e.target.parentNode;
        let li = buttonDiv.parentNode;
        let ul = li.parentNode;
        if (li === ul.firstElementChild) {
            if (lis.length === 1) {
                ul.removeChild(li);
            }
            newFirstChildUpDiv = li.nextElementSibling.firstElementChild;
            ul.removeChild(li);
            newFirstChildUpBtn = newFirstChildUpDiv.firstElementChild;
            newFirstChildUpDiv.removeChild(newFirstChildUpBtn);
        } 
        if (li === ul.lastElementChild) {
            if (ul.children.length === 2) {
                ul.removeChild(li);
                let firstChildDiv = ul.firstElementChild.firstElementChild;
                let firstChildDownBtn = firstChildDiv.firstElementChild;
                firstChildDiv.removeChild(firstChildDownBtn);
            } else {
                let prevLiDiv = li.previousElementSibling.firstElementChild;
                let prevLiDownBtn = prevLiDiv.firstElementChild.nextElementSibling;
                ul.removeChild(li);
                prevLiDiv.removeChild(prevLiDownBtn);
            }    
        }
        ul.removeChild(li);
    } 
    if (e.target.className == `up`) {
        let buttonDiv = e.target.parentNode;
        let li = buttonDiv.parentNode;
        let prevLi = li.previousElementSibling;
        let ul = li.parentNode;
        if (prevLi) {
            ul.insertBefore(li, prevLi);
            if (li === ul.firstElementChild) {
                buttonDiv.removeChild(e.target);
                let prevLiDiv = prevLi.firstElementChild;
                attachUpItemButton(prevLiDiv);
                let prevLiBtnDown = prevLiDiv.firstElementChild;
                let prevLiBtnUp = prevLiDiv.lastElementChild;
                prevLiDiv.insertBefore(prevLiBtnUp, prevLiBtnDown);
            }
            if (prevLi === ul.lastElementChild) {
                let prevLiDiv = prevLi.firstElementChild;
                let prevLiBtnDown = prevLiDiv.firstElementChild.nextElementSibling;
                prevLiDiv.removeChild(prevLiBtnDown);
                attachDownItemButton(buttonDiv);
                let previousBtnDown = buttonDiv.lastElementChild;
                let previousBtnMiddle = buttonDiv.lastElementChild.previousElementSibling;
                buttonDiv.insertBefore(previousBtnDown, previousBtnMiddle);
            }
        }
    } 
    if (e.target.className == `down`) {
        let buttonDiv = e.target.parentNode;
        let li = buttonDiv.parentNode;
        let nextLi = li.nextElementSibling;
        let ul = li.parentNode;
        if (nextLi) {
        ul.insertBefore(nextLi, li);
            if (li === ul.lastElementChild) {
                let lastLiBtnDown = buttonDiv.firstElementChild.nextElementSibling;
                buttonDiv.removeChild(lastLiBtnDown);
                let prevLiDiv = nextLi.firstElementChild;
                attachDownItemButton(prevLiDiv);
                let prevLiBtnMiddle = prevLiDiv.firstElementChild.nextElementSibling;
                let prevLiBtnDown = prevLiDiv.lastElementChild;
                prevLiDiv.insertBefore(prevLiBtnDown, prevLiBtnMiddle);
            } 
            if (nextLi === ul.firstElementChild) {
                console.log(lis.length)
                if (lis.length === 2) {
                    let secondNextLiDiv = li.firstElementChild;
                    let secondNextLiBtnDown = secondNextLiDiv.firstElementChild;
                    secondNextLiDiv.removeChild(secondNextLiBtnDown);
                    attachUpItemButton(secondNextLiDiv);
                    attachEraseItemButton(secondNextLiDiv);
                    let nextLiDiv = nextLi.firstElementChild;
                    let nextLiBtnUp = nextLiDiv.firstElementChild;
                    nextLiDiv.removeChild(nextLiBtnUp);
                } else {
                    let nextLiDiv = nextLi.firstElementChild;
                    let nextLiBtnUp = nextLiDiv.firstElementChild; 
                    nextLiDiv.removeChild(nextLiBtnUp);
                    let secondNextLiDiv = li.firstElementChild;
                    attachUpItemButton(secondNextLiDiv);
                    let secondNextLiBtnDown = secondNextLiDiv.firstElementChild;
                    let secondNextLiBtnUp = secondNextLiDiv.lastElementChild;
                    secondNextLiDiv.insertBefore(secondNextLiBtnUp, secondNextLiBtnDown);
                }
            }
        }
    }
});


//**** Add Note Li
input.title = `Add Note`;

addButton.addEventListener(`click`, () => {
    let ul = document.getElementsByTagName(`ul`)[0];
    let li = document.createElement(`li`);
    li.textContent = input.value;
    ul.appendChild(li);
    attachListItemButtons(li);
    input.value = ``;
    let liClass = document.querySelector(`li:last-child`);
    liClass.className = `note`;
});

//**** Add Title
addTitleButton.addEventListener(`click`, () => { 
    let ul = document.getElementsByTagName(`ul`)[0];
    let h4 = document.createElement(`h4`);
    h4.textContent = input.value + `:`;
    ul.appendChild(h4);
    input.value = ``;
});

//**** Remove Last Li Element in the List
removeButton.addEventListener(`click`, () => {
    let ul = document.getElementsByTagName(`ul`)[0];
    let li = document.querySelector(`li:last-child`);
    let h4 = document.querySelector(`h4:last-child`);
    if (li) {
        ul.removeChild(li);
    } else if (h4) {
        ul.removeChild(h4);
    }
    let liClick = document.querySelector(`li h4`);
    liClick.addEventListener(`select`, () => {
        liClick.style.color = `red`;
    })
});




//**** HighLight Notes 
/*
let listAncestor = document.querySelector(`.todo-list`);

listAncestor.addEventListener(`mouseover`, (e) => {
    if (e.target.tagName !== `LI`) return; 
        e.target.textContent = e.target.textContent.toUpperCase();
});

listAncestor.addEventListener(`mouseout`, (e) => {
    if (e.target.tagName !== `LI`) return; 
        e.target.textContent = e.target.textContent.toLowerCase();
});
*/

