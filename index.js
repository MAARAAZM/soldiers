(function () {

    var form = document.forms.soldierForm;
    var soldierNameForm = form.elements.soldierName;
    var soldierRankForm = form.elements.soldierRank;
    var field = document.getElementById('field');
    var retireAll = document.getElementById('retire');
    var showingGreeting;
    var showingGoodbye;
    var greetingTarget;
    var fireAngle = 0;


    function Soldiers(name, rank) {
        switch (rank) {
            case 'private': {
                this.greeting = 'Рядовой ' + name + ' к вашим услугам';
                this.goodbye = 'Я простой рядовой, не оставляйте меня';
                this.image = 'image/private.png';
                break
            }
            case 'sergeant': {
                this.greeting = 'Сержант ' + name + ' готов';
                this.goodbye = 'Досвидания (отстал наконец-то)';
                this.image = 'image/sergeant.png';
                break
            }
            case 'prapor': {
                this.greeting = 'Прапорщик ' + name + ' твой дом труба шатал';
                this.goodbye = 'Ну и вали';
                this.image = 'image/prapor.png';
                break
            }
            case 'lieutenant': {
                this.greeting = 'Лейтенант ' + name + ' пока занят';
                this.goodbye = 'Че хотел? Непонятно!';
                this.image = 'image/lieutenant.png';
                break
            }
            case 'captain': {
                this.greeting = 'Капитан ' + name + ' приветствует Вас';
                this.goodbye = 'Всего доброго';
                this.image = 'image/captain.png';
                break
            }

        }

    }

    function Soldier(name, rank) {
        Soldiers.apply(this, arguments);
        this.name = 'name';
        this.rank = 'rank';
    }

    Soldier.prototype = Object.create(Soldiers.prototype);
    Soldier.prototype.constructor = Soldier;


    function formSubmit() {
        var soldier = new Soldier(soldierNameForm.value, soldierRankForm.value);
        var soldierImage = document.createElement('label');
        var fieldCoords = field.getBoundingClientRect();
        var pointer = document.createElement('img');

        fireAngle = 0;
        soldierImage.style.background = 'url(' + soldier.image + ')';
        soldierImage.className = 'soldier';
        soldierImage.setAttribute('tabindex', '0');
        soldierImage.setAttribute('data-greeting', soldier.greeting);
        soldierImage.setAttribute('data-goodbye', soldier.goodbye);
        field.appendChild(soldierImage);
        soldierImage.style.left = randomInteger(fieldCoords.left, fieldCoords.right-80) + 'px';
        soldierImage.style.top = randomInteger(fieldCoords.top, fieldCoords.bottom-90) + 'px';
        pointer.className = 'pointer';
        pointer.setAttribute('src', 'image/pointer.png');
        soldierImage.appendChild(pointer);

        $(function () {
            $('.soldier').draggable({
                zIndex: 100,
                scroll: false,
                containment: ".container"
            });

            $('.soldier').click(fieldOnclick);

            $('.soldier').mouseout(fieldOnmouseout);

            $('.soldier').keydown(move);
        });


    }


    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }



    function move(e) {
        var target = (e.target.getAttribute('data-greeting'))? e.target : e.target.parentNode;
        var coords = target.getBoundingClientRect();

        var container = document.querySelector('.container').getBoundingClientRect();

        switch (e.keyCode) {
            case 37: // влево
                if (coords.left < container.left) return;
                target.style.left = parseInt(target.style.left) - 20 + 'px';
                return false;
            case 38: // вверх
                if (coords.top < container.top) return;
                target.style.top = parseInt(target.style.top) - 20 + 'px';
                return false;
            case 39: // вправо
                if (coords.left > container.right-100) return;
                target.style.left = parseInt(target.style.left) + 20 + 'px';
                return false;
            case 40: // вниз
                if (coords.top > container.bottom-100) return;
                target.style.top = parseInt(target.style.top) + 20 + 'px';
                return false;
            case 69: //прицел+ e
               fireAngle += 2.5;
               target.firstChild.style.transform = 'rotate('+ fireAngle +'deg)';
                target.firstChild.style.webkitTransform = 'rotate('+ fireAngle +'deg)';
                target.firstChild.style.mozTransform = 'rotate('+ fireAngle +'deg)';
                return false;
            case 81: //прицел- q
                fireAngle += -2.5;
                target.firstChild.style.transform = 'rotate('+ fireAngle +'deg)';
                target.firstChild.style.webkitTransform = 'rotate('+ fireAngle +'deg)';
                target.firstChild.style.mozTransform = 'rotate('+ fireAngle +'deg)';
                return false;
            case 32: //огонь пробел
                fire(fireAngle, target);
                return false;
        }
    }


    function fieldOnclick(e) {

       var target = (e.target.getAttribute('data-greeting'))? e.target : e.target.parentNode;


        if (showingGreeting || showingGoodbye) return;


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
    }


    function fieldOnmouseout(e) {
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
    }

    function fire(angle, soldier) {
        var bullet = document.createElement('div');
        bullet.className = 'bullet';
        soldier.appendChild(bullet);
        var bulletCoords = bullet.getBoundingClientRect();
        var soldierCoords = soldier.getBoundingClientRect();
        var x = bulletCoords.left - soldierCoords.left;
        var y = bulletCoords.top - soldierCoords.top;
        var animDuration = 5000;


        function showExplosion(x, y) {
            var explosion = document.querySelector('.explosion').cloneNode(true);
            explosion.style.left = x - 50 + 'px';
            explosion.style.top = y - 30 + 'px';
            explosion.style.visibility = '';
            field.appendChild(explosion);
            setTimeout(function () {
                explosion.parentNode.removeChild(explosion);
            }, 200)
        }



        animate(function(timePassed) {

            bullet.style.left =  x + timePassed * Math.cos(angle*3.14/180) + 'px';
            bullet.style.top = y + timePassed * Math.sin(angle*3.14/180) + 'px';
            bulletCoords = bullet.getBoundingClientRect();
            var elem =  document.elementFromPoint(bulletCoords.left, bulletCoords.top);
            if (elem.getAttribute('data-greeting')){
                if (elem !== soldier) {
                    elem.parentNode.removeChild(elem);
                    showExplosion(bulletCoords.left, bulletCoords.top)
                }
            }
            if (elem.parentNode.getAttribute('data-greeting')){
                elem = elem.parentNode;
                if (elem !== soldier) {
                    elem.parentNode.removeChild(elem);
                    showExplosion(bulletCoords.left, bulletCoords.top)
                }
            }

        }, animDuration);


        function animate(draw, duration) {
            var start = performance.now();

            requestAnimationFrame(function animate(time) {
                var timePassed = time - start;
                console.log(time, start);
                if (timePassed > duration) timePassed = duration;
                draw(timePassed);
                if (timePassed < duration) {
                        requestAnimationFrame(animate);
                   }
            });

        }
        setTimeout(function () {
            bullet.parentNode.removeChild(bullet);
        }, 1500)


    }




    function retireAllOnclick() {
        while (field.lastChild) {
            field.removeChild(field.lastChild);
        }
    }

    $(function () {
        $('.droppable').droppable({
            drop: function (event, ui) {
                ui.draggable.css({
                    visibility: 'hidden'
                })
            },

            activate: function () {
                $('.droppable').css({
                    border: "medium double green"
                });
            },

            deactivate: function () {
                $('.droppable').css("border", "").css("background-color", "");
            }
        })
    });


    retireAll.addEventListener('click', retireAllOnclick);

    form.addEventListener('submit', function(e){
        formSubmit();
        e.preventDefault();
    })


})();






