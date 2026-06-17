document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("touchstart", () => {
    card.classList.toggle("is-touched");
  });
});

const setGalleryHovered = (hovered) => {
  document.body.classList.toggle("gallery-hovered", hovered);
};

document.querySelectorAll(".gallery-card").forEach((card) => {
  card.addEventListener("mouseenter", () => setGalleryHovered(true));
  card.addEventListener("mouseleave", () => setGalleryHovered(false));
  card.addEventListener("focusin", () => setGalleryHovered(true));
  card.addEventListener("focusout", () => setGalleryHovered(false));
});

document.querySelectorAll(".gallery-card--video").forEach((card) => {
  const video = card.querySelector(".video-thumb");

  if (!video) return;

  const play = () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const pause = () => {
    video.pause();
    video.currentTime = 0;
  };

  card.addEventListener("mouseenter", play);
  card.addEventListener("mouseleave", pause);
  card.addEventListener("focusin", play);
  card.addEventListener("focusout", pause);
});

document.querySelectorAll(".slideshow-thumb").forEach((image) => {
  const sources = (image.dataset.images || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (sources.length < 2) return;

  let timerId = null;
  let index = 0;
  const card = image.closest(".gallery-card");

  const showImage = (nextIndex) => {
    index = nextIndex;
    image.src = sources[index];
  };

  const start = () => {
    if (timerId) return;
    timerId = window.setInterval(() => {
      showImage((index + 1) % sources.length);
    }, 550);
  };

  const stop = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
    showImage(0);
  };

  card?.addEventListener("mouseenter", start);
  card?.addEventListener("mouseleave", stop);
  card?.addEventListener("focusin", start);
  card?.addEventListener("focusout", stop);
});
