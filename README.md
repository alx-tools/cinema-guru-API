# Holberton School Cinema Guru API
This is a simple movies API dedicated for Holberton School React Project Holberton School Cinema Guru

## Response Codes 
### Response Codes
```
200: Success
400: Bad request
401: Unauthorized
404: Cannot be found
405: Method not allowed
422: Unprocessable Entity 
50X: Server Error
```
### Example Error Message
```json
http code 402
{
    "code": 120,
    "message": "invalid crendetials",
    "resolve": "The username or password is not correct."
}
```

## Login
**You send:**  Your  login credentials.
**You get:** An `API-Token` with wich you can make further actions.

**Request:**
```json
POST api/auth/login HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "username": "foo",
    "password": "1234567" 
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message":"Logged in successfully",
    "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiQXRlZiIsImlhdCI6MTY0OTg2MzQxNCwiZXhwIjoxNjQ5OTQ5ODE0fQ.WPTSn01ooByJsUF44uwwko1zXj6YObSl0XWZeqHuQiI"
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Invalid crendetials",
}
``` 
## Register
**You send:**  Your  account credentials.
**You get:** An `API-Token` with wich you can make further actions.

**Request:**
```json
POST api/auth/register HTTP/1.1
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "username": "foo",
    "password": "1234567" 
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message":"Registred successfully",
    "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiQXRlZiIsImlhdCI6MTY0OTg2MzQxNCwiZXhwIjoxNjQ5OTQ5ODE0fQ.WPTSn01ooByJsUF44uwwko1zXj6YObSl0XWZeqHuQiI"
}
```
**Failed Response:**
```json
HTTP/1.1 400 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Invalid username",
}
``` 
## Auth
**You send:**  Your login credentials.
**You get:** Your userId and username.

**Request:**
```json
POST api/auth/ HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

{
    "username": "foo",
    "password": "1234567" 
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "userId":5,
    "username":"foo"
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "message": "Invalid token",
}
``` 
## Advanced Search
**You send:**  Filters and the sorting.
**You get:** List of movies/shows from DB.

**Request:**
```json
GET api/titles/advancedsearch HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
| Parameters        | Description           | Example  |
| ------------- |:-------------:| -----:|
| maxYear      | The maximum year of the movie release | "2022" |
| minYear      | The minimum year of the movie release | "2020" |
| genre | List of genres seperated by a comma      |    "action,drama,history" |
| title | The movie/show title     |    "The Meg" |
| page | The page to query     |    2 |
| sort | Sort by      |    "latest", "oldest", "highestrated", "lowestrated" |

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "totalCount": 50
    "titles": [{
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
    ]
}
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Favorites
**You send:**  N/A.
**You get:** List of favorited movies/shows from DB.

**Request:**
```json
GET api/titles/favorite HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Watch Later
**You send:**  N/A.
**You get:** List of movies/shows to watch later from DB.

**Request:**
```json
GET api/titles/watchlater HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Favorite A Movie
**You send:**  The movie IMDB Id.
**You get:** List of all favorited movies.

**Request:**
```json
POST api/titles/favourite HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy
```

| Parameters        | Description           | Example  |
| ------------- |:-------------:| -----:|
| imdbId      | Imdb movie/show Id | "tt9899344" |

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]

```


**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Add movie to watch later
**You send:**  The movie IMDB Id.
**You get:** List of all to watch later movies.

**Request:**
```json
POST api/titles/watchlater HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```

| Parameters        | Description           | Example  |
| ------------- |:-------------:| -----:|
| imdbId      | Imdb movie/show Id | "tt9899344" |

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Remove movie from favourites
**You send:**  The movie IMDB Id.
**You get:** List of all favorited movies.

**Request:**
```json
DELETE api/titles/favorite HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```

| Parameters        | Description           | Example  |
| ------------- |:-------------:| -----:|
| imdbId      | Imdb movie/show Id | "tt9899344" |

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## Remove movie from watch later
**You send:**  The movie IMDB Id.
**You get:** List of all to watch later movies.

**Request:**
```json
DELETE api/titles/watchlater HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```

| Parameters        | Description           | Example  |
| ------------- |:-------------:| -----:|
| imdbId      | Imdb movie/show Id | "tt9899344" |

**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "createdAt": "2022-03-28T10:02:29.452Z"
        "genres": ["Drama"]
        "id": 2
        "imageurls": [
            "https://m.media-amazon.com/images/M/MV5BNzY5Yjg4MDYtNThmOC00ODU0LWIzYjQtOWJhYWFjN2MxZDk0XkEyXkFqcGdeQXVyNDMyNTgyNDQ@._V1_UY268_CR146,0,182,268_AL_.jpg"
        ]
        "imdbId": "tt9899344"
        "imdbrating": -1
        "quotes": []
        "released": 2022
        "reviews": []
        "runtime": -1
        "summary": ""
        "synopsis": "Dreamers in a lonely circus."
        "title": "GodHead: In a fiction, in a dream of passion"
        "trailerUrl": []
        "type": "movie"
        "updatedAt": "2022-03-28T10:02:29.452Z"
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 
## User activities
**You send:**  N/A.
**You get:** List of recent user activities.

**Request:**
```json
GET api/activity/ HTTP/1.1
Authorization: "Bearer <accessToken>"
Accept: application/json
Content-Type: application/json
Content-Length: xy

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

[
    {
        "TitleId": 2
        "activityType": "favourite"
        "createdAt": "2022-04-13T15:53:26.751Z"
        "id": 77
        "title": {title: "GodHead: In a fiction, in a dream of passion"}
        "updatedAt": "2022-04-13T15:53:26.751Z"
        "user": {username: "Atef"}
        "userId": 1
    },
    ...
]
```
**Failed Response:**
```json
HTTP/1.1 500 Internal Error
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    ...
}
``` 

## Authors

- Atef Mechken [@atefMck](https://www.github.com/atefMck)