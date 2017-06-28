var form = document.forms.soldierForm;
var soldierNameForm = form.elements.soldierName;
var soldierRankForm = form.elements.soldierRank;
var field = document.getElementById('field');
var retireAll = document.getElementById('retire');

function formSubmit() {
  var soldier = new Soldier(soldierNameForm.value, soldierRankForm.value);
    soldier.getPhrase();
  var soldierImage = document.createElement('label');
  soldierImage.style.background = 'url(' + soldier.image + ')';
  soldierImage.className = 'soldier';
    soldierImage.setAttribute('data-greeting', soldier.greeting);
    soldierImage.setAttribute('data-goodbye', soldier.goodbye);
  field.appendChild(soldierImage)
}

function Soldier(name, rank) {
    this.name = name;
    this.rank = rank;
    this.greeting = '';
    this.goodbye = '';
}

Soldier.prototype.getPhrase = function () {
    switch (this.rank){
        case 'private': {
            this.greeting = 'Рядовой ' + this.name + ' к вашим услугам';
            this.goodbye =  'Я простой рядовой, не оставляйте меня';
            this.image = 'image/private.png';
            break
        }
        case 'sergeant': {
            this.greeting = 'Сержант ' + this.name + ' готов';
            this.goodbye =  'Досвидания (отстал наконец-то)';
            this.image = 'image/sergeant.png';
            break
        }
        case 'prapor':{
            this.greeting = 'Прапорщик ' + this.name + ' твой дом труба шатал';
            this.goodbye =  'Ну и вали';
            this.image = 'image/prapor.png';
            break
        }
        case 'lieutenant':{
            this.greeting = 'Лейтенант ' + this.name + ' пока занят';
            this.goodbye =  'Че хотел? Непонятно!';
            this.image = 'image/lieutenant.png';
            break
        }
        case 'captain': {
            this.greeting = 'Капитан ' + this.name + ' приветствует Вас';
            this.goodbye =  'Всего доброго';
            this.image = 'image/captain.png';
            break
        }

    }

};

var showingGreeting;
var showingGoodbye;
var greetingTarget;

field.onclick = function(e) {
    if (showingGreeting || showingGoodbye) return;
    var target = e.target;

    var tooltip = target.getAttribute('data-greeting');
    if (!tooltip) return;

    var tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltip;
    tooltipElem.style.zIndex = 9999;
    field.appendChild(tooltipElem);

    var coords = target.getBoundingClientRect();

    var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0;

    var top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';

    showingGreeting = tooltipElem;
    greetingTarget = target;
};



field.onmouseout = function() {
    if (showingGreeting) {

        setTimeout(function () {
            field.removeChild(showingGreeting);
            showingGreeting = null;

            var target = greetingTarget;

            var tooltip = target.getAttribute('data-goodbye');
            if (!tooltip) return;

            var tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.innerHTML = tooltip;
            tooltipElem.style.zIndex = 9999;
            field.appendChild(tooltipElem);

            var coords = target.getBoundingClientRect();

            var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
            if (left < 0) left = 0;

            var top = coords.top - tooltipElem.offsetHeight - 5;
            if (top < 0) {
                top = coords.top + target.offsetHeight + 5;
            }

            tooltipElem.style.left = left + 'px';
            tooltipElem.style.top = top + 'px';

            showingGoodbye = tooltipElem;


            setTimeout(function () {
                if (showingGoodbye) {
                    field.removeChild(showingGoodbye);
                }
                showingGoodbye = null;
            }, 1200)
        }, 500)

        }

};

function retireAllOnclick () {
       while (field.lastChild) {
            field.removeChild(field.lastChild);
        }
};





