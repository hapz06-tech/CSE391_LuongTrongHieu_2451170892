function startGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    const maxGuesses = 7;
    let attempts = 0;
    let guessedNumbers = [];
    let hasWon = false;

    while (attempts < maxGuesses) {
        let input = prompt(`Lượt đoán thứ ${attempts + 1}/${maxGuesses}. Nhập một số từ 1 đến 100:`);
        
        if (input === null) {
            alert("Bạn đã thoát trò chơi.");
            return;
        }

        let guess = parseInt(input, 10);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Lỗi: Vui lòng chỉ nhập số hợp lệ nằm trong khoảng từ 1 đến 100!");
            continue;
        }

        let isDuplicate = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === guess) {
                isDuplicate = true;
                break;
            }
        }

        if (isDuplicate) {
            alert("Bạn đã đoán số này rồi! Vui lòng chọn số khác.");
            continue;
        }

        guessedNumbers.push(guess);
        attempts++;

        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            hasWon = true;
            break;
        } else if (guess > targetNumber) {
            alert("Thấp hơn!");
        } else {
            alert("Cao hơn!");
        }
    }

    if (!hasWon) {
        alert(`Bạn đã hết lượt đoán! Bạn thua cuộc. Đáp án chính xác là: ${targetNumber}`);
    }
}