(function () {
	const container = document.getElementById("gift");

	const canvas = document.createElement("canvas");
	canvas.style.position = "absolute";
	canvas.style.top = "0";
	canvas.style.right = "0";
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	container.appendChild(canvas);

	const ctx = canvas.getContext("2d");

	let img = new Image();

	// Функція вибору джерела зображення залежно від ширини екрана
	function chooseImageSource() {
		if (window.matchMedia("(max-width: 1023px)").matches) {
			return "images/hero/gifboxes_mob.webp"; // мобільний
		}  else {
			return "images/hero/gifboxes_right_desk.webp"; // десктоп
		}
	}

	let currentSrc = chooseImageSource();
	img.src = currentSrc;

	let scale = 1;

	function resizeCanvas() {
		const dpr = window.devicePixelRatio || 1;
		const width = container.clientWidth;
		const height = container.clientHeight;

		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);
	}

	// Перевантаження зображення, якщо розмір екрана змінився
	function checkAndUpdateImage() {
		const newSrc = chooseImageSource();
		if (newSrc !== currentSrc) {
			currentSrc = newSrc;
			img.src = currentSrc;
		}
	}

	window.addEventListener("resize", () => {
		resizeCanvas();
		checkAndUpdateImage();
	});

	resizeCanvas();

	img.onload = () => {
		requestAnimationFrame(draw);
	};

	function draw() {
		const width = container.clientWidth;
		const height = container.clientHeight;

		ctx.clearRect(0, 0, width, height);
		ctx.save();

		ctx.translate(width / 2, height / 2);

		const baseScale = Math.min(width / img.width, height / img.height);
		const pulse = 1 + 0.05 * Math.sin(performance.now() / 300);
		const finalScale = baseScale * pulse;

		ctx.scale(finalScale, finalScale);
		ctx.drawImage(img, -img.width / 2, -img.height / 2);
		ctx.restore();

		requestAnimationFrame(draw);
	}
})();
