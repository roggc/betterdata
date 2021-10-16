# betterdata

## instructions to run the project

*git clone* the repository. then do *npm i* to install dependencies. after that you can do *npm start* to run the project (web app). do *npm test* if you want to run the unit tests.

## using the app
you can import/upload a csv file in the first screen. once done you will see a table with the data of the CSV file. after that you can edit the view pressing the 'edit view' button. In the edit view screen, you can change the name of the columns of the data table, you can choose whether to show or not (include) a specific column, and you have also the 'encoding type' and 'encoding options' columns. In 'encoding type' column, you can choose between 'digit' or 'categorical' and in 'encoding options' column you can set a value (a float or an integer depending on if 'encoding type' is 'digit' or 'categorical'). Finally, you have the button 'send to backend' to console.log the values from 'encoding options' column. You have also the 'done' button on this screen to go back to the first screen (data table screen).