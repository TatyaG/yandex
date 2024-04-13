const stagesSlide = Array.from(document.querySelector('.stages__list').children);

const stagesPagination = document.querySelector('.stages .swiper__pagination');
stagesSlide.forEach(el => {
    const paginationItem = document.createElement('li');
    paginationItem.classList.add('pagination__item');
    stagesPagination.append(paginationItem);
})

window.addEventListener('DOMContentLoaded', () => {

    // Слайдер loop (Участники)

    const participantsTotal = document.querySelector('.amount__total');
    const participantsCurrent = document.querySelector('.amount__current');
    const participantsPrev = document.querySelector('.participants .swiper__prev');
    const participantsNext = document.querySelector('.participants .swiper__next');

    const slides = document.querySelectorAll('.participants__item');


    let indexParticipants = 0; // индекс активного слайда

    let countParticipants // кол-во слайдов, на которые надо перелистывать

    if (document.documentElement.offsetWidth > 992) {
        countParticipants = 3
    } else countParticipants = 1

    participantsTotal.textContent = slides.length; // общее кол-во слайдов
    participantsCurrent.textContent = indexParticipants + countParticipants; // текущий слайд




    participantsNext.addEventListener('click', (e) => {
        e.preventDefault();
        indexParticipants = (indexParticipants + countParticipants) % slides.length;
        nextSlide(true, participantsNext, participantsPrev, participantsCurrent, slides, countParticipants, indexParticipants);

    })

    participantsPrev.addEventListener('click', (e) => {
        e.preventDefault();
        indexParticipants = indexParticipants === 0 ? slides.length - countParticipants : indexParticipants - countParticipants;
        prevSlide(true, participantsNext, participantsPrev, participantsCurrent, slides, countParticipants, indexParticipants);

    })


    // слайд перелистывается каждые 4 сек
    setInterval(() => {
        nextSlide(true, participantsNext, participantsPrev, participantsCurrent, slides, countParticipants, indexParticipants);
    }, 4000);





    // Слайдер (Этапы)

    const stagesPrev = document.querySelector('.stages .swiper__prev');
    const stagesNext = document.querySelector('.stages .swiper__next');

    const pagination = document.querySelectorAll('.stages .pagination__item');


    let indexStages = 0; // индекс активного слайда
    let countStages = 1; // кол-во переключаемых слайдов

    stagesPrev.disabled = true;
    pagination[0].classList.add('active');


    stagesNext.addEventListener('click', (e) => {
        e.preventDefault();
        indexStages = (indexStages + countStages) % slides.length;
        nextSlide(false, stagesNext, stagesPrev, null, stagesSlide, countStages, indexStages, pagination);

    })

    stagesPrev.addEventListener('click', (e) => {
        e.preventDefault();
        indexStages = indexStages === 0 ? slides.length - countStages : indexStages - countStages;
        prevSlide(false, stagesNext, stagesPrev, null, stagesSlide, countStages, indexStages, pagination);

    })




    // Функции для слайдера


    // следующий слайд
    function nextSlide(loop, next, prev, current, slides, count, index, pagination) {
        if (!loop) {
            if (index == slides.length - 1) next.disabled = true;
            if (index > 0) prev.disabled = false;
        }

        if (current) {
            current.textContent = index + count;
        }

        if (pagination) {
            pagination[index - count].classList.remove('active');
            pagination[index].classList.add('active');
        }

        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${index * 100}%)`; // сдвигаем каждый слайд на index
        });
    }

    // предыдущий слайд
    function prevSlide(loop, next, prev, current, slides, count, index, pagination) {
        if (!loop) {
            if (index == 0) prev.disabled = true;
            if (index < slides.length - 1) next.disabled = false;

        }

        if (current) {
            current.textContent = index + count;
        }

        if (pagination) {
            pagination[index + count].classList.remove('active');
            pagination[index].classList.add('active');
        }

        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    }

})