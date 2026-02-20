// questions.js

const questions = {
  "Time Complexity": [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "What is the time complexity of linear search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(n)"
  },
  {
    question: "What is the worst case of bubble sort?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(n log n)"],
    answer: "O(n^2)"
  },
  {
    question: "Which complexity grows fastest?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(n^2)"
  },
  {
    question: "What is constant time complexity?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    question: "Accessing array element by index takes?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)"
  },
  {
    question: "Which is better complexity?",
    options: ["O(n^2)", "O(n)", "O(log n)", "O(n^3)"],
    answer: "O(log n)"
  },
  {
    question: "Nested loops usually result in?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(n^2)"
  }
],

 "Sorting": [
  {
    question: "Which sorting algorithm compares adjacent elements?",
    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Binary Sort"],
    answer: "Bubble Sort"
  },
  {
    question: "Which sorting is divide and conquer?",
    options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"],
    answer: "Merge Sort"
  },
  {
    question: "Which sorting algorithm is fastest on average?",
    options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"],
    answer: "Quick Sort"
  },
  {
    question: "Which sorting algorithm is stable?",
    options: ["Merge Sort", "Quick Sort", "Heap Sort", "None"],
    answer: "Merge Sort"
  },
  {
    question: "Insertion sort works best for?",
    options: ["Large arrays", "Small arrays", "Sorted arrays", "Random arrays"],
    answer: "Sorted arrays"
  },
  {
    question: "Which sorting has O(n log n) average time?",
    options: ["Quick Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"],
    answer: "Quick Sort"
  },
  {
    question: "Selection sort selects?",
    options: ["Largest element", "Smallest element", "Random element", "Middle element"],
    answer: "Smallest element"
  },
  {
    question: "Bubble sort swaps?",
    options: ["Adjacent elements", "Random elements", "First and last", "None"],
    answer: "Adjacent elements"
  }
],
  "Recursion": [
  {
    question: "Recursion is when a function?",
    options: ["Calls itself", "Stops immediately", "Loops forever", "Returns nothing"],
    answer: "Calls itself"
  },
  {
    question: "Base case in recursion is?",
    options: ["Stopping condition", "Loop", "Variable", "Error"],
    answer: "Stopping condition"
  },
  {
    question: "Factorial is example of?",
    options: ["Loop", "Recursion", "Sorting", "Searching"],
    answer: "Recursion"
  },
  {
    question: "Recursion uses?",
    options: ["Stack", "Queue", "Array", "Tree"],
    answer: "Stack"
  },
  {
    question: "Without base case recursion causes?",
    options: ["Infinite loop", "Error", "Nothing", "Sorting"],
    answer: "Infinite loop"
  },
  {
    question: "Recursive calls are stored in?",
    options: ["Heap", "Stack", "Queue", "Array"],
    answer: "Stack"
  },
  {
    question: "Recursion can replace?",
    options: ["Loops", "Variables", "Arrays", "Sorting"],
    answer: "Loops"
  },
  {
    question: "Every recursive function must have?",
    options: ["Base case", "Loop", "Array", "Class"],
    answer: "Base case"
  }
],
  "Searching": [
  {
    question: "Binary search works on?",
    options: ["Sorted array", "Unsorted array", "Linked list", "Tree"],
    answer: "Sorted array"
  },
  {
    question: "Linear search checks?",
    options: ["Every element", "Middle only", "First only", "Last only"],
    answer: "Every element"
  },
  {
    question: "Binary search divides array into?",
    options: ["Two halves", "Three parts", "Four parts", "None"],
    answer: "Two halves"
  },
  {
    question: "Worst case of linear search?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    answer: "O(n)"
  },
  {
    question: "Binary search time complexity?",
    options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
    answer: "O(log n)"
  },
  {
    question: "Searching in unsorted array uses?",
    options: ["Linear search", "Binary search", "Merge search", "None"],
    answer: "Linear search"
  },
  {
    question: "Binary search compares with?",
    options: ["Middle element", "First element", "Last element", "Random"],
    answer: "Middle element"
  },
  {
    question: "Binary search reduces problem size by?",
    options: ["Half", "One", "Double", "Triple"],
    answer: "Half"
  }
],

  "Data Structures": [
  {
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Array", "Tree"],
    answer: "Queue"
  },
  {
    question: "Stack follows?",
    options: ["FIFO", "LIFO", "Random", "None"],
    answer: "LIFO"
  },
  {
    question: "Tree has?",
    options: ["Root", "Leaf", "Nodes", "All"],
    answer: "All"
  },
  {
    question: "Array stores elements?",
    options: ["Sequentially", "Randomly", "Stacked", "None"],
    answer: "Sequentially"
  },
  {
    question: "Linked list stores data in?",
    options: ["Nodes", "Arrays", "Stacks", "Queues"],
    answer: "Nodes"
  },
  {
    question: "Stack operations are?",
    options: ["Push & Pop", "Insert & Delete", "Add & Remove", "None"],
    answer: "Push & Pop"
  },
  {
    question: "Queue operations are?",
    options: ["Enqueue & Dequeue", "Push & Pop", "Add & Remove", "None"],
    answer: "Enqueue & Dequeue"
  },
  {
    question: "Binary tree has maximum children?",
    options: ["2", "3", "4", "1"],
    answer: "2"
  }
]
};
export default questions;