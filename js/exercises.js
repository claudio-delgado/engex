let modules = [
    {
        "1_module": 1,
        "1_module_info": "Present"
    },
    {
        "1_module": 2,
        "1_module_info": "Future"
    },
    {
        "1_module": 3,
        "1_module_info": "Grammar"
    }
]
let submodules = [
    {
        "1_module": 1,
        "2_submodule": 1,
        "2_submodule_info": "Ser o Estar (Verb TO BE)"
    },
    {
        "1_module": 1,
        "2_submodule": 2,
        "2_submodule_info": "Ser o Estar (Verb TO BE) Questions"
    },
    {
        "1_module": 3,
        "2_submodule": 1,
        "2_submodule_info": "Identify grammar words"
    }
]
//In "Mark words" exercises, list of word tokens.
let wordTokens = [
    "adjective",
    "article",
    "adverb",
    "connective",
    "noun",
    "number",
    "participle",
    "preposition",
    "pronoun",
    "verb"
]
// Large array of exercises.
let exercises = [
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 1,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Sarah", 0, "at", "home."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 2,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["I", 0, "and", "he", 1, "here"],
        "5_possibleAnswers": [["am", "is", "are"], ["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 3,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["You", 0, "my", "daughter."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 4,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Joe", "and", "I", 0, "friends."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 5,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Paul", 0, "thirsty."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 6,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["I", 0, "not", "rich."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 7,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["This", "bag", 0, "heavy."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 8,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["These", "bags", 0, "heavy."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 9,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["I", 0, "a", "taxi", "driver.", "You", 1, "a", "nurse."],
        "5_possibleAnswers": [["am", "is", "are"], ["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 10,
        "3_exercise_info": "Completá utilizando <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Look!", "There", 0, "Helen."],
        "5_possibleAnswers": [["am", "is", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 11,
        "3_exercise_info": "Completá utilizando un pronombre y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["I'm", "not", "hungry", "but", 0, "thirsty."],
        "5_possibleAnswers": [["You're", "He's", "I'm", "She's", "We're", "It's", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 12,
        "3_exercise_info": "Completá utilizando un pronombre y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Kathy", "isn't", "at", "home.", 0, "at", "work."],
        "5_possibleAnswers": [["You're", "He's", "I'm", "She's", "We're", "It's", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 13,
        "3_exercise_info": "Completá utilizando un pronombre y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Mr", "Thomas", "is", "a", "very", "old", "man.", 0, "98."],
        "5_possibleAnswers": [["You're", "He's", "I'm", "She's", "We're", "It's", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 14,
        "3_exercise_info": "Completá utilizando un pronombre y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["These", "chairs", "aren't", "beautiful,", "but", 0, "comfortable."],
        "5_possibleAnswers": [["You're", "He's", "I'm", "She's", "We're", "It's", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 15,
        "3_exercise_info": "Completá utilizando un pronombre y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["The", "weather", "is", "nice", "today.", 0, "warm", "and", "sunny."],
        "5_possibleAnswers": [["You're", "He's", "I'm", "She's", "We're", "It's", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 16,
        "3_exercise_info": "Completá utilizando HERE o THERE y <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["'", 0, "your", "coat.'", "'Oh", "thank", "you", "very", "much."],
        "5_possibleAnswers": [["Here're", "Here's", "There're", "There's", "I'm", "It's", "He's", "She's"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 17,
        "3_exercise_info": "Completá utilizando pronombres y/o <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["My", "sister", 0, "tired.", 1, "thirsty."],
        "5_possibleAnswers": [["am", "is", "are"], ["She's", "He's", "I'm", "You're", "We're", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 18,
        "3_exercise_info": "Completá utilizando pronombres y/o <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["This", 0, "Paul.", 1, "scared."],
        "5_possibleAnswers": [["am", "is", "are"], ["She's", "He's", "I'm", "You're", "We're", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 19,
        "3_exercise_info": "Completá utilizando pronombres y/o <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["These", 0, "my", "parents.", 1, "cold."],
        "5_possibleAnswers": [["am", "is", "are"], ["She's", "He's", "I'm", "You're", "We're", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 1,
        "3_exercise": 20,
        "3_exercise_info": "Completá utilizando pronombres y/o <strong>am</strong>, <strong>is</strong>, o <strong>are</strong>",
        "4_words": ["Annie", "and", "I", 0, "friends.", 1, "hungry."],
        "5_possibleAnswers": [["am", "is", "are"], ["She's", "He's", "I'm", "You're", "We're", "They're"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 1,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["Where's the camera?", 0],
        "5_possibleAnswers": [["London", "In your bag", "No, she's American"], ["No, I'm not", "Yes, you are", "My sister", "Black", "No, it's black", "Very well"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 2,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["Is your car blue?", 0],
        "5_possibleAnswers": [["No, I'm not", "Yes, you are", "No, it's black"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 3,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["Is Kate from London?", 0],
        "5_possibleAnswers": [["No, she's American", "Yes, you are", "London"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 4,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["Am I late?", 0, "Are you hungry?", 1],
        "5_possibleAnswers": [["No, she's American", "Yes, you are", "No, I'm not"], ["No, I'm not", "Yes, you are", "Very well"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 5,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["Where's Amy from?", 0],
        "5_possibleAnswers": [["No, she's American", "My sister", "London"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 6,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["What colour is your flag?", 0],
        "5_possibleAnswers": [["No, she's American", "Black", "No, it's black"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 7,
        "3_exercise_info": "Encontrá la respuesta más indicada para la pregunta",
        "4_words": ["How is George?", 0, "Who's that woman?", 1],
        "5_possibleAnswers": [["Very well", "No, I'm not", "In your bag"], ["Very well", "No, she's American", "My sister"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 8,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["is / at home / your mother", 0],
        "5_possibleAnswers": [["At home is your mother?", "Your mother is at home?", "Is your mother at home?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 9,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["your parents / are / well", 0],
        "5_possibleAnswers": [["Well are your parents?", "Your parents are well?", "Are your parents well?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 10,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["interesting / is / your job", 0],
        "5_possibleAnswers": [["Is interesting your job?", "Your job is interesting?", "Is your job interesting?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 11,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["the shops / are / open today", 0],
        "5_possibleAnswers": [["Are the shops open today?", "Are open today the shops?", "The shops are open today?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 12,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["from / where / you / are", 0],
        "5_possibleAnswers": [["From where are you?", "Are from where you?", "Where are you from?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 13,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["interested in sport / you / are", 0],
        "5_possibleAnswers": [["You are interested in sport?", "Are you interested in sport?", "Interested in sport are you?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 14,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["is / near here / the station", 0],
        "5_possibleAnswers": [["Is the station near here?", "The station near here is?", "Is near here the station?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 15,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["at school / are / your children", 0],
        "5_possibleAnswers": [["Are at school your children?", "Are your children at school?", "At school your children are?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 16,
        "3_exercise_info": "Hacé una pregunta con estas palabras",
        "4_words": ["you / are / late / why", 0],
        "5_possibleAnswers": [["Why are you late?", "Why you are late?", "Whay late you are?"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 17,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, "your parents?"],
        "5_notes": "Respuesta:&nbsp;<strong>They're very well</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 18,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, "the bus station?"],
        "5_notes": "Respuesta:&nbsp;<strong>At the end of the street</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 19,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, 2, "your children?"],
        "5_notes": "Respuesta:&nbsp;<strong>Five, six and ten</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["old", "much", "long", "many", "colour"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 20,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, 2, "these oranges?"],
        "5_notes": "Respuesta:&nbsp;<strong>US$2.40 a kilo</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["old", "much", "long", "many", "colour"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 21,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, "your favourite sport?"],
        "5_notes": "Respuesta:&nbsp;<strong>Skiing</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 22,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, "the man in this photo?"],
        "5_notes": "Respuesta:&nbsp;<strong>That's my father</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 23,
        "3_exercise_info": "Completá las preguntas con What..., Who..., Where... y How...",
        "4_words": [0, 1, 2, "your new shoes?"],
        "5_notes": "Respuesta:&nbsp;<strong>Black</strong>.",
        "5_possibleAnswers": [["What", "Who", "Where", "How", "Why"], ["old", "much", "long", "many", "colour"], ["is", "am", "are"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 24,
        "3_exercise_info": "Completá con respuestas tipo (Yes, I am / No, he isn't / etc.)",
        "4_words": ["Are you married?", 0, 1, 2],
        "5_possibleAnswers": [["No,", "Yes,"], ["I", "you", "he", "she", "it", "we", "they"], ["am", "am not", "is", "isn't", "are", "aren't"]]
    },
    {
        "0_type": "Fill in blanks",
                "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 25,
        "3_exercise_info": "Completá con respuestas tipo (Yes, I am / No, he isn't / etc.)",
        "4_words": ["Is Paul thirsty?", 0, 1, 2],
        "5_possibleAnswers": [["No,", "Yes,"], ["I", "you", "he", "she", "it", "we", "they"], ["am", "am not", "is", "isn't", "are", "aren't"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 26,
        "3_exercise_info": "Completá con respuestas tipo (Yes, I am / No, he isn't / etc.)",
        "4_words": ["Is it cloudy today?", 0, 1, 2],
        "5_possibleAnswers": [["No,", "Yes,"], ["I", "you", "he", "she", "it", "we", "they"], ["am", "am not", "is", "isn't", "are", "aren't"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 27,
        "3_exercise_info": "Completá con respuestas tipo (Yes, I am / No, he isn't / etc.)",
        "4_words": ["Are your hands cold?", 0, 1, 2],
        "5_possibleAnswers": [["No,", "Yes,"], ["I", "you", "he", "she", "it", "we", "they"], ["am", "am not", "is", "isn't", "are", "aren't"]]
    },
    {
        "0_type": "Fill in blanks",
        "1_module": 1,
        "2_submodule": 2,
        "3_exercise": 28,
        "3_exercise_info": "Completá con respuestas tipo (Yes, I am / No, he isn't / etc.)",
        "4_words": ["Are we teachers?", 0, 1, 2],
        "5_possibleAnswers": [["No,", "Yes,"], ["I", "you", "he", "she", "it", "we", "they"], ["am", "am not", "is", "isn't", "are", "aren't"]]
    },
    {
        "0_type": "Mark words",
        "1_module": 3,
        "2_submodule": 1,
        "3_exercise": 1,
        "3_exercise_info": "Marcá en la oración: verbos, adjetivos y sustantivos",
        "4_paragraphs": [
            "Hank is a cowboy. He lives on a farm. He has a horse named Ginger. Hank loves Ginger. He rides Ginger every day. Sometimes they walk slowly, and sometimes they run fast. They always have a good time", 
            "Ginger is Hank ’s horse. She is light brown. Her tail and mane are dark brown. She is three years old. She lives in the stable by the house",
            "Ginger waits for Hank every morning. She enjoys their time together. Often, Hank gives her apples. After long rides, Hank always washes and brushes Ginger. He usually brushes her tail. Then he gives her food and fresh water. Ginger loves Hank",
        ],
        "5_word_categories": [  
            [
                ["noun verb article noun"], 
                ["pronoun verb preposition article noun"], 
                ["pronoun verb article noun participle noun"], 
                ["noun verb noun"], 
                ["pronoun verb noun ? noun"], 
                ["adverb pronoun verb adverb connective adverb pronoun verb adverb"], 
                ["pronoun adverb verb article adjective noun"], 
            ],
            [
                ["noun verb noun genitive noun"], 
                ["pronoun verb adjective adjective"], 
                ["possesive noun connective noun verb article adjective"], 
                ["pronoun verb number noun adjective"], 
                ["pronoun verb preposition article noun preposition article noun"]
            ],
            [
                ["noun verb preposition noun ? noun"], 
                ["pronoun verb possesive noun adverb"], 
                ["adverb noun verb pronoun noun"], 
                ["adverb adjective noun noun adverb verb connective verb noun"],
                ["pronoun adverb verb possesive noun"],
                ["connective pronoun verb pronoun noun connective adjective noun"],
                ["noun verb noun"]
            ]
        ]
    }
]

let join = (objectArray1, objectArray2, attributeArray) => {
    let objectArray3 = []
    //Iterate first array.
    objectArray1.forEach((object1) => {
        //Iterate second array.
        objectArray2.forEach((object2) => {
            let attributesMatch = true
            attributeArray.forEach((attribute) => { 
                attributesMatch &&= object1[attribute] == object2[attribute]
            })
            //All attributes of the join operation match in both arrays?
            if(attributesMatch){
                let object3 = object1
                Object.keys(object2).forEach((attr) => {
                    if(!Object.keys(object1).includes(attr)){
                        object3[attr] = object2[attr]
                    }
                })
                objectArray3.push(object3)
            }
        })
    })
    return objectArray3
}
//exercises = join(exercises_modules, submodules, "2_submodule")
let selectWhere = (objectArray, attribute, value, operator = "==") => {
    var returnedObjects = []
    objectArray.forEach((object) => {
        if(
              (operator == "==" && object[attribute] == value)
            ||(operator == ">=" && object[attribute] >= value)
            ||(operator == "<=" && object[attribute] <= value)
            ||(operator == ">" && object[attribute] > value)
            ||(operator == "<" && object[attribute] < value)
        ){
            returnedObjects.push(object)
        }
    })
    return returnedObjects
}