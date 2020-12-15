# login-najjar
authorization test system for my future projects.

## Project Versions
***2020-12-14 V0.0*** -> Initial version. It can Login and check token

***2020-12-15 V0.5*** -> fixed minor things, added front example.

## Context
**Every** idea that I have I always struggle with Authorization System. With this barebones project I intend to use it when I'll make some new projects (personal or freelance)

**It needs MySQL.** Check and Run `script.sql`.

## Installation (login-najjar)
```
npm install
npm start
```

## Installation (example-login-najjar)
Inside root folder, there is the `/example-login-najjar` folder. Inside there just:

*(if you dont have yarn, please type* `npm install -g yarn` *beforehand)*

```
yarn install
yarn start
```

Then go to `localhost:3000`

## Conclusion
I hope that someday I'll help someone with this project. My objective here is to comment every meaningful action to show **what** and **why** I'm doing this.

### TODOs
- [ ] Write a proper README.md
- [ ] Add style to `example-login-najjar`
- [ ] Comment project, both `login-najjar` and `example-login-najjar`
- [X] Check `login-najjar` to be more generic overall
- [ ] On `/changePass`, need to check the old Password first (or anyone can do it lol)
- [ ] e-mail?
- [ ] .env setup
- [ ] first login (create user)
