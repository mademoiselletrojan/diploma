const languages = ["Français", "English", "Russian"];
let index = 0;

function changeText() {
    if (typeof window !== "undefined") {
        const changingText = document.querySelector(".changing-text");
        if (changingText) {
            changingText.textContent = "";
            changingText.style.animation = "shakeText 0.8s ease-in-out";

            setTimeout(() => {
                changingText.textContent = languages[index];
                index = (index + 1) % languages.length;

                // Убираем анимацию после смены текста
                changingText.style.animation = "";
            }, 300);
        }
    }
}

export function startTextChange() {
    if (typeof window !== "undefined") {
        setInterval(changeText, 8000); // Меняем язык каждые 8 секунд
    }
}
