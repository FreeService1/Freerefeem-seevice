        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        const img = document.querySelector('.image-slider img');

        let currentImageIndex = 0;
        const images = [
            "images (1).jpeg",
            "images (5).jpeg",
            "images (6).jpeg"
        ];

        prev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
            img.src = images[currentImageIndex];
        });

        next.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
            img.src = images[currentImageIndex];
        });
