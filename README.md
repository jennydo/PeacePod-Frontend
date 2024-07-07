<img alt="Book Hub GIF" src="./book-hub-home.gif">
By Hennessy (Hai-Anh) Nguyen, Nam Nguyen, Jenny (Trang) Do, Thanh Nguyen.

<!--  **Deployed Project Link: ...** -->

<br />

# PeacePod ✌️💖

A place where you can slow down, connect deeper, and create a personalized meditation just for you.


## Table of Contents 🗺️

- [Inspiration 🧠](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#inspiration-)
- [Main Features & How to use 👍](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#main-features--how-to-use-)
- [How we built it 💪](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#how-we-built-it-)
<!-- - [Architecture 🐙](https://github.com/jenneydo/PeacePod-Frontend#architecture-) -->
- Testing & GitHub Actions 🧪
- [Challenges we ran into 🥺](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#challenges-we-ran-into-)
- [Accomplishments 🥰](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#accomplishments-that-were-proud-of-)
- [What we learned 💡](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#what-we-learned-)
- [Next Steps 🤫](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#whats-next-for-peacepod-)
- [Team 🧑‍🤝‍🧑](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#team-)
- [Contributors ✨](https://github.com/jennydo/PeacePod-Frontend?tab=readme-ov-file#contributors-)


## Inspiration 🧠

We are living in a state where there are numerous constant notifications, live fast-paced lives, and often feel overwhelmed by the digital noise surrounding us. **PeacePod** aims to build a space where you can create your own safe digital pod, live slower and more intentionally, get away from instant notifications and constant distractions, connect with others on a deeper, more meaningful level, and create personalized meditation room that nurtures your well-being.

## Main Features & How to use 👍

### Create an account or log in 💓
<p align="center">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 16 54 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/6045a5ad-6857-4d8f-afc1-201e0d2376f7">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 17 16 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/16014e4b-7b10-4d19-8332-6076d005729e">
</p>

### Newsfeed 
#### Post your own postcard & See others 💓
<p align="center">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 18 06 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/f3167e04-4eaf-4de3-8a1b-076752d86250">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 18 22 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/bb227f05-c9fa-40e4-9887-a37f3dfb3579">
</p>

#### See the Waterfall of responses to Daily Prompt 💓
* The Daily Prompt is generated using OpenAI.
* When you click on the prompt, a new response will appear.
<p align="center">
  <img width="60%" alt="Screenshot 2024-06-26 at 10 18 44 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/6cd428f1-8fe1-4eac-9d0a-2f16639d7f93">
</p>

### Chat
#### Join the Matching list of the day and Get Matched at 9pm EST 
* Click on Get Matched.
* Fill in the input to have more data for a better match
* Wait till 9 PM. If you have a match, you will be notified!
<p align="center">
  <img width="60%" alt="Screenshot 2024-06-26 at 10 19 09 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/d7c71bc8-a5ec-40d0-a79d-7a97bd9ccc02">
</p>

#### Chatting with others 
* This is built with Socket.io.
* You can see the other person's profile.
* You can also do other things, such as changing chat nickname, leave chat, etc.
* You will receive a notification from other people when you are not in the chat.
<p align="center">
  <img width="60%" alt="Screenshot 2024-06-26 at 10 19 28 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/3b21d1b5-4686-4dca-8da9-bcf836b34bb8">
</p>

### Meditation 
#### Generate your own Personalized Meditation Audio 
* This is built with OpenAI and ElevenLabs.
* Input what you want your audio to be like, wait a few minutes and get the coolest audio ever, made just for you!
<p align="center">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 20 29 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/7288bb80-7c90-403f-8f5e-6d803c6df168">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 20 38 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/9a84d8db-6f56-401c-8d61-dfef906d446b">
</p>

#### Choose an existing audio from Spotify 
* You can log in to your Spotify Account (if you have premium account) and choose a meditation audio from there.
<p align="center">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 20 57 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/a4583f06-6f3c-4504-81c0-66fdee1cf65f">
  <img width="45%" alt="Screenshot 2024-06-26 at 10 21 20 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/f9013b6a-16c9-4732-a204-33da8aa365f2">
</p>

#### Start your session, & choose your Background color/image 
<p align="center">
  <img width="60%" alt="Screenshot 2024-06-26 at 10 21 35 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/b20fc903-514b-4c6c-aaed-a77771f787b1">
</p>

### Customize your Character Avatar
<p align="center">
  <img width="60%" alt="Screenshot 2024-06-26 at 10 22 42 AM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/b52655aa-f24a-42fd-877d-30a1791be85e">
</p>

## How we built it 💪

![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)


- **Frontend**: React
- **Backend**: Node.Js, Express, Flask
- **Design**: Excalidraw, Hand + Paper
- **Database**: MongoDB
- **Web Hosting**: AWS S3, EC3 (in progress)
- **Version Control**: Git & GitHub

<img width="957" alt="Screenshot 2024-07-07 at 4 45 30 PM" src="https://github.com/jennydo/PeacePod-Frontend/assets/126405175/ce9c7a55-e5a3-4e72-b9c2-5e1fe8611804">

## Testing & GitHub Actions 🧪
* GitHub actions are on branch Main: Pull and push requests
* 2 running:
  1. Run and check all unit tests
  2. Run and check Eslint
 

<!--  ## Architecture 🐙

We aim to have a highly modularized architecture, where every service has its own container and is independent from the others.

BookHub has 6 containers for 6 services:

- web: client code / front end
- db: database (SQLite3)
- nginx: reverse proxy
- cadvisor: monitoring tool 1
- prometheus: monitoring tool 2
- grafana: monitoring tool 3

![architecture](https://user-images.githubusercontent.com/35150672/130304480-28e9b998-dfb2-4919-82de-d4da9a258bb5.jpeg)
-->

## Challenges we ran into 🥺

- Time Management: At the end of the project, we have 4 different timezones to juggle (Eastern US, Canada, Australia, Vietnam). Thus someone has to wake up really early and someone has to stay really late for our weekly meetings!
- We are not frontend masters, so we struggle with making our website as pretty as possible (We have to redesign nearly everything in the last few weeks).
- Bugs everywhere: The more we build, the more bugs appear and they are everywhere! We spent a lot of time debugging and making sure our app doesn't have any major fault the present user to have a smooth experience.
- Spotify Authentication: Many music streaming service closed their APIs to the public, and we can only find Spotify available. But Spotify requires user to log in and must have premium account. The authentication flow is also confusing at first.

## Accomplishments that we're proud of 🥰

- Despite the time commitment issues, we were able to create a final deliverable at the end and learnt a lot in the process.
- We have a great teamwork - unexpected things happen, but no one is blamed and we keep moving forward and working together to find a solution.
- We built off of the feedbacks we received from our project advisors through out the whole process (giant thanks to [@khoa165](https://github.com/khoa165), [@ankhuetang](https://github.com/ankhuetang), [@Taenerys](https://github.com/Taenerys)).
- We demonstrated great Git best practices (Pull Requests, README.md, Code Review, etc.)
- We learned a lot as a team and as individual. We built many cool features and now have mastered using a lot of APIs!

***We also got 2 prizes from the VietTech Mentorship Hackathon and we are super duper proud***
![449389877_1494583431162817_7619068705439849176_n](https://github.com/jennydo/PeacePod-Frontend/assets/126405175/d0fa28dc-95db-4391-bbfa-0498cc282340)
![449368881_3650998268486748_7320693006135096672_n](https://github.com/jennydo/PeacePod-Frontend/assets/126405175/51f69630-51f5-4430-bb30-be6be3bd4855)


## What we learned 💡

- Acting as a Project Manager: deciding the direction of the project, assigning tasks, holding meetings, taking notes, being encouraging, etc.
- Good GitHub practices.
- Good collaboration between teammates.
- Never afraid to ask questions / for help.

## What's next for PeacePod 🤫

- [ ] Implement add-on features for Chat (change theme icon, chat color...)
- [ ] Increase speed of socket.io
- [ ] Improve authentication (i.e implement Forget Password)
- [ ] Deploy it to EC2

### Contributing Guidelines 🛠️

See [`CONTRIBUTING.md`](https://github.com/jennydo/PeacePod-Frontend/blob/main/CONTRIBUTING.md).

### GitHub Repository Structure 🧱

| S.No. | Repo Name                                                                   | Purpose                                      |
| ----- | --------------------------------------------------------------------------- | ---------------------------------------------|
| 1.    | [PeacePod-Frontend](https://github.com/jennydo/PeacePod-Frontend/tree/main) | contains the frontend code and documentation |
| 2.    | [PeacePod-Backend](https://github.com/jennydo/PeacePod-Backend/tree/main)   | contains the backend code                    |

### Setup ⏰


## Team 🧑‍🤝‍🧑

| S.No. | Name                  | GitHub Username:octocat:                          |
| ----- | --------------------- | --------------------------------------------      |
| 1.    | Hennessy Nguyen       | [@haianhng31](https://github.com/haianhng31)      |
| 2.    | Nam Nguyen            | [@Euclid0192](https://github.com/Euclid0192)      |
| 3.    | Jenny Do              | [@jennydo](https://github.com/jennydo)            |
| 4.    | Ethan Nguyen          | [@gsthanhnguyen](https://github.com/gsthanhnguyen)|

<br>
<br>

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody><tr>
        <td align="center"><a href="https://www.linkedin.com/in/hennessy-nguyen/"><img alt="Hennessy Nguyen" src="https://res.cloudinary.com/khoa165/image/upload/v1711768766/viettech/haianh.jpg" width="100px;"><br><sub><b>Hennessy Nguyen</b></sub></a><br><a href="https://github.com/jennydo/PeacePod-Frontend/commits?author=haianhng31" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/knaboagye/"><img alt="Nam Nguyen" src="https://res.cloudinary.com/khoa165/image/upload/v1711261963/viettech/nam.jpg" width="100px;"><br><sub><b>Nam Nguyen</b></sub></a><br><a href="https://github.com/jennydo/PeacePod-Frontend/commits?author=Euclid0192" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/emily-xinyi-chen/"><img alt="Jenny Do" src="https://res.cloudinary.com/khoa165/image/upload/v1711671186/viettech/trangdo.jpg" width="100px;"><br><sub><b>Jenny Do</b></sub></a><br><a href="https://github.com/jennydo/PeacePod-Frontend/commits?author=jennydo" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/dakshinapalasamudrum/"><img alt="Thanh Nguyen" src="https://res.cloudinary.com/khoa165/image/upload/v1711083621/viettech/thanh.jpg" width="100px;"><br><sub><b>Thanh Nguyen</b></sub></a><br><a href="https://github.com/jennydo/PeacePod-Frontend/commits?author=gsthanhnguyen" title="Code&Design">💻 🎨</a></td>

</tr>
</tbody></table>


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[![ForTheBadge uses-git](http://ForTheBadge.com/images/badges/uses-git.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![ForTheBadge uses-html](http://ForTheBadge.com/images/badges/uses-html.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![ForTheBadge uses-css](http://ForTheBadge.com/images/badges/uses-css.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://github.com/jennydo/PeacePod-Frontend)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/jennydo/PeacePod-Frontend)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/jennydo/PeacePod-Frontend)

---
