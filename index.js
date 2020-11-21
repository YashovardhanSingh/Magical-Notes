showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let titleTxt = document.getElementById('titleTxt');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let dates = localStorage.getItem('dates');
    let impos = localStorage.getItem('impos');
    let date = new Date();
    if (notes == null) {
        notesObj = [];
        titleObj = [];
        datesObj = [];
        imposObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
        datesObj = JSON.parse(dates);
        imposObj = JSON.parse(impos);
    }
    if (addTxt.value != '' && titleTxt.value.length > 1) {
        notesObj.push(addTxt.value);
        titleObj.push(titleTxt.value);
        datesObj.push(date);
        imposObj.push(false);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('titles', JSON.stringify(titleObj));
        localStorage.setItem('dates', JSON.stringify(datesObj));
        localStorage.setItem('impos', JSON.stringify(imposObj));
        addTxt.value = '';
        titleTxt.value = '';
        showNotes();
    }
});
function showNotes() {
    let quotes = ["Be yourself; everyone else is already taken.", "Do what you can, with what you have, where you are.", 'If you cannot do great things, do small things in a great way.', 'Either you run the day, or the day runs you.', 'The best way to predict the future is to invent it.', 'Believe you can and you’re halfway there.', 'Change your thoughts and you change your world.', 'A person who never made a mistake never tried anything new.', 'You only live once, but if you do it right, once is enough.', 'If you tell the truth, you don’t have to remember anything.', 'Happiness is not a goal; it is a by-product.', 'The only true wisdom is knowing that you know nothing.', 'Peace begins with a smile.', 'Success is liking yourself, liking what you do, and liking how you do it.', 'Never leave that till tomorrow which you can do today.', 'Defeat is not bitter unless you swallow it.', 'Life has no limitations, except the ones you make.', 'Failure is like free tuition.', 'Peace comes from within. Do not seek it without.', 'The man who removes a mountain begins by carrying away small stones.', '“A mind is like a parachute. It doesn’t work if it isn’t open.', 'When you judge another, you do not define them; you define yourself.', 'Opportunity is missed by most people because it is dressed in overalls and looks like work.', 'It takes courage to grow up and turn out to be who you really are.'];
    let index = Math.floor(Math.random() * quotes.length);
    let quote = quotes[index];
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let dates = localStorage.getItem('dates');
    if (notes == null) {
        notesObj = [];
        titleObj = [];
        dateObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
        dateObj = JSON.parse(dates);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        titleObj = JSON.parse(titles);
        let time = new Date(dateObj[index]);
        let ans = time.getDate() + '-' + (Number(time.getMonth()) + 1).toString() + '-' + time.getFullYear() + '  ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        html += `
            <div class="card mx-2 my-2 noteCard" style="width: 18rem; padding:1rem; min-height:220px" onMouseOver="this.style.padding='1.8rem'" onMouseOut="this.style.padding='1rem'">
                <div class="card-body">
                <div style='display:flex'>
                <h5 class="card-title" style="font-size: 15px; display:flex; justify-content:flex-start"><button class='iconbtn' id=${index} onclick=makeImp(this.id)>&#10032;</button></h5>
                    <h5 class="card-title" style="font-size: 15px; display:flex; justify-content:flex-end"><pre> <b>       ${ans}</b></pre></h5></div>
                    <h4 class="card-title" style='color: #d00c3d; font-size: 35px'><b>${titleObj[index]}</b></h4>
                    <p class='card-text' style='font-size: 20px'><b>${element}</b></p>
                    <button class="btn btn-primary" id=${index} onclick=deleteNote(this.id)>Delete Note</button>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h2 class='my-3'>Nothing to Show</h2>`;
    }
    let quoteHead = document.getElementById('quoteHeading');
    quoteHead.innerText = quote
}
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    let dates = localStorage.getItem('dates');
    if (notes == null) {
        notesObj = [];
        titleObj = [];
        datesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
        datesObj = JSON.parse(dates);
    }
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    datesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('titles', JSON.stringify(titleObj));
    localStorage.setItem('dates', JSON.stringify(datesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value;
    let notesCards = document.getElementsByClassName('noteCard');
    Array.from(notesCards).forEach(function (element) {
        let text = element.getElementsByTagName('p')[0].innerText;
        let title = element.getElementsByTagName('h4')[0].innerText;
        let capital = (inputVal.charAt(0)).toUpperCase() + inputVal.slice(1, inputVal.length);
        let capital2 = (inputVal.charAt(0)).toUpperCase() + (inputVal.slice(1, inputVal.length)).toLowerCase();
        if (text.includes(inputVal) || text.includes(inputVal.toLowerCase()) || text.includes(inputVal.toUpperCase()) || title.includes(inputVal.toLowerCase()) || title.includes(inputVal) || title.includes(inputVal.toUpperCase()) || title.includes(capital) || title.includes(capital2)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})

function makeImp(index){
    let impos = localStorage.getItem('impos');
    if (impos == null){
        imposObj = [];
    }
    else{
        imposObj = JSON.parse(impos);
    }
    let ele = document.getElementById('iconbtn');
}