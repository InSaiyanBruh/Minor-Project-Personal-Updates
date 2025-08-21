
libs:
bcrypt, ejs, express, mongoose, JWT, remixicon, cors

to run this:
npx nodemon index.js


to install tailwindcss cli:
npm install tailwindcss @tailwindcss/cli

in style.css:

@import "tailwindcss";

*{
    margin: 0;
    padding: 0;
} 

and to run tailwind cli:
npx @tailwindcss/cli -i ./public/style.css -o ./public/output.css --watch

it will create output.css in the public folder
