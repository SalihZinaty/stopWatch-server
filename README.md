# stop-watch-server
stop watch server using ExpressJS framework

# How it works
1. using the url params, the user specify the name of the watch
2. using the provided API's, the user can:
  a. add stop-watch to the lap
  b. start a stop watch
  c. stop the stop watch
  d. peek on the lap
  e. show the current time
 
 # The API's 
    1. add a new stop watch to the lap using the API: /addwatch?name=THE_NAME_OF_THE_STOPWATCH

    2. start an existing stop watch using the API: /startwatch?name=THE_NAME_OF_THE_STOPWATCH

    3. stop an existing stop watch using the API: /stopwatch?name=THE_NAME_OF_THE_STOPWATCH

    4. show all the stop watches that exists in the lap using the API: /showlap