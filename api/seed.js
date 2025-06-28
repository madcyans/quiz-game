require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('./models/Question');
const arr = [
  {
    text: 'What color is a mirror?',
    choices: ['Silver', 'No color, it reflects', 'White', 'Depends on lighting'],
    answer: 'No color, it reflects'
  },
  {
    text: 'How many chickens to be as tall as a giraffe?',
    choices: ['5', '8', '10', 'Depends on the chicken’s posture'],
    answer: '10'
  },
  {
    text: 'If you drop a feather and an elephant in a vacuum, which hits first?',
    choices: ['Feather', 'Elephant', 'They land together', 'The vacuum breaks'],
    answer: 'They land together'
  },
  {
    text: 'Can you cry in space?',
    choices: ['No', 'Yes, but tears float', 'Only astronauts trained to cry can', 'Depends on helmet pressure'],
    answer: 'Yes, but tears float'
  },
  {
    text: 'How long is a piece of string?',
    choices: ['3 meters', '42 inches', 'Twice half its length', 'One lightsecond'],
    answer: 'Twice half its length'
  },
  {
    text: 'Why don’t bananas grow upside down?',
    choices: ['They do', 'Gravity stops them', 'Because they like the sun', 'Chimpanzee conspiracy'],
    answer: 'They do'
  },
  {
    text: 'What weighs more: a kilogram of bricks or a kilogram of feathers?',
    choices: ['Bricks', 'Feathers', 'Neither, same weight', 'Depends on the wind'],
    answer: 'Neither, same weight'
  },
  {
    text: 'Can you dig half a hole?',
    choices: ['Yes, just stop halfway', 'No, a hole is already whole', 'Only on Mondays', 'Depends on the shovel'],
    answer: 'No, a hole is already whole'
  },
  {
    text: 'If Pinocchio says “My nose will grow,” what happens?',
    choices: ['It grows', 'It shrinks', 'Nothing', 'It’s a paradox'],
    answer: 'It’s a paradox'
  },
  {
    text: 'How many ducks does it take to screw in a lightbulb?',
    choices: ['One', 'Two', 'None, ducks don’t use electricity', 'Depends on wattage'],
    answer: 'None, ducks don’t use electricity'
  },
  {
    text: 'If a tomato is a fruit, is ketchup a smoothie?',
    choices: ['Yes', 'No', 'Only on Tuesdays', 'Depends on the blender'],
    answer: 'Yes'
  },
  {
    text: 'Can you sneeze with your eyes open?',
    choices: ['Yes', 'No', 'Only in cartoons', 'Depends on the sneeze'],
    answer: 'No'
  },
  {
    text: 'Why did the chicken cross the Möbius strip?',
    choices: [
      'To get to the same side',
      'To prove it could',
      'It was lost',
      'Interdimensional chicken business'
    ],
    answer: 'To get to the same side'
  },
  {
    text: 'If you try to fail and succeed, which did you do?',
    choices: [
      'You failed',
      'You succeeded at failing',
      'Neither',
      'Both simultaneously'
    ],
    answer: 'You succeeded at failing'
  },
  {
    text: 'Do fish get thirsty?',
    choices: ['Yes', 'No', 'Only goldfish', 'None of the above'],
    answer: 'No'
  },
  {
    text: 'Can you fold a piece of paper in half more than 7 times?',
    choices: [
      'Yes',
      'No',
      'Only with infinite paper',
      'Depends on the paper’s size'
    ],
    answer: 'No'
  },
  {
    text: 'What is the color of the wind?',
    choices: ['Invisible', 'Blue', 'Transparent', 'It changes'],
    answer: 'Invisible'
  },
  {
    text: 'How many licks to get to the center of a Tootsie Pop?',
    choices: ['3', '142', 'Infinite', 'None'],
    answer: 'Infinite'
  },
  {
    text: 'Can you stand on liquid?',
    choices: [
      'Yes',
      'No',
      'Only if it’s frozen',
      'Depends on the viscosity'
    ],
    answer: 'Only if it’s frozen'
  },
  {
    text: 'Which weighs more: a pound of gold or a pound of feathers?',
    choices: [
      'Gold (troy pound)',
      'Feathers (avoirdupois pound)',
      'Neither, a pound is a pound',
      'Depends on the wind'
    ],
    answer: 'Neither, a pound is a pound'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Question.deleteMany();
    await Question.insertMany(arr);
    console.log('Seeded multiple-choice questions');
    process.exit();
  })
  .catch(console.error);