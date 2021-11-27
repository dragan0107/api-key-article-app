Forlogis test project.
## It is a full stack application made with MERN.
### Users can login and register, create API keys, add, delete and update articles, and use the API key to gain access to the articles without logging in after. When not logged in, users can leave article comments anonymously.
- Login and Registration system is custom made, password encrypted using 'bcrypt', while JSON Web Token is used
for the user authentication.
- Registration modal will let user know if username was already taken, as he types it, or if passwords do not match.
- On the Dashboard page, user can create new API Keys which can later be used to get access to the existing articles, without logging in.
- API key is passed in a form of query: Ex: "http://localhost:3000/public/articles?apikey=P23cq3ohN6PYpK8ApC7ebkZ" <---(valid apiKey)
- Pagination functionality.
- Backend middleware will check if passed apikey is valid, if so, it will grant access to the articles.
- Logged in users do not have to pass API key.
- Adding articles with image.
- Image is uploaded on a cloud server, and pulled directly by the url. (Cloudinary clouding service).


## How to use? 
- Go both into 'api' and 'client' folders and run
```
npm install
```
- After that, run the following command both for api and client:
```
npm start
```

- If there is any errors for installing client dependencies, try to use --force to fix it..

- Then you can login with username: 'drip' , password: 'drip', or register your own account.

### Screenshots
![image](https://user-images.githubusercontent.com/73792907/143687255-fd8593f7-c53c-4cc8-a66c-3c1518b8b363.png)
![image](https://user-images.githubusercontent.com/73792907/143687286-55e7128b-1957-4b81-b163-1327425bed82.png)
![image](https://user-images.githubusercontent.com/73792907/143687303-699371e0-96dc-423a-863e-8bc12fcd295f.png)
![image](https://user-images.githubusercontent.com/73792907/143687310-977aec31-88c3-440f-a093-b509da4ede36.png)
