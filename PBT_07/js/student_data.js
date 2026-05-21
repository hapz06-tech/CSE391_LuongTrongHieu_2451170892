const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let counts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let maxStudent = null;
let minStudent = null;

let totalMath = 0, totalPhysics = 0, totalCS = 0;
let totalM = 0, countM = 0, totalF = 0, countF = 0;

console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    const sv = students[i];
    
    const db = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    sv.avg = Math.round(db * 10) / 10;

    if (sv.avg >= 8.0) sv.rank = "Giỏi";
    else if (sv.avg >= 6.5) sv.rank = "Khá";
    else if (sv.avg >= 5.0) sv.rank = "Trung bình";
    else sv.rank = "Yếu";

    counts[sv.rank]++;

    if (!maxStudent || sv.avg > maxStudent.avg) maxStudent = sv;
    if (!minStudent || sv.avg < minStudent.avg) minStudent = sv;

    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCS += sv.cs;

    if (sv.gender === "M") {
        totalM += sv.avg;
        countM++;
    } else if (sv.gender === "F") {
        totalF += sv.avg;
        countF++;
    }

    const nameStr = sv.name.padEnd(6);
    const avgStr = sv.avg.toFixed(1).padEnd(4);
    const rankStr = sv.rank.padEnd(11);
    console.log(`| ${(i + 1).toString().padEnd(3)} | ${nameStr} | ${avgStr} | ${rankStr} |`);
}

console.log("\n Thống kê số lượng xếp loại:");
for (const key in counts) {
    console.log(`- ${key}: ${counts[key]} SV`);
}

console.log(`\n- SV có điểm TB cao nhất: ${maxStudent.name} (${maxStudent.avg})`);
console.log(`- SV có điểm TB thấp nhất: ${minStudent.name} (${minStudent.avg})`);

console.log(`\n Điểm TB toàn lớp theo từng môn:`);
console.log(`- Toán: ${(totalMath / students.length).toFixed(2)}`);
console.log(`- Vật lý: ${(totalPhysics / students.length).toFixed(2)}`);
console.log(`- Khoa học máy tính: ${(totalCS / students.length).toFixed(2)}`);

console.log(`\n Điểm TB theo giới tính:`);
console.log(`- Nam (M): ${(totalM / countM).toFixed(2)}`);
console.log(`- Nữ (F): ${(totalF / countF).toFixed(2)}`);