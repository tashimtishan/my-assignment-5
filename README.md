1.what is the difference between var, let, and const?
var, let, and const are used to declare variables in JavaScript,but they are not exactly the same. var is the older method and it is function scoped, which sometimes creates confusion in bigger programs.let is block scoped, so it only works inside the block where it is declared, and its value can be changed later.const is also block scoped,but once you assign a value, you cant change it again. Thats why const is mostly used for fixed values.

2.what is the spread operator?
The spread operator is used to expand values from arrays or objects.It helps to copy or combine things easily. For example,you can join two arrays or copy an object and add new values into it. It makes the code shorter and more easier to read.

3.what is the difference between map,filter,and forEach?
All three are array methods but they work differently. map is used to change every element of an array and returns a new array. filter is used to select elements based on a condition and also returns a new array. forEach just loops through the array and does something with each element,but it does not return anything. So it is mostly used when you just want to run some code for each item.

4.what is an arrow function?
An arrow function is a shorter way to write a function in JavaScript. It uses => instead of the normal function keyword. It makes the code look cleaner and is very usefull for small functions. It is also commonly used inside array methods.

5.what are template literals?
Template literals are strings written using backticks.They allow you to add variables inside a string using ${} which makes it more easier to work with dynamic values. They also support multi line strings, so you dont have to use \n again and again.