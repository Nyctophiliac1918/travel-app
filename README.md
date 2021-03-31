# Snapwiz-project

## General info
Assignment submission for Snapwiz
	
## Technologies
Project is created with:
* Reactjs, Bootstrap (Frontend)
* Nodejs, Express (Backend)
* MongoDB (Database)

## About
* The frontend and the backend communicates with the help of **axios** package.
* The dropdown present on the client-side was populated with the help of the '/places' endpoint of the server-side.
* For finding the fastest and the cheapest route between the cities provided in the data.json file given to us, Graph and Priority Queue data structures were used. The **Graph** was populated with the given data and Dijkstra algorithm was used with the source and destination acquired from the post request on '/find-route' endpoint.
* As the Dijkstra algo only works for the non-negative weighted edges, in the case of finding the cheapest route, every instance of negative effective cost ( cost - discount ) was taken to be 0 EUR.
* If the source and destination are not chosen differently or either of them is empty, the page shows the user some error. By default, the route to be shown is set to be the fastest one.

The site has been deployed on heroku : https://karan-travel-app.herokuapp.com/
