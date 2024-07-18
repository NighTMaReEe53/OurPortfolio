let theUl = document.querySelector(".links");

const myIcon = document.querySelector(".icon i");
const lightHouse = document.querySelector(".lighthouse");

let theLis = document.querySelectorAll(".color li");

const getColorFromLocal = localStorage.getItem("pageColor");
const getBulltesFromLocal = localStorage.getItem("pageBulltes");

const backShowSpans = document.querySelectorAll(".backshow span");

// Check
if (getColorFromLocal != null) {
  document.body.style.setProperty("--mainColor", getColorFromLocal);

  theLis.forEach((e) => {
    e.parentElement.querySelectorAll(".active").forEach((el) => {
      e.classList.remove("active");
    });

    if (e.dataset.color == getColorFromLocal) {
      e.classList.add("active");
    }
  });
}

if (getBulltesFromLocal) {
  backShowSpans.forEach((e) => e.classList.remove("active"));

  backShowSpans.forEach(() => {
    if (getBulltesFromLocal === "yes") {
      document.querySelector(".backshow .yes").classList.add("active");
      document.querySelector(".bulltes").style.display = "block";
    } else {
      document.querySelector(".backshow .no").classList.add("active");
      document.querySelector(".bulltes").style.display = "none";
    }
  });
}

myIcon.addEventListener("click", (e) => {
  e.target.classList.toggle("fa-spin");

  lightHouse.classList.toggle("show");
});

theLis.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");

    document.body.style.setProperty("--mainColor", e.target.dataset.color);

    localStorage.setItem("pageColor", e.target.dataset.color);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("links")) {
    document.querySelector(".overlay").classList.remove("show");
    document.body.style.overflow = "auto";

    document.querySelector(".burger").classList.add("fa-x");

    document.querySelector(".links").classList.remove("show");
  }

  if (e.target.classList.contains("burger")) {
    document.querySelector(".overlay").classList.add("show");
    document.body.style.overflow = "hidden";

    document.querySelector(".links").classList.add("show");
  }
  if (!theUl.classList.contains("show")) {
    document.querySelector(".burger").classList.remove("fa-x");
  }

  if (!e.target.classList.contains("show")) {
    lightHouse.classList.remove("show");

    myIcon.classList.remove("fa-spin");
  }
});

lightHouse.onclick = function (e) {
  e.stopPropagation();
};

theUl.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (
      document.querySelector(".links").classList.contains("show") &&
      document.querySelector(".overlay").classList.contains("show")
    ) {
      document.querySelector(".links").classList.remove("show");
      document.querySelector(".overlay").classList.remove("show");
      document.querySelector(".burger").classList.remove("fa-x");
    }
  }

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    if (lightHouse.classList.contains("show")) {
      lightHouse.classList.remove("show");
      myIcon.classList.remove("fa-spin");
    }
  }
});

let nums = document.querySelectorAll(".num");
let sectionRates = document.querySelector(".rates");
let started = false;

window.addEventListener("scroll", () => {
  if (window.scrollY >= sectionRates.offsetTop - 500) {
    if (!started) {
      nums.forEach((el) => startCount(el));
    }
    started = true;
  }
});

function startCount(el) {
  let goal = el.dataset.count;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 5000 / goal);
}

const theNextBtn = document.getElementById("next");
const thePrevBtn = document.getElementById("prev");
let theImages = document.querySelectorAll(".protfolio-srv .card img");
let imgLength = theImages.length;
let currentSlide = 0;
let currentBox = 0;
let reviewBoxes = document.querySelectorAll(".review-srv");
let reviewPrevBtn = document.querySelector(".content .controls .prev");
let reviewNextBtn = document.querySelector(".content .controls .next");

function checker() {
  removeActive();
  theImages[currentSlide].classList.add("active");
  reviewBoxes[currentBox].classList.add("active");

  if (currentSlide === 0) {
    thePrevBtn.classList.add("disapled");
  } else {
    thePrevBtn.classList.remove("disapled");
  }

  if (currentSlide == imgLength - 1) {
    theNextBtn.classList.add("disapled");
  } else {
    theNextBtn.classList.remove("disapled");
  }

  if (currentBox === 0) {
    reviewPrevBtn.classList.add("disapled");
  } else {
    reviewPrevBtn.classList.remove("disapled");
  }

  if (currentBox == reviewBoxes.length - 1) {
    reviewNextBtn.classList.add("disapled");
  } else {
    reviewNextBtn.classList.remove("disapled");
  }
}

checker();

function removeActive() {
  theImages.forEach((img) => img.classList.remove("active"));
  reviewBoxes.forEach((box) => box.classList.remove("active"));
}

theNextBtn.onclick = function () {
  if (theNextBtn.classList.contains("disapled")) {
    return false;
  } else {
    currentSlide++;
    checker();
  }
};
thePrevBtn.onclick = function () {
  if (thePrevBtn.classList.contains("disapled")) {
    return false;
  } else {
    currentSlide--;
    checker();
  }
};

reviewNextBtn.onclick = function () {
  if (reviewNextBtn.classList.contains("disapled")) {
    return false;
  } else {
    currentBox++;
    checker();
  }
};
reviewPrevBtn.onclick = function () {
  if (reviewPrevBtn.classList.contains("disapled")) {
    return false;
  } else {
    currentBox--;
    checker();
  }
};

document.querySelectorAll(".bullte").forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(e.currentTarget.dataset.section).scrollIntoView({
      top: 0,
    });
  });
});

backShowSpans.forEach((e) => {
  e.addEventListener("click", (e) => {
    backShowSpans.forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");

    if (e.target.dataset.show === "yes") {
      document.querySelector(".bulltes").style.display = "block";
      localStorage.setItem("pageBulltes", e.target.dataset.show);
    } else {
      document.querySelector(".bulltes").style.display = "none";
      localStorage.setItem("pageBulltes", e.target.dataset.show);
    }
  });
});

// Start Scroller
let theScroller = document.querySelector(".scroller");

let theHeight =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;

  theScroller.style.width = `${(scrollTop / theHeight) * 100}%`;
});

document.querySelector(".clear").addEventListener("click", () => {
  window.localStorage.clear();
  window.location.reload();
});
