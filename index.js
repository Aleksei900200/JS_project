const images = [
  {
    url: '/images/image1.jpg',
    location: 'Rostov-on-Don LCD admiral',
    area: '81 m2',
    repairTime: '3.5 months',
    repairCost: 'Upon request',
  },
  {
    url: '/images/image2.jpg',
    location: 'Sochi Thieves',
    area: '105 m2',
    repairTime: '4 months',
    repairCost: 'Upon request',
  },
  {
    url: '/images/image3.jpg',
    location: 'Rostov-on-Don Patriotic',
    area: '93 m2',
    repairTime: '3 months',
    repairCost: 'Upon request',
  },
];

function initSlider() {
  const sliderImages = document.querySelector('.slider__images');
  const sliderArrows = document.querySelector('.slider__arrows');
  const sliderDots = document.querySelector('.slider__dots');
  const sliderRollPlaces = document.querySelector('.slider__roller-places ul');
  const sliderInfoDetails = document.querySelector('.slider__info-details');

  initImages();
  initArrows();
  initDots();
  initTitles();
  initDescriptions();

  function initImages() {
    images.forEach((image, index) => {
      const imageDiv = `<div class="image n${index} ${
        index === 0 ? 'active' : ''
      }" style="background-image:url(${
        images[index].url
      });" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll('.slider__arrow').forEach((arrow) => {
      arrow.addEventListener('click', function () {
        const curNumber = +sliderImages.querySelector('.active').dataset.index;
        let nextNumber;
        if (arrow.classList.contains('left')) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber == images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }

  function initDots() {
    images.forEach((image, index) => {
      const dot = `<div class="slider__dots-item n${index} ${
        index === 0 ? 'active' : ''
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll('.slider__dots-item').forEach((dot) => {
      dot.addEventListener('click', function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  function initTitles() {
    images.forEach((image, index) => {
      const title = `<li
				class="n${index} ${index === 0 ? 'active' : ''} roller-decor;"
				data-index='${index}'
			>
				${images[index].location.toUpperCase()}
			</li>`;
      sliderRollPlaces.innerHTML += title;
    });
    sliderRollPlaces
      .querySelectorAll('.slider__roller-places ul li')
      .forEach((title) => {
        title.addEventListener('click', function () {
          moveSlider(this.dataset.index);
        });
      });
  }

  function initDescriptions(current = 0) {
    const city = `<p>${images[current].location.split(' ')[0]} <br>
      ${images[current].location.split(' ').slice(1).join(' ')}</p>`;
    sliderInfoDetails.querySelector('.city span').innerHTML = city;

    const aArea = `<p>${images[current].area}</p>`;
    sliderInfoDetails.querySelector('.appartment-area span').innerHTML = aArea;

    const rTime = `<p>${images[current].repairTime}</p>`;
    sliderInfoDetails.querySelector('.repair-time span').innerHTML = rTime;

    const rCost = `<p>${images[current].repairCost}</p>`;
    sliderInfoDetails.querySelector('.repair-cost span').innerHTML = rCost;
  }

  function moveSlider(num) {
    sliderImages.querySelector('.active').classList.remove('active');
    sliderImages.querySelector('.n' + num).classList.add('active');

    sliderDots.querySelector('.active').classList.remove('active');
    sliderDots.querySelector('.n' + num).classList.add('active');

    sliderRollPlaces.querySelector('.active').classList.remove('active');
    sliderRollPlaces.querySelector('.n' + num).classList.add('active');

    initDescriptions(num);
  }
}

document.addEventListener('DOMContentLoaded', initSlider);
