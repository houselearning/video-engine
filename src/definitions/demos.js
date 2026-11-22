export const demoCatalog = {
  pythagorean: {
    title:'Pythagorean Theorem', subject:'Mathematics', gradeRange:'Grades 7–10', narrator:'houselearning-math',
    scenes:[
      {id:'triangle',duration:9,narration:'A right triangle has one ninety degree angle. The two shorter sides are legs, and the side opposite the right angle is the hypotenuse.'},
      {id:'squares',duration:10,narration:'We construct a square on each side of the triangle. The area of a square is side length squared.'},
      {id:'proof',duration:11,narration:'The areas of the squares on the legs combine to equal the area of the square on the hypotenuse.'},
      {id:'example',duration:10,narration:'For a three, four, five triangle, nine plus sixteen equals twenty five, so the hypotenuse is five.'}
    ],subtitles:[{start:0,end:9,text:'A right triangle has one 90-degree angle.'},{start:9,end:19,text:'Construct a square on each side.'},{start:19,end:30,text:'a² + b² = c².'},{start:30,end:40,text:'Three-four-five: 3² + 4² = 5².'}]
  },
  cell: {
    title:'Inside a Human Cell', subject:'Science', gradeRange:'Grades 6–10', narrator:'houselearning-science',
    scenes:[
      {id:'cell',duration:10,narration:'A cell is the basic unit of life. Its membrane separates the interior from the outside environment.'},
      {id:'organelles',duration:12,narration:'Organelles have specialized jobs. The nucleus stores genetic instructions and mitochondria release usable energy.'},
      {id:'protein',duration:10,narration:'Ribosomes build proteins, and the Golgi apparatus processes and prepares many materials for transport.'}
    ],subtitles:[{start:0,end:10,text:'A cell is the basic unit of life.'},{start:10,end:22,text:'Organelles perform specialized jobs.'},{start:22,end:32,text:'Proteins are built and transported.'}]
  },
  newton: {
    title:"Newton's Three Laws", subject:'Physics', gradeRange:'Grades 7–12', narrator:'houselearning-science',
    scenes:[
      {id:'inertia',duration:12,narration:'Newton first law says an object maintains its motion unless acted on by a net force.'},
      {id:'acceleration',duration:12,narration:'Newton second law relates net force, mass, and acceleration. Net force equals mass times acceleration.'},
      {id:'reaction',duration:12,narration:'Newton third law says forces occur in equal and opposite pairs on interacting objects.'}
    ],subtitles:[{start:0,end:12,text:'Objects resist changes in motion.'},{start:12,end:24,text:'Fnet = ma.'},{start:24,end:36,text:'Action and reaction forces are equal and opposite.'}]
  }
};
