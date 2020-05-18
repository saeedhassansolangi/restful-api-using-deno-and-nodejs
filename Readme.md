# RestFul-api Node Vs Deno 

# ---- DENO------ 
Deno is a new runtime for Typescript (and Javascript) written mostly in Rust. It has some great goals and some very interesting "Non-Goals", like not using npm and not having a package.json.

Getting it installed
Installing deno is as easy as running this command:

curl -fsSL https://deno.land/x/install/install.sh | sh

Then copy the export line and add it to your ~/bashrc or ~/bash_profile.

Open a new terminal and run deno. You should get a > prompt. Type exit and let's dig into some features!

Cool features in Deno
Typescript by default
Deno is integrated to run Typescript files by default. It basically makes types in Javascript a first-class citizen. No more compiling through Babel to use Typescript in server-side Javascript.

Importing from a URL
Deno lets you import from the web, just like you can in the browser. Just add a URL where you would usually name a module:
import { bgBlue, red, bold } from "https://deno.land/std/colors/mod.ts";
A Standard Library
Furthermore, Deno has a standard library that is easy to import and use. There are modules that do a couple of different things, like HTTP handling, datetime work, and file system work. You can check it out here.

Uses ES modules
Finally, Deno only supports ES module syntax, which means no more require() statements, just good ole' import x from "y".


# ----- Node-------

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

Download node and its pakage manager Npm from official site and install it with dependencies

How do I start with Node.js after I installed it?
Once we have installed Node.js, let's build our first web server. Create a file named app.js containing the following contents:

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
Now, run your web server using node app.js. Visit http://localhost:3000 and you will see a message saying "Hello World".
