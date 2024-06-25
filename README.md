<img alt="Book Hub GIF" src="./book-hub-home.gif">
By Hennessy (Hai-Anh) Nguyen, Nam Nguyen, Jenny (Trang) Do, Thanh Nguyen.

**Deployed Project Link: https://book-hub.tech**

[![License](https://img.shields.io/github/license/Taenerys/BookHub)](https://github.com/Taenerys/BookHub/blob/main/LICENSE)

<br />

# PeacePod ✌️💖

A place where you can slow down, connect deeper, and create a personalized meditation just for you.

## Table of Contents 🗺️

- [Inspiration 🧠](https://github.com/jenneydo/PeacePod-Frontend#inspiration-)
- [What it does 🤔](https://github.com/jenneydo/PeacePod-Frontend#what-it-does-)
- [How to use 👍](https://github.com/jenneydo/PeacePod-Frontend#how-to-use-book-hub-)
- [How we built it 💪](https://github.com/jenneydo/PeacePod-Frontend#how-we-built-it-)
- [Architecture 🐙](https://github.com/jenneydo/PeacePod-Frontend#architecture-)
- [Accomplishments 🥺](https://github.com/jenneydo/PeacePod-Frontend#accomplishments-that-were-proud-of-)
- [What we learned 💡](https://github.com/jenneydo/PeacePod-Frontend#what-we-learned-)
- [Next Steps 🤫](https://github.com/jenneydo/PeacePod-Frontend#whats-next-for-book-hub-)
- [Team 🧑‍🤝‍🧑](https://github.com/jenneydo/PeacePod-Frontend#team-)
- [Contributors ✨](https://github.com/jenneydo/PeacePod-Frontend#contributors-)

## Inspiration 🧠

**PeacePod** aims to build a space where you can save your book reviews and track how many books you have been reading.

## What it does 🤔

- **Single Platform** for you to save your books and book notes
- Easy to track your reading journey (i.e how many books have you read?)
- Fully functional for you to make your Book Hub your own!
- Easy to filter books by tags!

## How to use PeacePod? 👍

### Create an account or log in 💓

<img width="1438" alt="Screen Shot 2021-08-20 at 11 18 15 AM" src="https://user-images.githubusercontent.com/70316484/130276825-6b97b9ed-522c-4c56-a5ea-35480ed8f0cc.png">

### Browse existing entries 💓

### Create new entries 💓

Click on "start writing" on the top right corner to recommend a new book!

<img width="456" alt="Screen Shot 2021-08-20 at 11 20 05 AM" src="https://user-images.githubusercontent.com/70316484/130277016-95766672-6f55-44b8-a857-f8177577a846.png">

Enter your book details here...

![image](https://user-images.githubusercontent.com/52259856/129430725-f5ac6d44-5d50-43bf-ab28-6688dbf30bc5.png)

Books are uploaded on a catalog!

<img width="1429" alt="Screen Shot 2021-08-20 at 10 37 16 AM" src="https://user-images.githubusercontent.com/70316484/130275849-ae5f725d-fc69-4925-92e7-5887f6e14ef6.png">

After you click "submit" this page will show up to confirm a successful upload
<img width="1438" alt="Screen Shot 2021-08-20 at 11 23 39 AM" src="https://user-images.githubusercontent.com/70316484/130277371-fd2f2c6e-83ff-4ba0-be37-cbd06a094bb5.png">

## How we built it 💪

![Flask](https://img.shields.io/badge/Flask-B8C85E?style=for-the-badge&logo=flask&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Python](https://img.shields.io/badge/Python-FF69B4?style=for-the-badge&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-7A67EE?style=for-the-badge&logo=docker&logoColor=white) ![SQLite3](https://img.shields.io/badge/SQLite3-ff99cc?style=for-the-badge&logo=sqlite3&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-ffefdb?style=for-the-badge&logo=aws&logoColor=white)

- **Frontend**: Flask, HTML, CSS, JS
- **Backend**: Python
- **Design**: Figma, Hand + Paper
- **Database**: SQLite3
- **Web Hosting**: AWS EC2
- **Container**: Docker
- **CI/CD Workflow**: Github Actions
- **Monitoring**: cAdvisor, Prometheus, Grafana
- **Version Control**: Git and GitHub
- **Reverse Proxy**: NGINX

## Architecture 🐙

We aim to have a highly modularized architecture, where every service has its own container and is independent from the others.

BookHub has 6 containers for 6 services:

- web: client code / front end
- db: database (SQLite3)
- nginx: reverse proxy
- cadvisor: monitoring tool 1
- prometheus: monitoring tool 2
- grafana: monitoring tool 3

![architecture](https://user-images.githubusercontent.com/35150672/130304480-28e9b998-dfb2-4919-82de-d4da9a258bb5.jpeg)

## CI/CD Workflow 🧪

Book Hub also has a full Continuous Integrationn and Delivery System.

![ci-cd](https://user-images.githubusercontent.com/35150672/130304486-52128f4d-fb1f-4207-8fb0-ca6f07af8ad2.jpeg)

## Challenges we ran into 🥺

- One major problem that we have is time: a lot of our team members have many commitments outside of the fellowship, therefore finding time to sync up was difficult for all of us.
- AWS instance often hanging very slowly, causing us having to debug in a lot of ways: rebooting the AWS instance, checking top, changing the instance type from t2.micro to t2.small
- While collaborating together and working in parallel, there were often git conflicts which were difficult to merge.
- All of us are not masters at front end development, so we ran into quite a lot of issues with CSS.

## Accomplishments that we're proud of 🥰

- Despite the time commitment issues, we were able to create a final deliverable at the end and learnt a lot in the process.
- We built a project from scratch, starting from coming up with an idea, designing, executing things until we were able to deploy it and employed testing, CI/CD and monitoring tools in a span of three weeks.
- We have a great teamwork - unexpected things happen, but no one is blamed and we keep moving forward and working together to find a solution.
- We built off of the feedbacks we received from our Pod Leader and our Pod mates for the past weeks. We demonstrated great Git best practices throughout the process (Project Board, Issues, Pull Requests, README.md, Code Review, etc.)
- Resolved a lot of git merge conflicts!
- We made a great README.md that we are very proud of!

## What we learned 💡

- Learnt more ways of using Flask for a full-fledged project.
- Acting as a Project Manager: deciding the direction of the project, assigning tasks, holding meetings, taking notes, being encouraging, etc.
- Using Production Engineering skills we learnt in the MLH's PE Fellowship in a real world project from start to finish.
- Debugging on Linux, especially on an AWS EC2 instance.
- Good GitHub practices.
- Good collaboration between teammates.
- Never afraid to ask questions / for help.

## What's next for PeacePod 🤫

- [ ] Implement Update Book feature
- [ ] Increase test coverage of the whole project (current number: 37%)
- [ ] Improve filtering books by tags
- [ ] Add likes/comments for each book notes
- [ ] Improve authentication (i.e implement Forget Password)

### Contributing Guidelines 🛠️

See [`CONTRIBUTING.md`](https://github.com/Taenerys/BookHub/blob/main/CONTRIBUTING.md).

### GitHub Repository Structure 🧱

| S.No. | Branch Name                                           | Purpose                                                       |
| ----- | ----------------------------------------------------- | ------------------------------------------------------------- |
| 1.    | [main](https://github.com/Taenerys/BookHub/tree/main) | contains the frontend, backend related code and documentation |

### Setup ⏰

- Fork and Clone the repo using

```
$ git clone https://github.com/Taenerys/BookHub.git
$ cd BookHub
```

- Make sure you have python3 and pip installed

Create and activate virtual environment using virtualenv

```bash
$ python -m venv python3-virtualenv
$ source python3-virtualenv/bin/activate
```

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install all dependencies

```bash
pip install -r requirements.txt
```

- Run the Flask server using

```bash
$ export FLASK_ENV=development
$ flask run
```

## Team 🧑‍🤝‍🧑

> "It is the long history of humankind (and animal kind, too) that those who learned to collaborate and improvise most effectively have prevailed." _(Charles Darwin)_

| S.No. | Name                  | GitHub Username:octocat:                          |
| ----- | --------------------- | --------------------------------------------      |
| 1.    | Hennessy Nguyen       | [@haianhng31](https://github.com/haianhng31)      |
| 2.    | Nam Nguyen            | [@Euclid0192](https://github.com/Euclid0192)      |
| 3.    | Jenny Do              | [@jennydo](https://github.com/jennydo)            |
| 4.    | Ethan Nguyen          | [@gsthanhnguyen](https://github.com/gsthanhnguyen)|

<br>
<br>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody><tr>
        <td align="center"><a href="https://www.linkedin.com/in/hennessy-nguyen/"><img alt="Hennessy Nguyen" src="https://user-images.githubusercontent.com/35150672/130278773-cc4f349a-25ac-489f-874d-470fab2c9c3d.jpg" width="100px;"><br><sub><b>Hennessy Nguyen</b></sub></a><br><a href="https://github.com/jennydo/PeacePod-Frontend/commits?author=haianhng31" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/knaboagye/"><img alt="Kweku Aboagye" src="https://user-images.githubusercontent.com/35150672/130279255-4cbc366e-aa8d-42f3-b525-1e4246847849.jpg" width="100px;"><br><sub><b>Kweku Aboagye</b></sub></a><br><a href="https://github.com/Taenerys/BookHub/commits?author=Kweku007" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/emily-xinyi-chen/"><img alt="Emily Xinyi" src="https://user-images.githubusercontent.com/35150672/130278810-f416c0e6-6709-40c3-9c84-e2f30de30679.jpg" width="100px;"><br><sub><b>Emily Xinyi</b></sub></a><br><a href="https://github.com/Taenerys/BookHub/commits?author=EmilyXinyi" title="Code&Design">💻 🎨</a></td>
        <td align="center"><a href="https://www.linkedin.com/in/dakshinapalasamudrum/"><img alt="Dakshina Palasamudrum" src="https://user-images.githubusercontent.com/35150672/130278791-0acc69fc-98e6-4425-9b70-88a3e36527ff.jpg" width="100px;"><br><sub><b>Dakshina Palasamudrum</b></sub></a><br><a href="https://github.com/Taenerys/BookHub/commits?author=dakshinabp" title="Code&Design">💻 🎨</a></td>

</tr>
</tbody></table>


<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[![ForTheBadge uses-git](http://ForTheBadge.com/images/badges/uses-git.svg)](https://github.com/Taenerys/BookHub)
[![ForTheBadge uses-html](http://ForTheBadge.com/images/badges/uses-html.svg)](https://github.com/Taenerys/BookHub)
[![ForTheBadge uses-css](http://ForTheBadge.com/images/badges/uses-css.svg)](https://github.com/Taenerys/BookHub)
[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](https://github.com/Taenerys/BookHub)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/Taenerys/BookHub)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://github.com/Taenerys/BookHub)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://github.com/Taenerys/BookHub)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/Taenerys/BookHub)
[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/Taenerys/BookHub)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/Taenerys/BookHub)

---
