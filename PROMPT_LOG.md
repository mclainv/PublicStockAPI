# Prompt Log and explanation of work

## Info

All prompts used Opus 5 (High).

## Prompts

> Create and push to origin a private gh repo in a folder titled PublicStockAPI. Initialize a folder with a node express webserver, and a folder with an empty react project.

- This will set up my project structure in the meantime while I read through the project requirements again. I am confident in my ability to double check the project structure, package versions, etc. to confirm.
Then, I added an author field to package.json and removed placeholder assets from the React project. Claude asked to confirm before pushing it, so I cleaned up the project, committed my changes and pushed it myself.

Next, I added an async route handler accessible by "/api/stocks/:symbol", added the axios package because I'm familiar with it already, and set up the basis for accessing the data. This was with the understanding I might rearrange this code into more specific functions once it is functional - or have Claude do that.

> Where can I find the parameters of the api in this example?

- I had the example public endpoint from yahoo in an axios request. I wanted to know which parameters I could supply as an object. I confirmed the source of the information from Claude and went with range for getting 1 month of data.

> The data uses a column structure. All of the timestamps and data need to be grouped by day, even if the current day's data or first day's data is incomplete.  Suggest a function to group the data into a map with date keys that have a value of an array of objects that contain timestamp, low, and high. Here is the output from curling the endpoint: {output}

- To avoid writing this grouping logic from scratch, I asked Claude for an example function after I looked at the public api's output. Then I wrote it myself, referencing its solution, so I didn't overlook anything. I was unfamiliar with Intl.DateTimeFormat which Claude suggested I use as a way to standardize the timestamp information.
I then wrote the averageByData function by hand, because I had a clear idea immediately of how it should look, and it did not take more than a few minutes. I made sure to account for only having either the low or the high data for a timestamp, ignoring the timestamp for the missing value, and included the given value in the average.
  > What are the benefits of tracking package-lock.json with git - and are there any downsides?
- In the past I have both tracked and not tracked package-lock on different projects. I realize now that explicitly displaying your package versions at runtime is beneficial because package.json only gives a range of package version. In this project packages are unlikely to change and break backwards compatibility but in terms of security considerations and expandability it is the right call.
I then created a basic React project structure manually, adding a main.jsx and App.jsx, as well as a components and styles folder.
  > Show me a couple examples of multi-line graphs built in React apps. Make sure the packages used to create them are clear. I'm going to be displaying 3 lines with ~30 data points each. I want it to be interactive, able to respond to mouse overs, but I don't want it to be too complex that the meaning of the data is lost.
- I wanted to see examples of multi-line graphs that npm packages help you to easily create before I select a package. The benefit of asking Claude to show me examples is they are going to fit my specific needs, and I can keep working on other tasks while that research is done for me. I could easily have Claude create the graph and page for me, but I'll have more control over the design philosophy if I do it myself, and only use Claude when something will take too long for me to do myself. I googled the recharts package to find examples, then found its docs, and went with that. 
Then, I made two graphs - one showing lowAverages and highAverages, and one showing volume, since the scales would likely be different by multiple orders of magnitude. I looked at the recharts docs and modeled it after one of their examples, and then checked the responsiveness of the graph on different screen sizes.
  > Using my default style sheet and its design principles, create a page with a header that says Public Stock Averages, a form where you can input a stock symbol, and a way to display an unobtrusive error message, or the ability to display a graph with width: 100% of the page's container, and a reasonable height (>50%)
- I have an mdc rule which specifies my custom default style sheet, which I use as a guide, and the agents do as well unless otherwise specified. I have moved it to the project level so it can be reviewed. This makes me more comfortable with the design output of Claude, and I usually don't need to make adjustments, if I'm just relying on a nice, simple style guide in the first place.
I added some useState hooks to keep track of error messages (status), data and graph (chart), loading status (loading) and the user's symbol (symbol). Along with the stylized form and chart, the app is now *almost* completed.
I added a button in the chart header to switch between seeing averages and seeing volume, which is kept track of in the chart component.
  > Adding buttons into my list broke the styling. Quickly correct it, and emphasize whichever option is selected.
- It copied very simple styling over to the li button selector, found the correct unicode character that is consistent with my list styling, and inserted it. I needed to go back in and add the correct aria label because it put a purely style element in the page text
  > Show a customToolTip function that incorporates my default style, and shows volume, low average, and high average on either chart. The data provided to both is the same so its accessible on both.
- Rather than learn all of the ins and outs of this function, I would rather look at an example that does what I need it to and change it only if necessary.

