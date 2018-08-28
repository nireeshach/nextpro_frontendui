Steps for setting up the UI
1.Extract the shared zip file and create a virtual environment. 
2.Install all the dependencies need using 'requirements.txt' file, you can find this is the parent directory of extracted files. 
3.After installing the dependencies you can run the command below to access the UI from the browser, using localhost or system ip and the port mentioned in command
4. gunicorn -b 0.0.0.0: main:app --timeout 360 
Note: We need to run the above command from the same path of "main.py" file.

steps for creating the UI
install the video.js webplayer 2.by using the bootstrap, keep the menu bars
did sections to the page. in the left activate the video with the video.js
in the right section using google chats created a timeline
timeline data is taken from the csv file 6.in js. funtion to the selection of the timeline bar to shift to the particular time
`
