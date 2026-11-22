export const pythagoreanVideo = {
  title: 'Pythagorean Theorem',
  subject: 'Mathematics',
  gradeRange: 'Grades 7–10',
  description: 'A visual proof of the relationship between the legs and hypotenuse of a right triangle.',
  narrator: 'houselearning-math',
  scenes: [
    { id:'triangle', duration:9, narration:'A right triangle has one ninety degree angle. We label the two legs a and b, and the longest side opposite the right angle is c.' },
    { id:'squares', duration:10, narration:'We construct a square on each side. The square on side a has area a squared. The square on side b has area b squared.' },
    { id:'proof', duration:11, narration:'Together, the smaller areas exactly fill the space of the square on c. This shows that a squared plus b squared equals c squared.' },
    { id:'example', duration:10, narration:'For example, if a is three and b is four, then nine plus sixteen equals twenty five. The square root of twenty five is five, so c equals five.' }
  ],
  subtitles: [
    { start:0,end:9,text:'A right triangle has one 90-degree angle.' },
    { start:9,end:19,text:'Square a and square b share the space around the triangle.' },
    { start:19,end:30,text:'a² + b² equals c².' },
    { start:30,end:40,text:'Three-four-five is a right triangle: 3² + 4² = 5².' }
  ]
};
