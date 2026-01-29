function calculateGrade(a: number) : string | null {
	if (a < 0 || a > 100) {
		return null
	}
	if (a >=70) { return "A";}
	else if (a >=60) { return "B";}
	else if (a >=50) { return "C";}
	else if (a>=40) { return "D";}
	else { return "F";}
}

console.log(calculateGrade(53));
console.log(calculateGrade(50));
console.log(calculateGrade(110));
console.log(calculateGrade(-20));
