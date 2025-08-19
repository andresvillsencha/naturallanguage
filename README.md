# naturallanguage
JSDays Files. Does not include the ExtJS SDK

To get this to run, you'll need to create a new Ext JS project, install Node JS inside the server folder, and run sencha app watch.

To create your new Ext JS application:
- Commercial Version
   - sencha -sdk [ROUTE_SDK] generate app -classic App .\
- Trial Edition
   - sencha generate app classic -ext App .\

To "compile" your Ext JS App for the first time
- sencha app refresh
- sencha app build development

To create your web server (inside the server folder):
- npm init -y
- npm install express cors dotenv body-parser openai


When you have everything up and ready, be sure to run sencha app watch, and test on your web browser of choice:
- sencha app watch

your file structure should look something like this:
app/
build/
ext/ **
resources/
server/
app.js
app.json
bootstrap.css **
bootstrap.js **
bootstrap.json **
bootstrap.jsonp **
build.xml
index.html
workspace.json

** Files missing will be added once you create your own application with sencha command

The server .env file requires your OpenAI key.