function copyCode(code, btn) {
            navigator.clipboard.writeText(code).then(() => {
                btn.innerHTML = 'Copied!';
                setTimeout(() => {
                    btn.innerHTML = `<ion-icon name="copy-outline"></ion-icon>${code}`;
                }, 1000);
            });
        }

        function goBack() {
            window.history.back();
        }



